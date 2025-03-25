import { useState } from "react";
import "./Video.scss";
import { TbPlayerPlayFilled } from "react-icons/tb";

const getYouTubeID = (url) => {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  return match ? match[1] : null;
};

const Video = ({ videoUrl ,videoSize }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = getYouTubeID(videoUrl);
  if (!videoId) return <p>Invalid YouTube URL</p>;

  // ✅ Use YouTube's thumbnail URL format
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="video-container">
      {!isPlaying ? (
        <div className="thumbnail" onClick={() => setIsPlaying(true)}>
          <img src={thumbnailUrl} alt="YouTube Thumbnail" loading="lazy" />
          <div className={`player ${videoSize}` }>
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
