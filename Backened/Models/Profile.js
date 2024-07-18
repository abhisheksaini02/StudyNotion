const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    dob: {
        type: String
    },
    gender: {
        type: String
    },
    about: {
        type: String,
        trim: true
    },
    contactNumber: {
        type: Number,
        trim: true
    }
});

const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema);

module.exports = Profile;
