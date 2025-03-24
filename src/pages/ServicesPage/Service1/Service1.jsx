import "./Service1.scss";
import ServicePageSidebar from "../ServicePageSidebar/ServicePageSidebar";
import ServiceContact from "../../../components/ServiceContact/ServiceContact";
import { service1Steps } from "../../../assets/servicesData";

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

const Service1 = () => {
  const contentRef = useRef(null);

  // ✅ Scroll to Content
  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ✅ Fetch Service Images with Better Error Handling
  const fetchServiceImages = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/services/wedding-photography/67de708faa6520fad7a06667`
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
    queryKey: ["serviceImages1"],
    queryFn: fetchServiceImages,
    staleTime: 1000 * 60 * 5,   // Cache for 5 mins
    retry: 2,                   // Retry twice on failure
  });

  return (
    <div className="service1">
      <SEO
        title="Wedding Photography | TK Production Film - Capture Your Special Moments"
        description="Discover the magic of your wedding day with TK Production Film's expert wedding photography services. We capture every special moment with creativity and passion. Book now!"
        keywords="wedding photography, wedding photographer, professional wedding photos, TK Production Film, wedding day memories, creative wedding shots"
        url="https://tkproductionfilm.com/wedding-photography"
        author="TK Production Film"
      />

      <div className="service1-top-banner">
        <div className="service1-banner">
          <div className="service1-banner-desc">
            <h1>Service Details</h1>
          </div>
        </div>
      </div>

      <div className="service1-container">
        <div className="service1-container-sidebar">
          <ServicePageSidebar onSidebarClick={scrollToContent} />
        </div>

        <div className="service1-container-content" ref={contentRef}>
          
          <div className="service1-container-content-top">
            
            {/* ✅ Loading State */}
            {imagesLoading && (
              <div className="service1-loader-container">
                <Loader loaderSize="serviceLoader" />
              </div>
            )}

            {/* ✅ Error State */}
            {imagesError && (
              <div className="service1-error-container">
                <div className="service1-error-desc">
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

            <h1>Wedding Photography by TK Production Film</h1>
            <p>
              Capture your love story with TK Production Film. Led by Taufeq
              Khan with 16+ years and 800+ weddings, we create timeless
              memories through stunning photography and cinematic films.
            </p>
            <p>
              We specialize in turning your wedding day into a visual
              masterpiece. From the soft glances during the vows to the
              joyous laughter at the reception, our team captures every
              moment with artistry and precision.
            </p>
          </div>

          <div className="service1-steps">
            <h1>How It Works?</h1>
            <ul>
              {service1Steps.map((item) => (
                <li key={item.no}>
                  <p>{item.no}</p>
                  <p>
                    <span>{item.title}</span> {item.desc}
                  </p>
                </li>
              ))}
            </ul>
            <p>Let us make your special day unforgettable!</p>
          </div>
        </div>
      </div>

      <div className="service-contact">
        <ServiceContact />
      </div>
    </div>
  );
};

export default Service1;
