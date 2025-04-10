import "./Service5.scss";
import { FaCheck } from "react-icons/fa";
import ServiceContact from "../../../components/ServiceContact/ServiceContact";
import { service5Data, service5Steps } from "../../../assets/servicesData";

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

const Service5 = () => {
  const contentRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);

 

  const fetchServiceImages = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/services/civil-marriage-photography/67de712faa6520fad7a0666f`
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
    queryKey: ["serviceImages5"],
    queryFn: fetchServiceImages,
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
    retry: 2, // Retry twice on failure
  });

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
            <h1>Civil Marriage Photography</h1>
          </div>
        </div>
      </div>

      <div className="service5-container">
        <div className="service5-container-content" ref={contentRef}>
          <div className="service5-container-content-top">
            {imagesLoading && (
              <div className="service5-loader-container">
                <Loader loaderSize="serviceLoader" />
              </div>
            )}

            {imagesError && (
              <div className="service5-error-container">
                <div className="service5-error-desc">
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

          <hr />
          <div className="service-images">
            <h2>Our Civil Marriage Gallery</h2>
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
      )}æ

      <div className="service-contact">
        <ServiceContact />
      </div>
    </div>
  );
};

export default Service5;
