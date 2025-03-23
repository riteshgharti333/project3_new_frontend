import "./HomeBanner.scss";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import { baseUrl } from "../../main";

const HomeBanner = () => {
  const [allData, setAllData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  // Fetch banners based on screen size
  const fetchBanners = async () => {
    try {
      const apiUrl = isMobile
        ? `${baseUrl}/mobile/all-mobile-banners`
        : `${baseUrl}/home-banner/all-home-banners`;

      const { data } = await axios.get(apiUrl);

      if (data && data.homeBanner) {
        setAllData(data.homeBanner);
      }
    } catch (error) {
      console.error("Error fetching home banners:", error);
    }
  };

  //Initial Fetch and Media Query Listener
  useEffect(() => {
    fetchBanners();

    const handleResize = () => {
      const isMobileNow = window.innerWidth <= 480;

      if (isMobileNow !== isMobile) {
        setIsMobile(isMobileNow);
        fetchBanners();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <div className="homeBanner">
      <Swiper
        modules={[EffectFade, Pagination, Navigation, Autoplay]}
        effect="fade"
        loop={true}
        speed={1200}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="swiper-container"
      >
        {allData.length > 0 &&
          allData.map((slide, index) => (
            <SwiperSlide key={index} className="slide">
              <div className="homeBanner-imgs">
                <img src={slide.image} alt="Banner" loading="lazy" />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className="swiper-button-prev">Prev</div>
      <div className="swiper-button-next">Next</div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default HomeBanner;
