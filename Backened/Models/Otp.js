const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60 // 5 minutes
    }
});

async function sendVerificationEmail(email, otp) {
    try {
        const response = await mailSender(email, "Verification email from StudyNotion", emailTemplate(otp));
        console.log("Email sent successfully", response);
    } catch (err) {
        console.log("Error in verification", err);
    }
}

otpSchema.pre("save", async function (next) {
    console.log("New document saved to database");

    // Only send an email when a new document is created
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

module.exports = mongoose.model("Otp", otpSchema);
