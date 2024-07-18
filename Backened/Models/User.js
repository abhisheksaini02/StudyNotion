const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String,
        trim: true
    },
    lastName: {
        required: true,
        type: String,
        trim: true
    },
    email: {
        required: true,
        type: String,
        trim: true
    },
    password: {
        required: true,
        type: String
    },
    accountType: {
        required: true,
        type: String,
        enum: ["Admin", "Student", "Instructor"]
    },
    active: {
        type: Boolean,
        default: true
    },
    approved: {
        type: Boolean,
        default: true
    },
    token: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
    image: {
        type: String,
        required: true
    },
    courseProgress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseProgress"
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
