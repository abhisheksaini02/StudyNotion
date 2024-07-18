import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { useEffect } from 'react';
import CourseTable from './InstructorCourses/CourseTable';
import {fetchInstructorCourses} from "../../../services/operations/courseAPI"
 const MyCourses =()=>{



    const {token}=useSelector((state)=>state.auth)
    const navigate=useNavigate()
    const [courses,setCourses]=useState([])
   useEffect(()=>{
    const fetchCourses=async()=>{
        const result=await fetchInstructorCourses(token)
        if(result){
            setCourses(result)
        }
        console.log("Courses jo DB se aaye h",courses)


    };
    fetchCourses();


   },[])



    return (<div>
        <div className='flex  justify-between items-center text-richblack-500'>
            <h1 className='text-3xl font-semibold'>My Courses</h1>
            <button  onClick={() => navigate("/dashboard/add-course")}
            className='flex items-center gap-3 bg-yellow-50  text-richblack-800 *
             p-3 font-semibold border-2 border-richblack-500 rounded'>Add Courses <IoMdAdd /></button>

        </div>

        {
            courses && <CourseTable courses={courses}
            setCourses={setCourses}></CourseTable>
        }


    </div>)
 }

 export default MyCourses
