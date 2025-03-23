import "./PortfolioSection.scss";

import { useState } from "react";
import m1 from "../../assets/images/review.jpg";

const PortfolioSection = () => {
  const categories = ["All", "Haldi", "Engagement", "Pre Wedding", "Wedding"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleImages, setVisibleImages] = useState(6);

  // Demo images categorized (using the same image for now)
  const allImages = {
    All: Array(24).fill(m1),
    Haldi: Array(8).fill(m1),
    Engagement: Array(6).fill(m1),
    "Pre Wedding": Array(10).fill(m1),
    Wedding: Array(12).fill(m1),
  };

  const images = allImages[selectedCategory] || [];

  const handleCategoryClick = (category) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);
      setVisibleImages(6); // Reset visible images
    }
  };

  const handleLoadMore = () => {
    setVisibleImages((prev) => prev + 6);
  };

  return (
    <div className="portfolioSection">
      <h1>
        Our <span className="portfolio">Portfolio</span>
      </h1>
      <div className="portfolioSection-links">
        {categories.map((category, index) => (
          <span
            key={index}
            onClick={() => handleCategoryClick(category)}
            style={{ color: selectedCategory === category ? "#ffa500" : "inherit" }}
          >
            {category}
          </span>
        ))}
      </div>

      <div className="portfolioSection-imgs" key={selectedCategory}>
        <div className="portfolioSection-imgs-container">
          {images.slice(0, visibleImages).map((image, index) => (
            <div className="zoom-img fade-in" key={index}>
              <img src={image} alt={`Portfolio ${index}`} />
            </div>
          ))}
        </div>

        {visibleImages < images.length && (
          <button className="load-more-button" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default PortfolioSection;
