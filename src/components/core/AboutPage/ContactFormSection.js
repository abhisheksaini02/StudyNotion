import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'
const ContactFormSection=()=>{
return (
    <div className='mx-auto flex flex-col gap-6 border border-richblack-25 rounded-md p-8 text-richblack-25'>
        <h1 className='text-center text-semibold text-3xl'>Get in Touch</h1>
        <p className='text-center'>We'd love to here for you,Please fill out this form</p>
        <div>
          <ContactUsForm></ContactUsForm>  
        </div>

        </div>

)
}
 export default ContactFormSection