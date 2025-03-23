import "./Service9.scss";

import ServicePageSidebar from "../ServicePageSidebar/ServicePageSidebar";

import { FaCheck } from "react-icons/fa";
import ServiceContact from "../../../components/ServiceContact/ServiceContact";
import { service7Data, service7Steps } from "../../../assets/servicesData";

import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import axios from "axios";
import { baseUrl } from "../../../main";
import toast from "react-hot-toast";

const Service9 = () => {
  const contentRef = useRef(null);

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

   const [serviceImages, setServiceImages] = useState();
  
    useEffect(() => {
      const getServiceData = async () => {
        try {
          const { data } = await axios.get(
            `${baseUrl}/services/graduation-photography/67de7035aa6520fad7a06663`
          );
  
          if (data && data.serviceImages?.images) {
            setServiceImages(data.serviceImages.images);
          }
        } catch (error) {
          console.error("Error fetching service data:", error);
          toast.error("Failed to fetch service data. Please try again.");
        }
      };
  
      getServiceData();
    }, []);

  return (
    <div className="service9">
      <div className="service9-top-banner">
        <div className="service9-banner">
          <div className="service9-banner-desc">
            <h1>Service Details</h1>
          </div>
        </div>
      </div>

      <div className="service9-container">
        <div className="service9-container-sidebar">
          <ServicePageSidebar onSidebarClick={scrollToContent} />
        </div>

        <div className="service9-container-content" ref={contentRef}>
          <div className="service9-container-content-top">
            <div className="services-img-slide">
              <Swiper
                modules={[EffectFade, Autoplay]}
                effect="fade"
                loop={true}
                speed={1200}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="services-slide"
              >
                {serviceImages?.map((item, index) => (
                  <SwiperSlide key={index} className="service_slide">
                    <img src={item} loading="lazy" alt="services" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <h1>Graduation Photography by TK Production Film</h1>
            <p>
            Celebrate your milestone with TK Production Film! We capture your graduation’s pride and joy with stunning photography and cinematic visuals.
            </p>
          </div>

          <div className="service9-services">
            <h1>What We Offer</h1>

            <ul>
              {service7Data.map((item) => (
                <li key={item.title}>
                  <FaCheck className="check-icon" />
                  <div className="services-desc">
                    <p>{item.title} :&nbsp;</p>
                    <p>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="service9-steps">
            <h1>How It Works?</h1>

            <ul>
              {service7Steps.map((item) => (
                <li key={item.no}>
                  <p>{item.no}</p>
                  <p>
                    <span>{item.title}</span>
                  </p>
                </li>
              ))}
            </ul>

            <p>
            Let us make your success unforgettable!
            </p>
          </div>
        </div>
      </div>

      <div className="service-contact">
        <ServiceContact />
      </div>
    </div>
  );
};

export default Service9;
