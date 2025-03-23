import "./OurCore.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { useEffect, useState } from "react";

import { baseUrl } from "../../main";
import axios from "axios";

const OurCore = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const getAllTeam = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/team/all-teams`);
        setTeam(data?.teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
  
    getAllTeam();
  }, []);
  

  return (
    <div className="ourCore">
      <div className="ourCore-top">
        <h1>Our Team</h1>
        <p>
          At <span className="bold-text">TK Production Film</span>, we’re
          passionate about capturing your precious memories, preserving your
          love, and celebrating every beautiful moment of life.
        </p>
      </div>

      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        speed={1200}
        modules={[Navigation, Autoplay]}
        className="ourCore-slider"
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          400: { slidesPerView: 1.5, spaceBetween: 10 },

          480: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 2.5, spaceBetween: 15 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
      >
        {team.map((member, index) => (
          <SwiperSlide key={index} className="ourCore-slider-card">
            <img src={member.image} alt={member.title} />
            <h2>{member.name}</h2>
            <p>{member.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation buttons with React Icons */}
      <div className="custom-prev ">
        <BsArrowLeft className="core-icon" />
      </div>
      <div className="custom-next">
        <BsArrowRight className="core-icon" />
      </div>
    </div>
  );
};

export default OurCore;
