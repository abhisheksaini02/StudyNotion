import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router";
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal'
import { getFullDetailsOfCourse } from "../services/operations/courseAPI";
import { setCourseSectionData,setCompletedLectures, setTotalNoOfLectures,setEntireCourseData } from "../slices/viewCourseSlice";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
 const ViewCourse=()=>{
    
    const [reviewModal,setReviewModal]=useState(false)
    const {token}=useSelector((state)=>state.auth);
    const{courseId}=useParams()
    const dispatch=useDispatch()

 useEffect(()=>{
const setCourseSpecificDetails=async()=>{
    const courseData=await getFullDetailsOfCourse(token,courseId)
    dispatch(setCourseSectionData(courseData?.courseDetails.courseContent))
    
    dispatch(setEntireCourseData(courseData.courseDetails))

    dispatch(setCompletedLectures(courseData.completedVideoes))
    let lectures=0;
    courseData?.courseDetails?.courseContent?.forEach((sec)=>{
        lectures+=sec.subSection.length
    })
    dispatch(setTotalNoOfLectures(lectures))
}
setCourseSpecificDetails()
 },[])


 return (<div>
            <div className='realtive flex min-h-[calc(100vh-3.5rem)]'>
            <VideoDetailsSidebar
            setReviewModal={setReviewModal}></VideoDetailsSidebar>
        
         <div className='w-9/12 py-10   mx-auto'>
            <Outlet></Outlet>
         </div>
    </div>
    {
        reviewModal &&<CourseReviewModal  setReviewModal={setReviewModal}></CourseReviewModal>
    }
        </div>
    )
 }
 export default ViewCourse