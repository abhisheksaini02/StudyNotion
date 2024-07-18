const express = require("express");
const app = express();
require("dotenv").config();

const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const courseRoutes = require('./routes/Course');
const paymentRoutes = require('./routes/Payments');

const database = require("./Configuration/database");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const { cloudinaryConnect } = require('./Configuration/cloudinary');
const fileupload = require('express-fileupload');

const PORT = process.env.PORT || 4000;

// Connect to the database
database.dbconnect();
cloudinaryConnect();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);
app.use(
    fileupload({
        useTempFiles: true,
        tempFileDir: "/tmp"
    })
);



app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});
