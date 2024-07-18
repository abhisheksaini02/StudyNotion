import React from 'react'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import RenderSteps from '../AddCourse/renderSteps'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseAPI'
import { setEditCourse } from '../../../../slices/courseSlice'
import { setCourse } from '../../../../slices/courseSlice'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'


export default function EditCourse(){


    const dispatch=useDispatch()
    const {courseId}=useParams()
    const{course}=useSelector((state)=>state.course)
    const [loading,setLoading]=useState(false)
    const {token}=useSelector((state)=>state.auth)

    useEffect(()=>{
     const populateCourseDetails=async()=>{
        setLoading(true)
        const result=await getFullDetailsOfCourse(courseId,token)
        if(result?.courseDetails){
            dispatch(setEditCourse(true))
            dispatch(setCourse(result?.courseDetails))
        }
        setLoading(false)
     }
     populateCourseDetails()
    },[])
    if(loading){
        return (
            <div>Loading....</div>
        )
    }
    

    return (
        <div>
            <h1>Edit Course</h1>
            <div>
                {
                    course?(<div><RenderSteps/></div>):(<div>Course Not Found</div>)
                }
            </div>


            </div>
    )
}