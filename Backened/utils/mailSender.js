const nodemailer=require("nodemailer")
require("dotenv").config()
//ek functiob bna diya h jis email,body aur tittle denge to vo email send kr dega
const mailSender=async(email,title,body)=>{
    try{
        //crete transporter

        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        }) 
        let info =transporter.sendMail({
            from:"StudyNotion",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        console.log(info)
        return info

    }
    catch(error){
        console.log("Error in sending email to user"+error)
    }

}
module.exports=mailSender
