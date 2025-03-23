import "./Service5.scss";

import ServicePageSidebar from "../ServicePageSidebar/ServicePageSidebar";

import { FaCheck } from "react-icons/fa";
import ServiceContact from "../../../components/ServiceContact/ServiceContact";
import { service5Data, service5Steps } from "../../../assets/servicesData";
import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import axios from "axios";
import { baseUrl } from "../../../main";
import toast from "react-hot-toast";
import SEO from "../../../SEO/SEO";

const Service5 = () => {
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
          `${baseUrl}/services/civil-marriage-photography/67de712faa6520fad7a0666f`
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
    <div className="service5">
      <SEO
        title="Civil Marriage Photography | TK Production Film - Capture Your Special Day with Elegance"
        description="Preserve the memories of your civil marriage with TK Production Film. Expert photography capturing every emotion and detail. Book your session today!"
        keywords="civil marriage photography, wedding photography, marriage portraits, TK Production Film, elegant civil wedding photos"
        url="https://tkproductionfilm.com/civil-marriage-photography"
        author="TK Production Film"
      />

      <div className="service5-top-banner">
        <div className="service5-banner">
          <div className="service5-banner-desc">
            <h1>Service Details</h1>
          </div>
        </div>
      </div>

      <div className="service5-container">
        <div className="service5-container-sidebar">
          <ServicePageSidebar onSidebarClick={scrollToContent} />
        </div>

        <div className="service5-container-content" ref={contentRef}>
          <div className="service5-container-content-top">
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
            <h1>Civil Marriage Photography by TK Production Film</h1>
            <p>
              At TK Production Film, we capture the beauty and intimacy of your
              civil marriage with elegance. From simple registry moments to
              grand celebrations, we preserve every heartfelt detail.
            </p>
          </div>

          <div className="service5-services">
            <h1>What We Offer</h1>

            <ul>
              {service5Data.map((item) => (
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

          <div className="service5-steps">
            <h1>How It Works?</h1>

            <ul>
              {service5Steps.map((item) => (
                <li key={item.no}>
                  <p>{item.no}</p>
                  <p>
                    <span>{item.title}</span>
                  </p>
                </li>
              ))}
            </ul>

            <p>Let us tell your civil marriage story beautifully!</p>
          </div>
        </div>
      </div>

      <div className="service-contact">
        <ServiceContact />
      </div>
    </div>
  );
};

export default Service5;
