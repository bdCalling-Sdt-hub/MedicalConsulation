"use client";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
// import tutorialVideo from "/tutorial.mov";
// import tutorial from "./tu";
// import a from "../../public/videos/Making an Appointment - tutoarial.mp4";
// import a from "./tut.mp4";

const VideoPlayer = ({
  src,
  width = "100%",
  height = "100%",
  autoPlay = false,
}) => {
  return (
    <>
      {/* <div className="container mx-auto">
        <ReactPlayer
          // url="<https://www.youtube.com/watch?v=G07V0aOmWTI>"
          url="./Making an Appointment - tutoarial.mp4"
          // url={a}
          width="100%"
          height="960px"
          controls
        />
      </div> */}
      <div height={height}>
        <video
          src="/videos/tutorial.mov"
          // src={tutorialVideo}
          width={width}
          height={height}
          autoPlay={autoPlay}
          controls
        ></video>
      </div>
      {/* <div height={height}>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=Gt5vsHCGQ0E"
          width={width}
          height={"400px"}
          controls
        />
      </div> */}
    </>
  );
};

export default VideoPlayer;
