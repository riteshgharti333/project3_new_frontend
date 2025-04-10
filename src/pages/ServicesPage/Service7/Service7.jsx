import "./Service7.scss";
import { FaCheck } from "react-icons/fa";
import ServiceContact from "../../../components/ServiceContact/ServiceContact";
import { service3Data, service3Steps } from "../../../assets/servicesData";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../../main";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader/Loader";
import SEO from "../../../SEO/SEO";
import { serviceimages } from "../../../assets/data";

const Service7 = () => {
  const contentRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchServiceImages = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/services/birthday-photography/67de7174aa6520fad7a06673`
      );

      if (!data || !data.serviceImages?.images?.length) {
        toast.error("No images found.");
        return [];
      }

      return data.serviceImages.images;
    } catch (error) {
      console.error("Error fetching service images:", error);

      if (error.message === "Network Error") {
        toast.error("Network error! Check your internet connection.");
      } else if (error.response) {
        toast.error(
          error.response.status >= 500
            ? "Server error! Please try again later."
            : "Failed to load images!"
        );
      } else {
        toast.error("Unexpected error occurred!");
      }

      return [];
    }
  };

  const {
    data: serviceImages,
    isLoading: imagesLoading,
    isError: imagesError,
    error: imgError,
    refetch: refetchImages,
  } = useQuery({
    queryKey: ["serviceImages7"],
    queryFn: fetchServiceImages,
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
    retry: 2, // Retry twice on failure
  });

  return (
    <div className="service7">
      <SEO
        title="Birthday Photography | TK Production Film - Capture Your Special Moments"
        description="Celebrate your special day with professional birthday photography by TK Production Film. Book your session today and make your memories unforgettable!"
        keywords="birthday photography, event photography, birthday party photos, birthday memories, TK Production Film"
        url="https://tkproductionfilm.com/birthday-photography"
        author="TK Production Film"
      />

      <div className="service7-top-banner">
        <div className="service7-banner">
          <div className="service7-banner-desc">
            <h1>Birthday Photography</h1>
          </div>
        </div>
      </div>

      <div className="service7-container">
        <div className="service7-container-content" ref={contentRef}>
          <div className="service7-container-content-top">
            {imagesLoading && (
              <div className="service7-loader-container">
                <Loader loaderSize="serviceLoader" />
              </div>
            )}

            {imagesError && (
              <div className="service7-error-container">
                <div className="service7-error-desc">
                  <p>{imgError.message}</p>
                  <button onClick={refetchImages}>Retry</button>
                </div>
              </div>
            )}

            {serviceImages && serviceImages.length > 0 ? (
              <div className="services-img-slide">
                <Swiper
                  modules={[EffectFade, Autoplay]}
                  effect="fade"
                  loop={true}
                  speed={1200}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  className="services-slide"
                >
                  {serviceImages.map((item, index) => (
                    <SwiperSlide key={index} className="service_slide">
                      <img src={item} loading="lazy" alt="services" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              !imagesLoading && <p>No images available</p>
            )}

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

          <hr />
          <div className="service-images">
            <h2>Our Birthday Photography Gallery</h2>
            <div className="service-image-cards">
              {serviceimages.map((item, index) => (
                <div className="service-image-card" key={index}>
                  <img
                    src={item.img}
                    alt="service image"
                    loading="lazy"
                    onClick={() => setSelectedImg(item.img)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedImg && (
        <div className="image-modal" onClick={() => setSelectedImg(null)}>
          <img src={selectedImg} alt="Fullscreen Preview" loading="lazy" />
          <span className="close-btn" onClick={() => setSelectedImg(null)}>
            ×
          </span>
        </div>
      )}

      <div className="service-contact">
        <ServiceContact />
      </div>
    </div>
  );
};

export default Service7;
