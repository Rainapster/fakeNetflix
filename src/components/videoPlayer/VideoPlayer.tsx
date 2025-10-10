import { videoPlayerProps } from "./videoPlayer.model";

const VideoPlayer = ({ src, className }: videoPlayerProps) => {
  return (
    <iframe
      className={className}
      id="ytplayer"
      width="100%"
      style={{ height: "50vh", border: 0, display: "block" }}
      src={src}
      allow="autoplay"
    ></iframe>
  );
};

export default VideoPlayer;
