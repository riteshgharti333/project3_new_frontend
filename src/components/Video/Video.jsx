import { useState } from "react";
import "./Video.scss";
import { TbPlayerPlayFilled } from "react-icons/tb";

import thumbnail from "../../assets/images/bannerimg/banner4.webp";

const getYouTubeID = (url) => {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  return match ? match[1] : null;
};

const Video = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = getYouTubeID(videoUrl);
  if (!videoId) return <p>Invalid YouTube URL</p>;

  return (
    <div className="video-container">
      {!isPlaying ? (
        <div className="thumbnail" onClick={() => setIsPlaying(true)}>
          <img src={thumbnail} alt="Custom Thumbnail" loading="lazy" />
          <div className="player">
            <TbPlayerPlayFilled className="player-icon" />
          </div>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      )}
    </div>
  );
};

export default Video;
