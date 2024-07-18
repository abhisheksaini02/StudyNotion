import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import InstructorChart from './instructorChart';
import { Link } from 'react-router-dom';

const Instructor = () => {
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const [instructorData, setInstructorData] = useState([]);
    const [courses, setCourses] = useState([]);
    const { user } = useSelector((state) => state.profile);

    useEffect(() => {
        const getCourseData = async () => {
            setLoading(true);
            try {
                const instructorApiData = await getInstructorData(token);
                const result = await fetchInstructorCourses(token);
                console.log("YEEE", result);
                
                if (instructorApiData && instructorApiData.length) {
                    setInstructorData(instructorApiData);
                }
                
                if (result && result.length) {
                    setCourses(result);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        getCourseData();
    }, [token]);

    const totalAmount = instructorData.reduce((acc, curr) => acc + curr.totalAmountGenerate, 0);
    const totalStudents = instructorData.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

    return (
        <div className='mx-6 flex flex-col'>
            <div className='flex flex-col'>
                <div className='text-richblack-500 text-3xl font-semibold'>Hi {user?.firstName}</div>
                <p className='text-richblack-300'>Let's start something new...</p>
            </div>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : instructorData.length > 0 ? (
                    <>
                        <div className='mt-10 flex   w-full gap-10'>
                        <div className='w-[70%]' >
                                <InstructorChart courses={instructorData} />
                            </div>
                            <div className='text-richblack-100 bg-richblack-700 rounded-md text-xl  '>
                                <div className='p-6 flex flex-col gap-2 '>
                                    <p className='font-semibold'>Statistics</p>
                                    <div>
                                        <p className='font-semibold'>Total Courses:</p>
                                        <p>{courses.length}</p>
                                    </div>
                                    <div>
                                        <p className='font-semibold'>Total Students:</p>
                                        <p>{totalStudents}</p>
                                    </div>
                                    <div>
                                        <p className='font-semibold'>Total Income:</p>
                                        <p>Rs. {totalAmount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-richblack-700 text-richblack-200 mt-8 rounded-md py-4'>
                            <div className='flex justify-between'>
                                <div className='ml-4 font-semibold'>Your Courses</div>
                                <Link className='mr-4 text-yellow-50' to="/dashboard/my-courses">View All</Link>
                            </div>
                            <div className='flex flex-col lg:flex-row justify-evenly'>
                                {courses.slice(0, 3).map((course, i) => (
                                    <div key={i} className='p-2'>
                                        <img src={course.thumbnail} alt={`${course.courseName} thumbnail`} />
                                        <div>{course.courseName}</div>
                                        <div className='flex gap-1'>
                                            <div>{course?.studentsEnrolled.length} students</div>
                                            <div className='border-l border-richblack-200'></div>
                                            <div>{course.price}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div>
                        <p>You have not created any courses yet.</p>
                        <Link to='/dashboard/addCourse'>Create a Course</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Instructor;
