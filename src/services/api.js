
const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API:  "http://localhost:4000/api/v1/auth/sendotp",
  SIGNUP_API: "http://localhost:4000/api/v1/auth/signup",
  LOGIN_API: "http://localhost:4000/api/v1/auth/login",
  RESETPASSTOKEN_API: "http://localhost:4000/api/v1/auth/reset-password-token",
  RESETPASSWORD_API: "http://localhost:4000/api/v1/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: "http://localhost:4000/api/v1/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API:BASE_URL +"/profile/instructorDashboard"
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API:  "http://localhost:4000/api/v1/payment/capturePayment",
  COURSE_VERIFY_API: "http://localhost:4000/api/v1/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: "http://localhost:4000/api/v1/payment/sendPaymentSuccessEmail",
}

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: "http://localhost:4000/api/v1/course/getCourseDetails",
  
  EDIT_COURSE_API: "http://localhost:4000/api/v1/course/editCourse",

  COURSE_CATEGORIES_API:  "http://localhost:4000/api/v1/course/showAllCategories",

  CREATE_COURSE_API: "http://localhost:4000/api/v1/course/createCourse",

  CREATE_SECTION_API: "http://localhost:4000/api/v1/course/addSection",
  
  CREATE_SUBSECTION_API: "http://localhost:4000/api/v1/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",

  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",

  GET_ALL_INSTRUCTOR_COURSES_API: "http://localhost:4000/api/v1/course/my-courses",

  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",

  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",

  DELETE_COURSE_API:"http://localhost:4000/api/v1/course/deleteCourse",

  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
    
    
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  
  CREATE_RATING_API: BASE_URL + "/course/createRating",
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
}

// CATAGORIES API
export const categories = {
  CATEGORIES_API: "http://localhost:4000/api/v1/course/showAllCategories",
}

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
}
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}