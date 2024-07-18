const mongoose=require("mongoose")
const courseSchema= new mongoose.Schema({
courseName:{
    type:String,
    trim:true
},
courseDescription:{
    type:String,
    trim:true
},
instructor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
whatyouwillLearn:{
    type:String,
    trim:true
},
courseContent:[
    {
        type:mongoose.Schema.Types.ObjectId,
    ref:"Section",
    required:true

    }
],
ratingAndReviews:[
    {
        type:mongoose.Schema.Types.ObjectId,
    ref:"RatingAndReview",
    required:true

    }
],
price:{
    type:Number,
},
thumbnail:{
    type:String,

},
studentsEnrolled:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
}],
tag: {
    type: [String],
    required: true,
},
category: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "Category",
},
instructions: {
    type: [String],
},
status: {
    type: String,
    enum: ["Draft", "Published"],
},
createdAt: {
    type:Date,
    default:Date.now
},






   
})
module.exports=mongoose.model("Course",courseSchema)