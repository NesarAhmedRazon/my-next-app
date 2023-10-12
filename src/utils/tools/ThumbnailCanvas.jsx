"use client";
import { useEffect, useRef } from "react";

export default function ThumbNailCanvas(props) {
  const { src, size, alt, aspect } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const generateThumbnail = async () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const image = new Image();
      if (src === null || "") {
        image.src = "/images/tallyfy_inc_icon.svg";
      } else {
        image.src = src;
      }
      await image.decode(); // Ensure the image is fully loaded

      const canvasWidth = canvas.clientWidth; // Get the CSS width of the canvas
      canvas.width = canvasWidth; // Set the canvas width to the CSS width

      // Draw the cropped image onto the canvas
      if (aspect && aspect === "square") {
        canvas.height = canvasWidth; // Set the canvas height to the CSS width
        const cropSize = Math.min(image.width, image.height);
        const cropX = (image.width - cropSize) / 2;
        const cropY = (image.height - cropSize) / 2;
        ctx.drawImage(
          image,
          cropX,
          cropY,
          cropSize,
          cropSize,
          0,
          0,
          canvas.width,
          canvas.height
        );
      } else {
        canvas.height = (image.height / image.width) * canvasWidth; // Set the canvas height to the CSS width
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
      // Reset the global alpha value
      ctx.globalAlpha = 1;
    };

    generateThumbnail();
  }, [src, aspect]);

  return (
    <canvas
      ref={canvasRef}
      className="thumbnail-canvas"
      alt={alt ?? "thumbnail"}
    />
  );
}
