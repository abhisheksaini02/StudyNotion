import React from "react";
import Logo1 from "../../..//assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../..//assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../..//assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../..//assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"
import { MdDescription } from "react-icons/md";
 const timeline=[{
    Logo:Logo1,
    heading:"Leadership",
    Description:"Fully committed to the success company"
 },
{  Logo:Logo2,
    heading:"Responsibility",
    Description:"Students will be out top priority"
 },
{  Logo:Logo3,
    heading:"Flexibility",
    Description:"The ability to switch is an important skill."
 },
{  Logo:Logo4,
    heading:"Solve the Problem",
    Description:"Code your way to solution "
 }]
const TimelineSection=()=>{
    return (
<div>
    <div className="flex  items-center">
     <div className="flex flex-col w-[40%] gap-5">
        {
            timeline.map((element,index)=>{
                return(
                   <div className="flex gap-6 key={index}"> 
                   <div className="w-[50px] h-[50px]  bg-white flex items-center justify-center rounded-full">
                    <img src={element.Logo}></img>

                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                        <p className="text-base">{element.Description}</p>

                    </div>
                    </div> 
                )
            })
        }
    </div>
    <div>
       <div className="relative shadow-blue-200 ">
        <img src={timelineImage}></img>
        <div className="absolute bg-caribbeangreen-700 flex text-white uppercase py-10
        translate-x-[10%]  translate-y-[-40%]">
            <div className="flex gap-5 items-center border-r border-caribbeangreen-300 px-7">
               <p className="text-3xl font-bold ">10</p>
               <p className="text-caribbeangreen-400 text-sm"> Years of Experience </p>
                
            </div>
            <div className="flex gap-5 items-center  px-7">
               <p className="text-3xl font-bold ">250</p>
               <p className="text-caribbeangreen-400 text-sm"> Types of Courses </p>
                
            </div>
        </div>
       </div>
    </div>

</div>
</div>
    )
}
export default TimelineSection