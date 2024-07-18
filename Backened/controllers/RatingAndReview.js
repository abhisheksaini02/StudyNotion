const RatingAndReview = require("../Models/RatingAndReview");
const Course = require('../Models/Course');
const User = require('../Models/User');  // Ensure correct model import

// CREATE RATING AND REVIEW
exports.createRating = async (req, res) => {
    try {
        // get user id
        const userId = req.user.id;  // Fixed destructuring to get userId directly
        // get courseid, rating, and review 
        const { rating, review, courseId } = req.body;

        // get if user is enrolled or not
        const courseDetails = await Course.findOne({ _id: courseId });
        if (!courseDetails.studentsEnrolled.includes(userId)) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course"
            });
        }

        // Allow only one review per user per course
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId
        });
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "Course is already reviewed by user"
            });
        }

        // Create a review
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course: courseId,
            user: userId
        });

        // Update the course with the new review
        await Course.findByIdAndUpdate(courseId, {
            $push: {
                ratingAndReviews: ratingReview._id
            }
        }, { new: true });

        // Return response
        return res.status(200).json({
            success: true,
            message: "Rating and Review created successfully"
        });

    } catch (err) {
        console.error("Error creating rating and review:", err);  // Detailed error logging
        return res.status(500).json({
            success: false,
            message: "Unable to rate this course",
            error: err.message
        });
    }
};


//AVERAGE RATING KYA HOGI COURSE KI
exports.getAverageRating=async(req,res)=>{
    try{
        const courseId=req.body.courseId
        //abb us course mein average rating nikalenege
        //ye syntax dekhna pdega
        const result=await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId), 
                }
            },{
                $group:{
                    _id:null,
                    averageRating:{$avg:"rating" }

                }
            }
        ])
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })  
        }

        //if no rating and review exists
        return res.status(200).json({
            success:true,
            message:"No ratings are given till now ",
            averageRating:0,
        }) 
         

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"unable to get average rating"
        })
    }
}

//GET ALL RATING AND REVIEWS
exports.getAllRating=async(req,res)=>{
try{

    const allReviews=await RatingandReview.find({}).sort({rating:"desc"})
                                              .populate({path:"user",
                                            select:"firstName, lastName, email"})
                                            .populate({
                                                path:"course",
                                                select:"courseName"})
                                                return res.status(200).json({
                                                    success:true,
                                                    message:"All reviews are fetched successfully"
                                                })
}
catch(err){
    return res.status(500).json({
        success:false,
        message:"unable to get average rating"
    })
}
}