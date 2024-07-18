import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Navbar from './components/common/Navbar.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import OpenRoute from "./components/core/Auth/OpenRoute.jsx";
import ForgotPassword from './pages/ForgotPassword.js';
import UpdatePassword from './pages/UpdatePassword.js';
import VerifyEmail from './pages/VerifyEmail.js';
import About from './pages/About.js';
import Contact from './pages/Contact.jsx';
import MyProfile from './components/core/Dashboard/MyProfile.jsx';
import PrivateRoute from './components/core/Auth/PrivateRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Settings from './components/core/Dashboard/Settings/index.js';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cart from './components/core/Dashboard/Cart/index.jsx'
import { useSelector } from 'react-redux';
import AddCourse from './components/core/Dashboard/AddCourse/index.js';
import MyCourses from './components/core/Dashboard/MyCourses.js';
import EditCourse from './components/core/Dashboard/EditCourse/index.js';
import Catalog from './pages/Catalog.js';
import CourseDetails from './pages/CourseDetails.js';
import Error from './pages/Error.js';
import ViewCourse from './pages/ViewCourse.js';
import { ACCOUNT_TYPE } from './utils/constants.js';
import VideoDetails from './components/core/ViewCourse/VideoDetails.js';
import Instructor from './components/core/Dashboard/InstructorDashboard/instructor.js';



function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.profile)

  return (
    <div className='min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="/about"
          element={
            
              <About />
            
          }
        />
        <Route
          path="/contact"
          element={
            
              <Contact />
            
          }
        />
        <Route 
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    >
      <Route path="dashboard/my-profile" element={<MyProfile />} />
       <Route path="dashboard/settings" element={<Settings />} /> 
       <Route path="dashboard/instructor" element={<Instructor />} />
       {
        user?.accountType === 'Student' && (
          <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </>
        )
      }
      {
        user?.accountType === 'Instructor' && (
          <>
          <Route path='dashboard/add-course' element={<AddCourse/>} /> 
          <Route path='dashboard/my-courses' element={<MyCourses/>} /> 
          <Route path="dashboard/instructor" element={<Instructor />} />
          <Route path='dashboard/edit-course/:courseId' element={<EditCourse/>} /> 
          </>
        )
      }
      
                                 </Route>

       <Route  element={
        <PrivateRoute>
          <ViewCourse></ViewCourse>
        </PrivateRoute>
       }>


        {
          user?.accountType===ACCOUNT_TYPE.STUDENT&&(
            <>
            <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails></VideoDetails>}></Route>
            </>
          )
        }
        </Route>                         

      <Route path="*" element={<Error/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
