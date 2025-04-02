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
import SEO from "../../SEO/SEO";
import WeddingType from "../../components/WeddingType/WeddingType";

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
      <SEO
        title="TK Production Film | Best Photography & Cinematography Services"
        description="Capture your special moments with TK Production Film – expert wedding, pre-wedding, engagement, and event photography. Book your service today!"
        keywords="photography, cinematography, wedding photography, pre-wedding film, baby shower photography, birthday photography, civil marriage photos, engagement portraits, TK Production Film"
        url="https://tkproductionfilm.com"
        author="TK Production Film"
      />
      <HomeBanner />
      <div className="homepage-container">
        <OurService />
        <PhotoAlbums />
        <AboutAgency />
        <WeddingType />
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
