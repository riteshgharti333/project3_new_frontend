import "./Service9.scss";
import ServicePageSidebar from "../ServicePageSidebar/ServicePageSidebar";
import { FaCheck } from "react-icons/fa";
import ServiceContact from "../../../components/ServiceContact/ServiceContact";
import { service7Data, service7Steps } from "../../../assets/servicesData";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import { useQuery } from "@tanstack/react-query";  // ✅ React Query
import axios from "axios";
import { baseUrl } from "../../../main";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader/Loader";  // ✅ Loader component
import SEO from "../../../SEO/SEO";

const Service9 = () => {
  const contentRef = useRef(null);

  // ✅ Scroll to Content
  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ✅ Fetch Service Images with Error Handling
  const fetchServiceImages = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/services/graduation-photography/67de7035aa6520fad7a06663`
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

  // ✅ Use React Query for Fetching with Error Handling & Caching
  const {
    data: serviceImages,
    isLoading: imagesLoading,
    isError: imagesError,
    error: imgError,
    refetch: refetchImages,
  } = useQuery({
    queryKey: ["serviceImages9"],
    queryFn: fetchServiceImages,
    staleTime: 1000 * 60 * 5,   // Cache for 5 mins
    retry: 2,                   // Retry twice on failure
  });

  return (
    <div className="service9">
      <SEO
        title="Graduation Photography | TK Production Film - Capture Your Achievement"
        description="Celebrate your academic success with professional graduation photography by TK Production Film. Book your session today and preserve this proud milestone forever!"
        keywords="graduation photography, academic achievement photos, graduation portraits, professional graduation images, TK Production Film"
        url="https://tkproductionfilm.com/graduation-photography"
        author="TK Production Film"
      />

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
            
            {/* ✅ Loading State */}
            {imagesLoading && (
              <div className="service9-loader-container">
                <Loader loaderSize="serviceLoader" />
              </div>
            )}

            {/* ✅ Error State */}
            {imagesError && (
              <div className="service9-error-container">
                <div className="service9-error-desc">
                  <p>{imgError.message}</p>
                  <button onClick={refetchImages}>Retry</button>
                </div>
              </div>
            )}

            {/* ✅ Display Swiper if data is available */}
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

            <h1>Graduation Photography by TK Production Film</h1>
            <p>
              Celebrate your milestone with TK Production Film! We capture your
              graduation’s pride and joy with stunning photography and cinematic
              visuals.
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
                    <span>{item.title}</span> {item.desc}
                  </p>
                </li>
              ))}
            </ul>
            <p>Let us make your success unforgettable!</p>
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
