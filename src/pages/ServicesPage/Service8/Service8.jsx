import "./Service8.scss";
import { FaCheck } from "react-icons/fa";
import ServiceContact from "../../../components/ServiceContact/ServiceContact";
import { service4Data, service4Steps } from "../../../assets/servicesData";

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

const Service8 = () => {
  const contentRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);

  const fetchServiceImages = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/services/baby-shower-photography/67de7198aa6520fad7a06675`
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
    queryKey: ["serviceImages8"],
    queryFn: fetchServiceImages,
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
    retry: 2, // Retry twice on failure
  });

  return (
    <div className="service8">
      <SEO
        title="Baby Shower Photography | TK Production Film - Cherish Precious Moments"
        description="Capture the joy and beauty of your baby shower with professional photography by TK Production Film. Book your session today and create timeless memories!"
        keywords="baby shower photography, maternity event photos, baby celebration pictures, professional baby shower images, TK Production Film"
        url="https://tkproductionfilm.com/baby-shower-photography"
        author="TK Production Film"
      />

      <div className="service8-top-banner">
        <div className="service8-banner">
          <div className="service8-banner-desc">
            <h1>Baby Shower Photography</h1>
          </div>
        </div>
      </div>

      <div className="service8-container">
        <div className="service8-container-content" ref={contentRef}>
          <div className="service8-container-content-top">
            {imagesLoading && (
              <div className="service8-loader-container">
                <Loader loaderSize="serviceLoader" />
              </div>
            )}

            {imagesError && (
              <div className="service8-error-container">
                <div className="service8-error-desc">
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

            <h1>Baby Shower Photography by TK Production Film</h1>
            <p>
              Celebrate new beginnings with TK Production Film! We capture the
              joy, love, and excitement of your baby shower with elegance and
              creativity.
            </p>
          </div>

          <div className="service8-services">
            <h1>What We Offer</h1>
            <ul>
              {service4Data.map((item) => (
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

          <div className="service8-steps">
            <h1>How It Works?</h1>
            <ul>
              {service4Steps.map((item) => (
                <li key={item.no}>
                  <p>{item.no}</p>
                  <p>
                    <span>{item.title}</span> {item.desc}
                  </p>
                </li>
              ))}
            </ul>
            <p>Let us make your baby shower memories last forever!</p>
          </div>

          <hr />
          <div className="service-images">
            <h2>Our Baby Shower Photography Gallery</h2>
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

export default Service8;
