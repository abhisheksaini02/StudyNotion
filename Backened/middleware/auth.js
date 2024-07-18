const jwt = require("jsonwebtoken");
require("dotenv").config();

// Authentication middleware
exports.auth = async (req, res, next) => {
    try {
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found"
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWTSECRET);
            console.log(decode);
            req.user = decode;
            next(); // Call next to pass control to the next middleware or route handler
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating token"
        });
    }
};

// Middleware to check if user is a student
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is only for students"
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified"
        });
    }
};

// Middleware to check if user is an instructor
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is only for instructors"
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified"
        });
    }
};

// Middleware to check if user is an admin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is only for Admin"
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified"
        });
    }
};
