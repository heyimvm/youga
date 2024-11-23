import React from "react";
import ReactDOM from "react-dom";
import App from './home.jsx';


ReactDOM.render(<App />, document.getElementById("root"));


const form = document.getElementById("videoForm");
const output = document.getElementById("output");
const videoSource = document.getElementById("videoSource");
const videoPlayer = document.getElementById("videoPlayer");

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
