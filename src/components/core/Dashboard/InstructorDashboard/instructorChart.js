import React, { useState } from 'react';
import { Chart, registerables } from 'chart.js';  // Corrected import
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);

const InstructorChart = ({ courses }) => {
    const [currChart, setCurrChart] = useState("students");

    // Function to generate random colors
    const randomColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            colors.push(color);
        }
        return colors;
    };

    // Data for student chart
    const studentChart = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: randomColors(courses.length),
            },
        ],
    };

    // Data for income chart
    const incomeChart = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerate),
                backgroundColor: randomColors(courses.length),
            },
        ],
    };

    const options = {};

    return (
        <div className='flex  gap-4 bg-richblack-700 justify-evenly rounded p-4 ' >
            <div className='flex flex-col gap-4'>
            <p className='text-richblack-300 font-semibold text-xl'>Visualise</p>
            <div className='flex gap-4'>
                <button className={`${currChart==="students" ?"text-yellow-50 bg-richblack-600 rounded":"text-richblack-200 rounded"} px-3 py-2`}
                onClick={() => setCurrChart("students")}>Students</button>
                <button
                className={`${currChart==="income" ?"text-yellow-50 bg-richblack-600 rounded":"text-richblack-200 rounded"} px-3 py-2`}
                 onClick={() => setCurrChart("income")}>Income</button>
            </div>
            </div>
            
            <div>
                <Pie
                    data={currChart === "students" ? studentChart : incomeChart}
                    options={options}
                />
            </div>
        </div>
    );
};

export default InstructorChart;
