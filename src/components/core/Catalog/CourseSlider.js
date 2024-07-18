import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";  // Correct import path for Swiper modules

import Course_Card from "./Course_Card";

const CourseSlider = ({ courses }) => {
  return (
    <div>
      {courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination]}
          freeMode={true}
          pagination={{ clickable: true }}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {courses.map((course, index) => (
            <SwiperSlide key={index}>
              <Course_Card course={course} Height={"h-[100px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div> No Courses Found</div>
      )}
    </div>
  );
};

export default CourseSlider;
