import "./Service4.scss";

import ServicePageSidebar from "../ServicePageSidebar/ServicePageSidebar";

import { FaCheck } from "react-icons/fa";
import ServiceContact from "../../../components/ServiceContact/ServiceContact";
import { service2Data, service2Steps } from "../../../assets/servicesData";
import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Video from "../../../components/Video/Video";
import axios from "axios";
import { baseUrl } from "../../../main";
import toast from "react-hot-toast";

const Service4 = () => {
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
          `${baseUrl}/services/pre-wedding-photography/67de710faa6520fad7a0666d`
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
    <div className="service4">
      <div className="service4-top-banner">
        <div className="service4-banner">
          <div className="service4-banner-desc">
            <h1>Service Details</h1>
          </div>
        </div>
      </div>

      <div className="service4-container">
        <div className="service4-container-sidebar">
          <ServicePageSidebar onSidebarClick={scrollToContent} />
        </div>

        <div className="service4-container-content" ref={contentRef}>
          <div className="service4-container-content-top">
            <div className="services-img-slide">
              <Swiper
                modules={[EffectFade, Autoplay]}
                effect="fade"
                loop={true}
                speed={1200}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="services-slide"
              >
                {serviceImages?.map((item, index) => (
                  <SwiperSlide key={index} className="service_slide">
                    <img src={item} loading="lazy" alt="services" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <h1>Pre-Wedding Photography by TK Production Film</h1>
            <p>
              At TK Production Film, we turn your love story into a cinematic
              pre-wedding masterpiece. With 16+ years of expertise, we capture
              your chemistry in stunning locations—from lush forests to vibrant
              cities like Lisbon, Portugal. Our heartfelt films blend creativity
              and passion, creating timeless memories you’ll treasure.
            </p>
          </div>

          <div className="service4-services">
            <h1>What We Offer</h1>

            <ul>
              {service2Data.map((item) => (
                <li key={item.title}>
                  <FaCheck className="check-icon" />
                  <div className="services-desc">
                    <p>{item.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="service4-steps">
            <h1>How It Works?</h1>

            <ul>
              {service2Steps.map((item) => (
                <li key={item.no}>
                  <p>{item.no}</p>
                  <p>
                    <span>{item.title}</span>
                  </p>
                </li>
              ))}
            </ul>

            <p>Let’s make your pre-wedding moments magical!</p>
          </div>

          <div className="service4-steps">
            <h1>Our Work</h1>

            <Video videoUrl="https://youtu.be/hAQ666Nzh0E?si=EgQSRNL0zfiEnr8a" />
          </div>
        </div>
      </div>

      <div className="service-contact">
        <ServiceContact />
      </div>
    </div>
  );
};

export default Service4;
