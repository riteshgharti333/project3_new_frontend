import React, { useState, useRef, useEffect } from "react";
import "./ClientReview.scss";

import { FaStar } from "react-icons/fa";
import { RiDoubleQuotesR } from "react-icons/ri";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import bg2 from "../../assets/images/bg2.jpg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../main";
import Loader from "../../components/Loader/Loader";

const ClientReview = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedReview, setExpandedReview] = useState(null);
  const modalRef = useRef(null); // Reference for modal

  // ✅ Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setExpandedReview(null);
      }
    };

    if (expandedReview) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expandedReview]);

  // ✅ Fetch Reviews with Error Handling
  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/review/all-reviews`);
      return data.reviews;
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response);
        throw new Error(
          error.response.status >= 500
            ? "Server error! Please try again later."
            : "Failed to load reviews!"
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

  // ✅ Use React Query for data management
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["clientReviews"],
    queryFn: fetchReviews,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  return (
    <div className="clientReview">
      <div className="clientReview-img">
        <img src={bg2} alt="Client Background" loading="lazy" />

        <div className="clientReview-card">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            speed={1200}
            navigation={{
              prevEl: ".client-prev",
              nextEl: ".client-next",
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {isLoading ? (
              // ✅ Loader inside the Swiper slide
              <SwiperSlide className="swiper-slide-loader">
                <Loader loaderSize="clientLoader" />
              </SwiperSlide>
            ) : isError ? (
              <SwiperSlide className="swiper-slide-error">
                <div className="error-container">
                  <p>{error.message}</p>
                  <button onClick={() => refetch()}>Retry</button>
                </div>
              </SwiperSlide>
            ) : data?.length > 0 ? (
              data.map((review, index) => (
                <SwiperSlide key={review._id}>
                  <ReviewCard
                    review={review}
                    isActive={index === activeIndex}
                    onExpand={() => setExpandedReview(review)}
                  />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide className="swiper-slide-empty">
                <p>No reviews available</p>
              </SwiperSlide>
            )}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="client-prev">
            <BsArrowLeft className="client-icon" />
          </div>
          <div className="client-next">
            <BsArrowRight className="client-icon" />
          </div>
        </div>
      </div>

      {/* ✅ Overlay Modal for Full Review */}
      {expandedReview && (
        <div className="clientReview-overlay">
          <div className="clientReview-modal" ref={modalRef}>
            <button
              className="close-btn"
              onClick={() => setExpandedReview(null)}
            >
              ✖
            </button>
            <p>" {expandedReview.review} "</p>
          </div>
        </div>
      )}
    </div>
  );
};

const ReviewCard = ({ review, isActive, onExpand }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
      const maxHeight = lineHeight * 3;
      setIsTruncated(element.scrollHeight > maxHeight);
    }
  }, [review]);

  return (
    <div className="clientReview-card-desc">
      <div className="clientReview-card-top">
        <div className="clientReview-card-stars">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="star" />
          ))}
        </div>

        <div className="clientReview-card-quotes">
          <RiDoubleQuotesR className="quotes" />
        </div>
      </div>

      <p ref={textRef} className="reviews">
        " {review.review} "
      </p>

      {isTruncated && (
        <button className="read-more-btn" onClick={onExpand}>
          Read More
        </button>
      )}

      <hr className="line" />

      <div className="review-name">
        <img src={review.image} alt={review.name} loading="lazy" />
        <div className="review-name-desc">
          <p>{review.name}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientReview;
