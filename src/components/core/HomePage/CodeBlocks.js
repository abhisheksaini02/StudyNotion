import React from "react";
import CTAButton from "./Button";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa6";
import HighlightText from "./HighlightText";
const CodeBlocks=({position,heading,subheading,ctabtn1 ,ctabtn2 ,codeblock,backgroundGradient,codeColor})=>{
return (
    <div className={`flex my-20 ${position} gap-10 justify-between`}>
        {/* headings vala part */}
        <div className=" w-[45%] flex flex-col gap-8">
            <div>{heading}</div>
            <div className="text-richblack-300 font-bold">{subheading}</div>
            <div className="flex gap-7 mt-7">
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}> 
            <div className="flex gap-2 items-center">
                {ctabtn1.text}
                <FaArrowRight/>

            </div>
            </CTAButton>
            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.text}
            </CTAButton>
            </div>

        
        </div>

        {/* code vala part */}
        <div className="w-[45%] flex flex-row box-border border-2 border-richblue-300  " >
           <div className="text-center flex flex-col  w-[10%] text-richblack-400 font-inter font-bold">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>

            </div>
            <div className={`flex W-[90%] flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
         <TypeAnimation
         sequence={[codeblock,10000,""]}
         repeat={Infinity}
         cursor={true}
         style={{whiteSpace:"pre-line",
         display:"block"}} 
         omitDeletionAnimation={true}></TypeAnimation>
       </div>

    </div>
    </div>

)
}
export default CodeBlocks

