import { useEffect } from "react";
import axios from "axios";
import "./Homepage.scss";

import HomeBanner from "../../components/HomeBanner/HomeBanner";
import OurService from "../../components/OurService/OurService";
import ClientReview from "../../components/ClientReview/ClientReview";
import Getintouch from "../../components/Getintouch/Getintouch";
import AboutAgency from "../../components/AboutAgency/AboutAgency";
import OurFeatures from "../../components/OurFeatures/OurFeatures";
import OurCore from "../../components/OurCore/OurCore";
import OurPorfolio from "../../components/OurPorfolio/OurPorfolio";
import FollowSection from "../../components/FollowSection/FollowSection";
import PhotoAlbums from "../../components/PhotoAlbums/PhotoAlbums";

import { baseUrl } from "../../main";

const Homepage = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        await axios.post(`${baseUrl}/visitors/increment`);
      } catch (error) {
        console.error("Error tracking visitor", error);
      }
    };

    trackVisitor();
  }, []);

  return (
    <div className="homepage">
      <HomeBanner />
      <div className="homepage-container">
        <OurService />
        <PhotoAlbums />
        <AboutAgency />
        <OurFeatures />
        <OurCore />
        <OurPorfolio />
      </div>
      <ClientReview />
      <Getintouch />
      <FollowSection />
    </div>
  );
};

export default Homepage;
