import "./PhotoAlbums.scss";

import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../main";

const PhotoAlbums = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [initialized, setInitialized] = useState(false);

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/photoAlbum/all-photo-album`
        );
        if (data && data.photoAlbum) {
          setAllData(data.photoAlbum);
        }
      } catch (error) {
        console.error("Error fetching home banners:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setInitialized(true);
  }, []);

  return (
    <div className="photoAlbums">
      <h1>Photo Albums</h1>
      <p className="photoAlbums-desc">
        Collection of photos All of Our Best Works
      </p>

      <div className="photoAlbums-cards">
        <Swiper
          slidesPerView={2}
          centeredSlides={false}
          spaceBetween={20}
          loop={true}
          speed={3000}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="photoAlbums-slider album-swiper"
          initialSlide={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
          }}
        >
          {allData.length > 0 &&
            allData.map((album, index) => (
              <SwiperSlide key={album.image} className="photoAlbums-card">
                <div className="photoAlbums-card-content">
                  <img src={album.image} alt={album.image} />

                  <div
                    className={`homeBanner-desc ${
                      initialized && index === activeIndex ? "animate" : ""
                    }`}
                  ></div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PhotoAlbums;
