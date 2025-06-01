import React, { useEffect, useState } from "react";
import lb1 from "./../assets/banner/lb-1.jpg";
import lb2 from "./../assets/banner/lb-2.jpg";
import lb3 from "./../assets/banner/lb-3.jpg";

const images = [lb1, lb2, lb3];

const ImageSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [length]);

  return (
    <div className="relative w-full  mx-auto overflow-hidden  shadow-lg">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full flex-shrink-0 object-cover"
          />
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full ${
              index === current ? "bg-white" : "bg-white/50"
            } transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
