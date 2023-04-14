/* eslint-disable @next/next/no-img-element */
// ImageList.tsx
import React, { useEffect, useState } from "react";

interface ImageReducerProps {
  imageUrl: string;
  targetQuality: number;
  maxWidth: number;
  maxHeight: number;
}

const ImageReducer: React.FC<ImageReducerProps> = ({
  imageUrl,
  targetQuality,
  maxWidth,
  maxHeight,
}) => {
  const [reducedQualitySrc, setReducedQualitySrc] = useState<string>("");

  useEffect(() => {
    const reduceImageQuality = (src: string, quality: number) => {
      const originalImage = new Image();
      originalImage.crossOrigin = "anonymous";
      originalImage.src = src;

      originalImage.onload = () => {
        if (
          originalImage.width > maxWidth ||
          originalImage.height > maxHeight
        ) {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (ctx) {
            canvas.width = originalImage.width;
            canvas.height = originalImage.height;

            ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
            setReducedQualitySrc(canvas.toDataURL("image/jpeg", quality));
          }
        } else {
          setReducedQualitySrc(src);
        }
      };
    };

    reduceImageQuality(imageUrl, targetQuality);
  }, [imageUrl, targetQuality, maxWidth, maxHeight]);

  return (
    <img
      src={reducedQualitySrc}
      className="h-28 w-full rounded-t-xl object-cover"
      alt="Reduced quality"
    />
  );
};

export default ImageReducer;
