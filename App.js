import React from "react";
import ReactDOM from "react-dom";
import Home from './bodydectection/home.jsx';
import BodyDetection from './bodydectection/Bodydetection.jsx';

ReactDOM.render(
  <div>
    {/* Main App Component */}
    <Home />

    {/* BodyDetection Component */}
    <BodyDetection />
  </div>,
  document.getElementById("root")
);

// DOM manipulation logic for video form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("videoForm");
  const output = document.getElementById("output");
  const videoSource = document.getElementById("videoSource");
  const videoPlayer = document.getElementById("videoPlayer");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const videoLink = document.getElementById("videoLink").value;

      // Display video
      if (videoLink) {
        videoSource.src = videoLink;
        videoPlayer.load(); // Reload the video with the new source
        output.classList.remove("hidden");
      } else {
        alert("Please enter a valid video link!");
      }
    });
  }
});
