import React from "react";

import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import know_your_progress from'../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png'
const LearningLanguageSection=()=>{
    return (
<div >
    <div className="flex flex-col gap-5 mt-[130px] justify-center  items-center" >
        <div className="text-4xl font-semibold mx-auto ">Your swiss Knife for
            <HighlightText text={'learning any language'}></HighlightText></div>
   
    <div className="text-center  mx-auto text-richblack-600 mt-3  mb-10 w-[75%]">
        <p>Using spin making learning multiple languages easy with 20+ languages realistic voice
        over progress tracking ,custom schedule and more.</p>
    </div>
    <div className="flex justify-center items-center  ">
        <img src={know_your_progress}
        className="object-contain  -mr-32"></img>
        <img src={compare_with_others}
        className="object-contain"></img>

        <img src={plan_your_lessons}
        className="object-contain -ml-36"></img>

        
    </div>
    <div className="mb-16">

    <CTAButton active={true} linkto={'/signup'}>Learn More</CTAButton>
 </div>
</div>
</div>
    )
}
export default LearningLanguageSection