const User=require("../Models/User")
const mailSender=require("../utils/mailSender")
const bcrypt=require("bcrypt")
const crypto=require("crypto")



//link generate krke mail p send krenge 
exports.resetPasswordToken=async(req,res)=>{
    //get email from req
    try{
    const email=req.body.email
    //check user for this email
    const checkuser=await User.findOne({email})
    if(!checkuser){
        return res.status(500).json({
            success:false,
            message:"your email is  not registered"
        })
    }
 //generate token
    const token=crypto.randomUUID()
//Add token in user schema
//token isliye add kiya jb hum apna naya pwd daaleng toh hume update krna 
//hoga user schema to us particular user ko fetch kene k liye token use hoga
const updateDetails=await User.findOneAndUpdate({email:email},
    {
        token:token,
        resetPasswordExpires:Date.now()+5*24*60*60*1000
    },{new:true})

//create url 
const url=`http://localhost:3000/update-password/${token}` 
//send mail
await mailSender(email,"Reset Password",`reset password link ${url}`)
 return res.json({
    success:true,
    message:"email send successfully,reset your paasword "
 })
   
}
catch(err){
    console.log("error in sending url for reset password "+err)
    return res.status(500).json({
        success:false,
        message:"something went wrong while sending email to reset your paasword "
     })
       
}}


//save new password in DB


exports.resetPassword=async(req,res)=>{
//data fetch
try{
const{password,confirmPassword,token} =req.body
//validation
if(password!=confirmPassword){
    return res.json({
        success:false,
        message:"password not matching "
     })
}
//get user detail using token
const userDetail=await User.findOne({token:token})
//token check hoga ki expire toh ni h 
if(!userDetail){
    return res.json({
        success:false,
        message:"token invalid "
     })
}
if(userDetail.resetPasswordExpires<Date.now()){
    return res.json({
        success:false,
        message:"token expires "
     })
}

//hash pwd
const hashed= await bcrypt.hash(password,10)
//pwd update hoga
await User.findOneAndUpdate({token:token},{
    password:hashed,
},{new:true})
//return response
return res.status(200).json({
    success:true,
    message:"password reset successfully "
 })}
 catch(err){
    console.log(err)
    return res.status(500).json({
        success:false,
        message:"error occured while reset the password "
     })
 }

}



