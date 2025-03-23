import "./Service2.scss";
import ServicePageSidebar from "../ServicePageSidebar/ServicePageSidebar";

import ServiceContact from "../../../components/ServiceContact/ServiceContact";
import { service1Steps } from "../../../assets/servicesData";

import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import Video from "../../../components/Video/Video";
import { useEffect } from "react";
import { baseUrl } from "../../../main";
import axios from "axios";
import { TbCodeAsterisk } from "react-icons/tb";
import { useState } from "react";
import toast from "react-hot-toast";
import SEO from "../../../SEO/SEO";

const Service2 = () => {
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
          `${baseUrl}/services/wedding-cinematography/67de70bbaa6520fad7a06669`
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

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/wedding-cinematography/all-videos`
        );
        if (data && data.videos) {
          setAllData(data.videos);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="service2">
      <SEO
        title="Wedding Cinematography | TK Production Film - Capture Your Love Story in Motion"
        description="Relive your wedding day with TK Production Film's cinematic wedding cinematography. We create stunning, high-quality wedding films that capture every emotion. Book now!"
        keywords="wedding cinematography, cinematic wedding films, professional wedding videography, TK Production Film, wedding day videos, cinematic love stories"
        url="https://tkproductionfilm.com/wedding-cinematography"
        author="TK Production Film"
      />

      <div className="service2-top-banner">
        <div className="service2-banner">
          <div className="service2-banner-desc">
            <h1>Service Details</h1>
          </div>
        </div>
      </div>

      <div className="service2-container">
        <div className="service2-container-sidebar">
          <ServicePageSidebar onSidebarClick={scrollToContent} />
        </div>

        <div className="service2-container-content" ref={contentRef}>
          <div className="service2-container-content-top">
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
            <h1>Wedding Cinematography by TK Production Film</h1>
            <p>
              Capture your love story with TK Production Film. Led by Taufeq
              Khan with 16+ years and 800+ weddings, we create timeless memories
              through stunning photography and cinematic films.
            </p>
            <p>
              We specialize in turning your wedding day into a visual
              masterpiece. From the soft glances during the vows to the joyous
              laughter at the reception, our team captures every moment with
              artistry and precision. Whether you love candid shots that reveal
              raw emotions, traditional portraits that honor timeless elegance,
              or editorial-style images with a modern flair, we tailor our
              approach to your unique style. Using top-tier equipment and
              creative techniques, we ensure every detail—your dress, the
              flowers, the smiles—shines through in vibrant, high-quality photos
              you’ll cherish forever.
            </p>
          </div>

          <div className="service2-steps">
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

          <div className="service2-steps">
            <h1>Our Work</h1>
            {allData.length > 0 &&
              allData.map((item, index) => (
                <Video videoUrl={item.link} key={index} />
              ))}
          </div>
        </div>
      </div>
      <div className="service-contact">
        <ServiceContact />
      </div>
    </div>
  );
};

export default Service2;
