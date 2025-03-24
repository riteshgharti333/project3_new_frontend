import "./PhotoAlbums.scss";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../main";
import Loader from "../../components/Loader/Loader";

const PhotoAlbums = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ Fetch albums with proper error handling
  const fetchPhotoAlbums = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/photoAlbum/all-photo-album`);
      return data.photoAlbum;
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response);
        throw new Error(
          error.response.status >= 500
            ? "Server error! Please try again later."
            : "Failed to load photo albums!"
        );
      } else if (error.request) {
        console.error("Network Error:", error.request);
        throw new Error("Network error! Check your internet connection.");
      } else {
        console.error("Unknown Error:", error.message);
        throw new Error("Unexpected error occurred!");
      }
    }
  };

  // ✅ Use React Query for better data management
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["photoAlbums"],
    queryFn: fetchPhotoAlbums,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  return (
    <div className="photoAlbums">
      {/* ✅ Title and description always visible */}
      <h1>Photo Albums</h1>
      <p className="photoAlbums-desc">
        Collection of photos - All of Our Best Works
      </p>

      {/* ✅ Show Loader below title and description */}
      {isLoading ? (
        <Loader loaderSize="photoAlbumLoader"/>
      ) : isError ? (
        <div className="error-container">
          <div className="error-container-desc">
            <p>{error.message}</p>
            <button onClick={() => refetch()}>Retry</button>
          </div>
        </div>
      ) : (
        <div className="photoAlbums-cards">
          <Swiper
            slidesPerView={2}
            centeredSlides={false}
            spaceBetween={20}
            loop={true}
            speed={2500}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Autoplay, Navigation]}
            className="photoAlbums-slider album-swiper"
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            }}
          >
            {data?.length > 0 ? (
              data.map((album, index) => (
                <SwiperSlide key={album._id} className="photoAlbums-card">
                  <div className="photoAlbums-card-content">
                    <img
                      src={album.image}
                      alt={album.title || "Album Image"}
                      loading="lazy"
                    />
                    <div
                      className={`homeBanner-desc ${
                        index === activeIndex ? "animate" : ""
                      }`}
                    />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p>No photo albums available</p>
            )}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default PhotoAlbums;
