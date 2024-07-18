const Otp =require("../Models/Otp")
const User=require("../Models/User")
const otpgenerator=require("otp-generator")
const jwt=require("jsonwebtoken")
const passwordUpdated=require('../mail/passwordUpdate')
const bcrypt=require("bcrypt")
const Profile = require("../models/Profile");
const mailSender=require("../utils/mailSender")
const otpTemplate = require("../mail/emailVerificationTemplate")
require("dotenv").config()




//Sign up ka flow


//sendOTP
exports.sendotp=async(req,res)=>{
   try{ const {email}=req.body
    //check user exist
    const check=await User.findOne({email})
    if(check){
        return res.status(401).json({
            success:false,
            message:"User alresdy exist"
        })
    }
    //generate otp
    let otp =otpgenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    })
   console.log("otp generated",otp)
   //check ki otp unique h ya nhi
   const checkotp=await Otp.findOne({otp:otp})
  //agr otp nhi h h toh naya otp generate karenge
   if(!checkotp){
    otp=otpgenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    })
   }
   //ab otp bn gya h usse db mein save krte h
const payload={email,otp}
const otpBody=await Otp.create(payload)
console.log(otp.Body)

res.status(200).json({
    success:true,
    message:"Otp send successfully",
    otp:otp
})

await mailSender(email, "Verification email from StudyNotion", otpTemplate(otp));

}
catch(err){
    console.log(err)
    res.status(500).json({
        success:false,
        message:err.message
    })
}}



//sign up ki details db mein save krni h 

exports.signup = async (req, res) => {
	try {
		// Destructure fields from the request body
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			contactNumber,
			otp
		} = req.body;
		// Check if All Details are there or not
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword ||
			!otp
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		// Check if password and confirm password match
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message:
					"Password and Confirm Password do not match. Please try again.",
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}

		// Find the most recent OTP for the email
		const response = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
		console.log(response);
		if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

		// Create the Additional Profile For User
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});
		const user = await User.create({
			firstName,
			lastName,
			email,
			contactNumber,
			password: hashedPassword,
			accountType: accountType,
			approved: approved,
			additionalDetails: profileDetails._id,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};


//LOGIN KA FLOW
exports.login=async(req,res)=>{
    try{
        //get data
        const {email,password}=req.body
        //data validation
        if(!email||!password){
            return res.status(403).json({
                success:false,
                message :"All fiels are required "
            })
        }
        //user exist or not
        const user= await User.findOne({email})
        if(!user){
            return res.status(403).json({
                success:false,
                message :"User is not registerd "
            })

        }
        //password check then create token
        if(await bcrypt.compare(password,user.password)){
            
            const token=jwt.sign({email:user.email,
                id:user.id,
                accountType:user.accountType},process.env.JWTSECRET,{
                expiresIn:"2h"
            })
            // Save token to user document in database
            user.token=token
            user.password=undefined
        //cookie
        const options={
            expiresIn:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"logged in successfully"

        })}
        else{
            return  res.status(400).json({
                success:false,
                message:"Incorrect Password"
               })  
        }

    }
    catch(err){
        return  res.status(400).json({
            success:false,
            message:"Login failure ,please try again"
           }) 
    
    }

}


//Change password{
    exports.changePassword = async (req, res) => {
        try {
            // Get user data from req.user
            const userDetails = await User.findById(req.user.id);
    
            // Get old password, new password, and confirm new password from req.body
            const { oldPassword, newPassword, confirmNewPassword } = req.body;
    
            // Validate old password
            const isPasswordMatch = await bcrypt.compare(
                oldPassword,
                userDetails.password
            );
            if (!isPasswordMatch) {
                // If old password does not match, return a 401 (Unauthorized) error
                return res
                    .status(401)
                    .json({ success: false, message: "The password is incorrect" });
            }
    
            // Match new password and confirm new password
            if (newPassword !== confirmNewPassword) {
                // If new password and confirm new password do not match, return a 400 (Bad Request) error
                return res.status(400).json({
                    success: false,
                    message: "The password and confirm password does not match",
                });
            }
    
            // Update password
            const encryptedPassword = await bcrypt.hash(newPassword, 10);
            const updatedUserDetails = await User.findByIdAndUpdate(
                req.user.id,
                { password: encryptedPassword },
                { new: true }
            );
    
            // Send notification email
            try {
                const emailResponse = await mailSender(
                    updatedUserDetails.email,
                    passwordUpdated(
                        updatedUserDetails.email,
                        `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                    )
                );
                console.log("Email sent successfully:", emailResponse.response);
            } catch (error) {
                // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
                console.error("Error occurred while sending email:", error);
                return res.status(500).json({
                    success: false,
                    message: "Error occurred while sending email",
                    error: error.message,
                });
            }
    
            // Return success response
            return res
                .status(200)
                .json({ success: true, message: "Password updated successfully" });
        } catch (error) {
            // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
            console.error("Error occurred while updating password:", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while updating password",
                error: error.message,
            });
        }
    };


