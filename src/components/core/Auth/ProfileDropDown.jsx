import React from "react";
import { Link } from "react-router-dom";

const   ProfileDropDown=({user})=>{
  const image=user?.image
  return (
    <div>
      <Link to='dashboard/my-profile'>
      <img src={image} 
      className="h-[40px] w-[40px] rounded-full"></img></Link>
      
    </div>
  )
}
export default ProfileDropDown