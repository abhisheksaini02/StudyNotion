const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
    try {
        // Check if required environment variables are set
        if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
            throw new Error("Missing Cloudinary configuration values. Please set CLOUD_NAME, API_KEY, and API_SECRET in your environment variables.");
        }

        // Configure Cloudinary
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });

        console.log("Cloudinary configuration successful");

    } catch (error) {
        console.error("Error configuring Cloudinary:", error);
    }
};
