import React from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import { useSelector } from "react-redux";

import { AiOutlineShoppingCart } from "react-icons/ai";
import logo from '../../assets/Logo/Logo-Full-Light.png';
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { NavbarLinks } from '../../data/navbar-links';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { fetchCourseCategories } from "../../services/operations/courseAPI";
import { useEffect } from "react";
import { useState } from "react";

// const subLinks = [
//     {
//         title: "Python",
//         link: "/catalog/python"
//     },
//     {
//         title: "webd",
//         link: "/catalog/webd"
//     },
// ];


const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems} = useSelector((state) => state.cart);

    const location = useLocation();

    const [subLinks,setSubLinks]=useState([])

    console.log( "sublink" ,subLinks)
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await fetchCourseCategories();
                if(categories){
                setSubLinks(categories);}
            } catch (error) {
                console.error("Failed to fetch course categories", error);
            }
        };

        fetchCategories();
    }, []);


    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    console.log('Token:', token);
    console.log('User:', user);
    console.log('Total Items in Cart:', totalItems);
    console.log( "sublink" ,subLinks)

    return (
        <div className="flex justify-between border-b-2 border-richblack-25 h-14">
            <div className="w-11/12 max-w-maxContent flex justify-between items-center mx-auto">
                {/* logo */}
                <Link to="/">
                    <img src={logo} width={160} height={42} loading="lazy" alt="Logo" />
                </Link>
                {/* links */}
                <nav>
                    <ul className="flex gap-x-6 text-richblack-25">
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {link.title === "Catalog" ? (
                                        <div className="relative flex items-center gap-2 group">
                                            <p>{link.title}</p>
                                            <IoIosArrowDropdownCircle />
                                            <div className="invisible absolute translate-y-[100%]  translate-x-[-30%]  font-md mt-2 flex flex-col  bg-richblack-50 text-richblack-800 opacity-0 rounded-md transition-all duration-200 group-hover:visible z-[100] group-hover:opacity-100 lg:w-[300px] p-2 shadow-lg">
                                                <div className="absolute left-[50%] translate-y-[-80%] h-4 w-4 rotate-45 rounded   bg-richblack-50"></div>
                                                {
                                                    subLinks.length ? (
                                                        subLinks.map( (subLink, index) => (
                                                            <Link  to={`/catalog/${subLink.name
                                                                .split(" ")
                                                                .join("-")
                                                                .toLowerCase()}`} key={index}>
                                                                <p className="hover:bg-richblack-400">{subLink.name}</p>
                                                            </Link>
                                                        ) )
                                                ) : (<div></div>)
                                                }
                                            </div>
                                        </div>
                                    ) : (
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )}
                                </li>
                            ))
                        }
                    </ul>
                </nav>
                
                {/* login/signup/dashboard */}
                <div className="flex gap-x-4 items-center">
                {user && user?.accountType !== "Instructor" && (
    <Link to="/dashboard/cart" className="relative inline-block">
        <AiOutlineShoppingCart style={{ color: 'darkgrey', fontSize: '24px' }} />
        {totalItems > 0 && (
            <span className="absolute top-2 right-4  text-white bg-pink-400 rounded-full h-3 w-4 flex items-center justify-center text-xs">
                {totalItems}
            </span>
        )}
    </Link>
)}

                    {!token && (
                        <>
                            <Link to='/login'>
                                <button className="border-2 rounded-md bg-richblack-500 border-richblack-700 p-2">Login</button>
                            </Link>
                            <Link to='/signup'>
                                <button className="border-2 rounded-md bg-richblack-500 border-richblack-700 p-2">Signup</button>
                            </Link>
                        </>
                    )}
                    {token && <ProfileDropDown  user={user}/>}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
