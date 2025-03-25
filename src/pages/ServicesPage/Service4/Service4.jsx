import "./Service4.scss";
import { FaCheck } from "react-icons/fa";
import ServiceContact from "../../../components/ServiceContact/ServiceContact";
import { service2Data, service2Steps } from "../../../assets/servicesData";

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

const Service4 = () => {
  const contentRef = useRef(null);

  const [selectedImg, setSelectedImg] = useState(null);

  const fetchServiceImages = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/services/pre-wedding-photography/67de710faa6520fad7a0666d`
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
    queryKey: ["serviceImages4"],
    queryFn: fetchServiceImages,
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
    retry: 2, // Retry twice on failure
  });

  return (
    <div className="service4">
      <SEO
        title="Pre-Wedding Photography | TK Production Film - Capture Romantic Moments Before Your Big Day"
        description="Cherish your love story with TK Production Film's pre-wedding photography. Stunning, romantic, and creative photos to treasure forever. Book your session now!"
        keywords="pre-wedding photography, couple photoshoot, romantic pre-wedding, creative pre-wedding pictures, TK Production Film, couple portraits"
        url="https://tkproductionfilm.com/pre-wedding-photography"
        author="TK Production Film"
      />

      <div className="service4-top-banner">
        <div className="service4-banner">
          <div className="service4-banner-desc">
            <h1>Pre-Wedding Photography</h1>
          </div>
        </div>
      </div>

      <div className="service4-container">
        <div className="service4-container-content" ref={contentRef}>
          <div className="service4-container-content-top">
            {imagesLoading && (
              <div className="service4-loader-container">
                <Loader loaderSize="serviceLoader" />
              </div>
            )}

            {imagesError && (
              <div className="service4-error-container">
                <div className="service4-error-desc">
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

            <h1>Pre-Wedding Photography by TK Production Film</h1>
            <p>
              At TK Production Film, we turn your love story into a cinematic
              pre-wedding masterpiece. With 16+ years of expertise, we capture
              your chemistry in stunning locations—from lush forests to vibrant
              cities like Lisbon, Portugal. Our heartfelt photos blend
              creativity and passion, creating timeless memories you’ll
              treasure.
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

          <hr />
          <div className="service-images">
            <h2>Our Pre-Wedding Photography Gallery</h2>
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

export default Service4;
