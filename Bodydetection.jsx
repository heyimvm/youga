import React, { useRef, useEffect, useState } from "react";
import * as posenet from "@tensorflow-models/posenet";
import "@tensorflow/tfjs";

const BodyDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // Load PoseNet model
  const loadPosenet = async () => {
    const net = await posenet.load();
    setLoading(false);
    detectPose(net);
  };

  // Start detecting pose
  const detectPose = async (net) => {
    if (videoRef.current) {
      const video = videoRef.current;

      // Detect pose every 100ms
      setInterval(async () => {
        const pose = await net.estimateSinglePose(video, {
          flipHorizontal: false,
        });
        drawPose(pose);
      }, 100);
    }
  };

  // Draw pose on canvas
  const drawPose = (pose) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw keypoints
    pose.keypoints.forEach((keypoint) => {
      if (keypoint.score > 0.5) {
        const { x, y } = keypoint.position;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
      }
    });

    // Draw skeleton
    drawSkeleton(pose.keypoints, ctx);
  };

  // Draw skeleton
  const drawSkeleton = (keypoints, ctx) => {
    const adjacentKeyPoints = posenet.getAdjacentKeyPoints(keypoints, 0.5);

    adjacentKeyPoints.forEach((keypointPair) => {
      const [p1, p2] = keypointPair;
      ctx.beginPath();
      ctx.moveTo(p1.position.x, p1.position.y);
      ctx.lineTo(p2.position.x, p2.position.y);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "green";
      ctx.stroke();
    });
  };

  // Setup the webcam feed
  useEffect(() => {
    const setupCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    };

    setupCamera();
    loadPosenet();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-xl mb-4">Body Detection Using PoseNet</h1>
      {loading && <p>Loading PoseNet model...</p>}
      <div className="relative">
        <video
          ref={videoRef}
          style={{ position: "absolute", top: 0, left: 0, transform: "scaleX(-1)" }}
          width="640"
          height="480"
          muted
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
};

export default BodyDetection;
