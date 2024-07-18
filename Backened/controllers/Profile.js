//ISME KAAM H ABHI

const User=require("../Models/User")
const Profile=require("../Models/Profile")
const Course=require("../Models/Course")
const CourseProgress= require("../Models/CourseProgress")
const {uploadImageToCloudinary} =require("../utils/imageUploader")
const { convertSecondsToDuration } =require("../utils/secToDuration")

//yaha hum profile ko update kerenge kyonki initially null values k sath user mein dala tha umne
exports.updateProfile = async (req, res) => {
    try {
        const { dateOFBirth = "", about = "", contactNumber, gender } = req.body;
        const userId = req.user.id;
        if (!userId || !contactNumber) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        profileDetails.dob = dateOFBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();
        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            profileDetails
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

//DELETE ACCOUNT 

exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        await Profile.findByIdAndDelete(userDetails.additionalDetails);
        for (let courseId of userDetails.courses) {
            await Course.findByIdAndUpdate(courseId, {
                $pull: {
                    studentsEnrolled: userId
                }
            }, { new: true });
        }
        await User.findByIdAndDelete(userId);
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

        
//user ki sari details nikalni h 
exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec();
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: userDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//ag user apni image change kr rha toh
exports.updateDisplayPicture = async (req, res) => {
    try {
        if (!req.files || !req.files.displayPicture) {
            return res.status(400).json({
                success: false,
                message: "No display picture file provided"
            });
        }
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }
        const image = await uploadImageToCloudinary(displayPicture, process.env.FOLDER_NAME, 1000, 1000);
        if (!image || !image.secure_url) {
            return res.status(500).json({
                success: false,
                message: "Error uploading image to Cloudinary"
            });
        }
        const updatedProfile = await User.findByIdAndUpdate(userId, { image: image.secure_url }, { new: true });
        if (!updatedProfile) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.send({
            success: true,
            message: "Image updated successfully",
            data: updatedProfile
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



//enrolled courses nikalana h  

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        let userDetails = await User.findOne({ _id: userId })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection"
                    }
                }
            })
            .exec();

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userId}`,
            });
        }

        userDetails = userDetails.toObject();  // Convert to plain object
        let SubsectionLength = 0;
        for (let course of userDetails.courses) {
            let totalDurationInSeconds = 0;
            SubsectionLength = 0;
            for (let content of course.courseContent) {
                totalDurationInSeconds += content.subSection.reduce((acc, curr) => {
                    const duration = parseInt(curr.timeDuration);
                    return acc + (isNaN(duration) ? 0 : duration);
                }, 0);
                SubsectionLength += content.subSection.length;
            }
            course.totalDuration = convertSecondsToDuration(totalDurationInSeconds);
            let courseProgress = await CourseProgress.findOne({
                courseID: course._id,
                userID: userId,
            });
            let courseProgressCount = courseProgress ? courseProgress.completedVideos.length : 0;
            course.progressPercentage = SubsectionLength === 0 ? 100 : Math.round((courseProgressCount / SubsectionLength) * 10000) / 100;
        }

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.instructorDashboard=async(req,res)=>{
    try{
        const courseDetails= await Course.find({
            instructor:req.user.id
        })
        const courseData=courseDetails.map((course,ind)=>{
            const totalStudentsEnrolled=course.studentsEnrolled.length
            const totalAmountGenerate=totalStudentsEnrolled*course.price
            const courseDataWithStats={
                _id:course.id,
                courseName:course.courseName,
                
                courseDescription:course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerate


                
    
            }
            return courseDataWithStats
        })
        return res.status(200).json({
            courses:courseData
        })
       

    }
    catch(err){
       console.log(err)
       return res.status(500).json({
        success:false,
        message:"Internal Server Error"
        
       }) 
    }
}
