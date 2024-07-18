import React  from "react";
import instructor  from '../../../assets/Images/Instructor.png'
import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa6";
const InstructorSection=()=>{
    return (
        <div>
            <div className="flex gap-20 items-center mt-15 mx-auto justify-center">
                <div className="w-[40%]">
                    <img src={instructor} 
                    className="border-white border-t-4 border-r-4 "></img>

                </div>
                <div  className="flex flex-col gap-7 items-start w-[35%]">
                    <div className="text-3xl font-semibold">Become an 
                        <HighlightText text={'Instructor'}></HighlightText></div>
                        <div className=" text-richblack-100">Instructors from around the world teach millions of students on 
                            StudyNotion.We provide  the tools and skills to teach what you love.
                        </div>
                        
                        <CTAButton active={true} linkto={'/signup'}> <div className="flex items-center justify-center gap-2">Start Teaching Today 
                        <FaArrowRight></FaArrowRight> </div></CTAButton>
                        

                </div>

            </div>

        </div>
    )
}
export default  InstructorSection 