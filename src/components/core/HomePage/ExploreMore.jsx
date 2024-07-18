import React from "react";
import { useState } from "react";
import {HomePageExplore} from'../../../data/homepage-explore'
import HighlightText from "./HighlightText";
import Coursecard from "./Coursecard";
const tabsName=['Free' ,
    "New to Coding",
    "Most Popular",
    "Skills Paths",
    "Career Paths"
]
const ExploreMore=()=>{
const [currentTab ,setCurrentTab]=useState(tabsName[0])
const [courses,setCourses]=useState(HomePageExplore[0].courses)
const [currentCard,setcurrentCard]=useState(HomePageExplore[0].courses[0].heading)
const setMyCards=(value=>{
    setCurrentTab(value)
    const result=HomePageExplore.filter((courses)=>courses.tag===value)
    setCourses(result[0].courses)
    setcurrentCard(result[0].courses[0].heading)
})
    return (
        <div>
            <div className="text-4xl font-semibold text-center">
                Unlock the <HighlightText text={"Power of Code"}></HighlightText>
            </div>
            <p className="text-center text-richblack-300 text-md mt-5">Learn to build anything you can imagine</p>
           <div  className="flex gap-5 mt-7 bg-richblack-800 rounded-full"> 
            {
              tabsName.map((element,index)=>{
                return(
                    <div className={`text-[16px]    ${currentTab===element? "bg-richblack-700 text-richblack-5 font-medium"
                    :"text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer px-5 py-3`}
                    key={index}
                    onClick={()=>setMyCards(element)}>


                    <div>{element}</div>
                    </div>
                
                )


                
              })  
            }
           </div>
   {/* cards  */}
           <div>
            {
                courses.map((element,index)=>{
                    return (
                        <Coursecard
                        key={index}
                        cardData={element}
                        currentCard={currentCard}
                        setCurrentCard={setcurrentCard}></Coursecard>
                    )
                })
            }

           </div>
        </div>
        
    )
}
export default ExploreMore