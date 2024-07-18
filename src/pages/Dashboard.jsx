import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import Sidebar from '../components/core/Dashboard/Sidebar'

const Dashboard=()=>{
    const {loading:authLoading}=useSelector((state)=>state.auth)
    const {loading:profileLoading}=useSelector((state)=>state.profile)
    if(authLoading||profileLoading){
        return (
            toast.loading('Loading')
        )
    }
    
    
    return (
    <div className='realtive flex min-h-[calc(100vh-3.5rem)]'>
        <Sidebar></Sidebar>
        
         <div className='w-9/12 py-10   mx-auto'>
            <Outlet></Outlet>
         </div>
    </div>
)
}
export default Dashboard