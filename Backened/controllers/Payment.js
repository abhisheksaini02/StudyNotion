const { instance } = require("../Configuration/razorpay");
const User = require("../Models/User");
const Course = require("../Models/Course");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/courseEnrollmentEmail");
const mongoose = require("mongoose");
const crypto = require("crypto");
const CourseProgress =require('../Models/CourseProgress')

exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if (!courses || courses.length === 0) {
        return res.json({ success: false, message: "Please provide Course Ids" });
    }

    let totalAmount = 0;

    for (const courseId of courses) {
        try {
            const course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({ success: false, message: "Course not found" });
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({ success: false, message: "Student is already enrolled" });
            }

            totalAmount += course.price;
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    const currency = "INR";
    const options = {
        amount: totalAmount * 100, // Convert to smallest currency unit
        currency,
        receipt: Math.random(Date.now()).toString(),
    };

    try {
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success: true,
            message: paymentResponse,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Could not initiate order" });
    }
};

exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(400).json({ success: false, message: "Invalid request data" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        await enrollStudents(courses, userId, res);
        return res.status(200).json({ success: true, message: "Payment verified" });
    }

    return res.status(400).json({ success: false, message: "Payment verification failed" });
};
const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res.status(400).json({ success: false, message: "Please provide data for courses or userId" });
    }

    for (const courseId of courses) {
        try {
            const enrolledCourse = await Course.findByIdAndUpdate(
                courseId,
                { $push: { studentsEnrolled: userId } },
                { new: true }
            );

            if (!enrolledCourse) {
                return res.status(404).json({ success: false, message: "Course not found" });
            }

            const courseProgress=await CourseProgress.create({
                courseID:courseId,
                userID:userId,
                completedVideoes:[]
            })


            const enrolledStudent = await User.findByIdAndUpdate(
                userId,

                { $push: { courses: courseId ,
               courseProgress:courseProgress._id }},
                { new: true }
            );

            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName)
            );
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }
};
exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({ success: false, message: "Please provide all the fields" });
    }

    try {
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            "Payment Received",
            paymentSuccessEmail(enrolledStudent.firstName, amount / 100, orderId, paymentId)
        );

        res.status(200).json({ success: true, message: "Payment success email sent" });
    } catch (error) {
        console.log("Error in sending mail:", error);
        return res.status(500).json({ success: false, message: "Could not send email" });
    }
};
