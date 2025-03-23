import "./Service7.scss";

import ServicePageSidebar from "../ServicePageSidebar/ServicePageSidebar";

import { FaCheck } from "react-icons/fa";
import ServiceContact from "../../../components/ServiceContact/ServiceContact";
import { service3Data, service3Steps } from "../../../assets/servicesData";
import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import axios from "axios";
import { baseUrl } from "../../../main";
import toast from "react-hot-toast";

const Service7 = () => {
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
          `${baseUrl}/services/birthday-photography/67de7174aa6520fad7a06673`
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
    <div className="service7">
      <div className="service7-top-banner">
        <div className="service7-banner">
          <div className="service7-banner-desc">
            <h1>Service Details</h1>
          </div>
        </div>
      </div>

      <div className="service7-container">
        <div className="service7-container-sidebar">
          <ServicePageSidebar onSidebarClick={scrollToContent} />
        </div>

        <div className="service7-container-content" ref={contentRef}>
          <div className="service7-container-content-top">
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
            <h1>Birthday Photography by TK Production Film</h1>
            <p>
              Celebrate your big day with TK Production Film! From grand parties
              to intimate gatherings, we capture every smile and moment with
              creativity and precision.
            </p>
          </div>

          <div className="service7-services">
            <h1>What We Offer</h1>

            <ul>
              {service3Data.map((item) => (
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

          <div className="service7-steps">
            <h1>How It Works?</h1>

            <ul>
              {service3Steps.map((item) => (
                <li key={item.no}>
                  <p>{item.no}</p>
                  <p>
                    <span>{item.title}</span> {item.desc}
                  </p>
                </li>
              ))}
            </ul>

            <p>Let us make your birthday unforgettable!</p>
          </div>
        </div>
      </div>

      <div className="service-contact">
        <ServiceContact />
      </div>
    </div>
  );
};

export default Service7;
