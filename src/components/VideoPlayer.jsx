import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({
  src,
  width = "100%",
  height = "360px",
  autoPlay = false,
}) => {
  return (
    <div className="bg-[#fff]">
      <div className="container mx-auto">
        <ReactPlayer
          url="<https://www.youtube.com/watch?v=G07V0aOmWTI>"
          width="100%"
          height="960px"
          controls
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
