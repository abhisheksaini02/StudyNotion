const mongoose=require("mongoose")
require('dotenv').config()

exports.dbconnect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>console.log("Database connect successfully"))
    .catch((err)=>{
        console.log("Database connection failed ")
        console.log(err)
        process.exit(1)
    })
}
