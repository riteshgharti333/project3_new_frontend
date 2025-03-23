import "./Gallery.scss";

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { gallery } from "../../assets/data";
import axios from "axios";
import { baseUrl } from "../../main";

const Gallery = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [allPortfolio, setAllPortfolio] = useState([]);
  const cardsPerPage = 20;
  const [selectedImg, setSelectedImg] = useState(null);

  const offset = currentPage * cardsPerPage;

  // Handle page change with scroll to top
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const getAllPortfolio = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/portfolio/all-portfolios`);
        if (data && data.portfolios) {
          setAllPortfolio(data.portfolios);
        }
      } catch (error) {
        console.error("Error fetching portfolios:", error);
        toast.error("Failed to fetch portfolios. Please try again.");
      }
    };

    getAllPortfolio();
  }, []);

  const currentCards = allPortfolio.slice(offset, offset + cardsPerPage);

  return (
    <div className="gallery">
      <div className="gallery-top-banner">
        <div className="gallery-banner">
          <div className="gallery-banner-desc">
            <h1>Our Projects</h1>
          </div>
        </div>
      </div>
      <div className="gallery-container">
        <div className="gallery-container-top">
          <h1> Our Portfolio</h1>
          <p>TK Production Films All of your beautiful memories</p>
        </div>

        <div className="gallery-cards">
          {currentCards.map((item, index) => (
            <div key={index} className="gallery-card">
              <img
                src={item.image}
                alt="portfolio image"
                onClick={() => setSelectedImg(item.image)}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <ReactPaginate
          previousLabel={
            <span className="prev-icon">
              <FaChevronLeft />
            </span>
          }
          nextLabel={
            <span className="next-icon">
              <FaChevronRight />
            </span>
          }
          pageCount={Math.ceil(gallery.length / cardsPerPage)}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          breakLabel=".........."
        />
      </div>

      {selectedImg && (
        <div className="image-modal" onClick={() => setSelectedImg(null)}>
          <img src={selectedImg} alt="Fullscreen Preview" loading="lazy" />
          <span className="close-btn" onClick={() => setSelectedImg(null)}>
            ×
          </span>
        </div>
      )}
    </div>
  );
};

export default Gallery;
