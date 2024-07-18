import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../../services/apiconnector";
import CountryCode from '../../../data/countrycode.json';
import status from "statuses";

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);

    async function submitContactForm(data) {
        try {
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data)
            const response = { status: "OK" };
            console.log(response);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: '',
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: ""
            });
        }
    }, [reset, isSubmitSuccessful]);

    return (
        <div>
            <form onSubmit={handleSubmit(submitContactForm)}>
                <div className="flex flex-col gap-8">
                    <div className="flex gap-8 ">
                        <div>
                            <label htmlFor="firstname">FirstName :</label>
                            <br></br>
                            <input 
                                className=" text-white bg-richblack-600 rounded-md p-1"
                                type='text'
                                name='firstname'
                                id='firstname'
                                placeholder="Enter first name"
                                {...register("firstname", { required: true })} 
                            />
                            <br></br>
                            {errors.firstname && <span>This field is required</span>}
                        </div>
                        
                        <div>
                            <label htmlFor="lastname">LastName :</label>
                            <br></br>
                            <input 
                                className=" text-white bg-richblack-600 rounded-md p-1"
                                type='text'
                                name='lastname'
                                id='lastname'
                                placeholder="Enter last name"
                                {...register("lastname", { required: true })} 
                            />
                            <br></br>
                            {errors.lastname && <span>This field is required</span>}
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="email">Email:</label>
                        <br></br>
                        <input 
                            className=" text-white w-full bg-richblack-600 rounded-md p-1"
                            type='email'
                            name='email'
                            id='email'
                            placeholder="Enter Your email id"
                            {...register("email", { required: true })} 
                        />
                        {errors.email && <span>This field is required</span>}
                    </div>
                    
                   
                    <div>
                    <label htmlFor="number">Phone Number:</label>
                        <div className="flex gap-2">
                            <div className="flex w-[90px]">
                                <select
                                    name='countryCode'
                                    id="countryCode"
                                    {...register("countryCode", { required: true })}
                                    className="text-richblack-50 w-full bg-richblack-600 rounded-md p-1"
                                >
                                    {
                                        CountryCode.map((element, index) => (
                                            <option key={index} value={element.code}>
                                                {element.code} - {element.country}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="flex w-[calc(100%-100px)]">
                                <input
                                    className="text-white w-full bg-richblack-600 rounded-md p-1"
                                    type='text'
                                    name='phoneNumber'
                                    id='phoneNumber'
                                    placeholder="12345 67890"
                                    {...register("phoneNumber", { 
                                        required: { value: true, message: "Please enter a valid number" },
                                        maxLength: { value: 10, message: "Invalid Number" },
                                        minLength: { value: 8, message: "Invalid Number" }
                                    })}
                                />
                                {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="message">Message:</label>
                        <br></br>
                        <textarea
                            className="text-white w-full bg-richblack-600 rounded-md p-1"
                            name="message"
                            id="message"
                            cols='30'
                            rows='6'
                            placeholder="Enter your message here"
                            {...register("message", { required: true })}
                        ></textarea>
                        {errors.message && <span>This field is required</span>}
                    </div>

                    <button type="submit" className="bg-yellow-50 w-full text-richblack-900 rounded-md">
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ContactUsForm;
