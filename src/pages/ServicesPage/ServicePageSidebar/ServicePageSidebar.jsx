import "./ServicePageSidebar.scss";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { services } from "../../../assets/data";
import { useScrollContext } from "../../../context/ScrollContext";

const ServicePageSidebar = ({ onSidebarClick }) => {
  const location = useLocation();

  const { setSkipScroll } = useScrollContext();

  return (
    <div className="servicePageSidebar">
      {services.map((service, index) => (
        <Link
          to={service.link}
          className={`servicePageSidebar-link ${
            location.pathname === service.link ? "active" : ""
          }`}
          key={index}
          onClick={() => {
            setSkipScroll(true); // Skip ScrollToTop when clicking sidebar links
            onSidebarClick(); // Scroll smoothly within the service page
          }}
        >
          <div className="servicePageSidebar-item">
            <p>{service.service_name}</p>
            <MdKeyboardArrowRight className="servicePageSidebar-icon" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ServicePageSidebar;
