import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import CTAButton from '../components/core/HomePage/Button'
import HighlightText from '../components/core/HomePage/HighlightText'
import banner from "../assets/Images/banner.mp4"
import TimelineSection from "../components/core/HomePage/TimelineSection"; 
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from'../components/common/Footer'
import ExploreMore from "../components/core/HomePage/ExploreMore";

 const Home=()=>{
   return ( <div>

        {/* section 1 */}
        <div className=" group relative mx-auto flex flex-col  w-11/12 max-w-maxContent items-center text-white 
        justify-between ">
           <Link to={'/signup'}>
            <div className='mx-auto font-bold border-b-2 mt-4 border-richblack-200 bg-richblack-800 rounded-full text-richblack-200 w-fit
            transition-all duration-200 hover:scale-95 '>
                <div className="flex  flex-row  gap-3 items-center  px-10 py-[5px]
                transition-all duration-200">
                    <p>Become an Instructor</p>
                    <FaArrowRight />
                    </div>
                    </div>
                    </Link> 

                    <div className=" text-center font-semibold text-3xl mt-7">Empower Your Future with <HighlightText text={"Coding Skills"}></HighlightText></div>
                    <div className="w-[90%]  text-center font-bold text-md text-richblack-200 mt-4">With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a  wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. </div>
                    <div className="flex flex-row gap-7 mt-8">
                      <CTAButton active={true} linkto={"/signup"}> Learn More</CTAButton>
                      <CTAButton  active={false} linkto={"/login"}> Book a Demo </CTAButton>
                    </div>
                    <div className=" mx-12 my-12 border-b-8 border-r-8 w-[80%] border-white 
                    ">
                       <video
                       muted loop autoPlay><source src={banner}></source>
                        </video> 
                    </div>

                    {/* code of  section1  */}
                    <div className="w-[80%]">
                        <CodeBlocks 
                        position={"lg:flex-row"}
                        heading={
                            <div className="text-3xl font-bold">Unlock your <HighlightText text={"coding potential"}></HighlightText> with our online courses.</div>
                        }
                            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                            ctabtn1={
                                {
                                    text:"Try it Yourself",
                                    linkto:'/signup',
                                    active:true
                                }
                            }
                            ctabtn2={
                                {
                                    text:"Learn More",
                                    linkto:'/login',
                                    active:false
                                }
                            }
                            codeblock={` <!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n<head>\n body>\n<h1><ahref="/">Header</a>\n<h1>nav>\n<ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav`}
                            
                            
                            
                            codeColor={"text-yellow-25"}>

                        </CodeBlocks>
                    </div>

                     {/* code2 of  section1  */}
                     <div className="w-[80%]">
                        <CodeBlocks 
                        position={"lg: flex-row-reverse"}
                        heading={
                            <div className="text-3xl font-bold">Start <HighlightText text={"coding in seconds"}></HighlightText>.</div>
                        }
                            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                            ctabtn1={
                                {
                                    text:"Continue Lesson",
                                    linkto:'/signup',
                                    active:true
                                }
                            }
                            ctabtn2={
                                {
                                    text:"Learn More",
                                    linkto:'/login',
                                    active:false
                                }
                            }
                            codeblock={` <!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n<head>\n body>\n<h1><ahref="/">Header</a>\n<h1>nav>\n<ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav`}
                            
                            
                            
                            codeColor={"text-yellow-25"}>

                        </CodeBlocks>
                    </div>
          <ExploreMore></ExploreMore>         

        </div>

        /* section 2 */
        <div className="bg-pure-greys-5  ">
            <div className ="h-[300px]" style={{ backgroundImage: 'url(https://t3.ftcdn.net/jpg/07/41/15/28/240_F_741152854_oUhGOAMyuNC7mPR1TMUz7jDPlDk0QoUH.jpg)' }}>
                <div className="w-11/12 max-w-maxContent flex flex-col  mx-auto items-center">
                 <div className="h-[120px]"></div>
                 <div className="flex flex-row gap-7 justify-center mx-auto "> 
                  <CTAButton active={true } linkto={'/signup'}>
                        <div className="flex gap-2 items-center">Explore Full Catalog 
                            <FaArrowRight></FaArrowRight>
                        </div>

                    </CTAButton>
                    <CTAButton active={false} linkto={'/signup'}>
                        <div>
                            Learn More
                        </div>

                    </CTAButton>
                    </div> 

                </div>
            </div>
            <div className="w-11/12  mx-auto max-w-maxContent mt-10 flex flex-col items-center  gap-5">
                <div className=" flex flex-row gap-10  justify-center mx-auto mb-10">
                  <div className="text-4xl font-semibold w-[40%] ">
                    Get the Skills you need for a 
                    <HighlightText text={"Job that is in  demand"}></HighlightText>
                  </div>
                  <div className="flex flex-col w-[40%]  gap-10 items-start">
                    <div className="text-[16px] " >
                        The modern Studynotion is that dictates its own terms. Today ,to be a competitive 
                        specialist requires more than profeesional skills.
                    </div>
                    <CTAButton active={true} linkto={'/signup'}> Learn More</CTAButton>
                  </div>
                  
                </div>
                <TimelineSection></TimelineSection>
              <LearningLanguageSection></LearningLanguageSection>
              </div>

             
            
        </div>
         

        /* section 3 */

        <div className=" w-11/12  mx-auto max-w-maxContent flex flex-col justify-between gap-8
        bg-richblack-900   text-white " >
            {/* instructor */}
            <InstructorSection> </InstructorSection>
            <h2 className="mt-10 text-center text-3xl font-semibold ">Review from Other learners</h2>
            
           {/* reviewslider */}

        </div>




        /* section 4 */
        <Footer></Footer>

    </div>)
 }
  export default Home