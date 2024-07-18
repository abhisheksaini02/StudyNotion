//ye instace banaya h razorpay iske through razorpay ko request bhejenge ki 
//payment crete krni h ya order create krna h 


const razorpay=require("razorpay")
exports.instance=new razorpay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET
})