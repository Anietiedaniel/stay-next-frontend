// PropertySlider.js
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PropertySlider({ videos = [], images = [], _id }) {
  const navigate = useNavigate();

  const [isAnimating, setIsAnimating] = useState(true);
  const sliderRef = useRef(null);

  // ✅ Build slides: videos first, then images
  const mediaSlides = [
    ...videos.map((url) => ({ type: "youtube", url })),
    ...images.map((img) => ({ type: "image", src: img })),
  ];

  // ✅ Infinite loop extension
  const extendedSlides =
    mediaSlides.length > 0
      ? [mediaSlides[mediaSlides.length - 1], ...mediaSlides, mediaSlides[0]]
      : [];

  // ✅ Start with the very first media (video if exists, else image)
  const [current, setCurrent] = useState(mediaSlides.length > 0 ? 1 : 0);

  const handleTransitionEnd = () => {
    if (current === 0) {
      setIsAnimating(false);
      setCurrent(mediaSlides.length);
    } else if (current === mediaSlides.length + 1) {
      setIsAnimating(false);
      setCurrent(1);
    }
  };

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => setIsAnimating(true), 20);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const prevSlide = () => setCurrent((prev) => prev - 1);
  const nextSlide = () => setCurrent((prev) => prev + 1);

  // ✅ Extract YouTube thumbnail
  const getYouTubeThumbnail = (url) => {
    const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/);
    return match
      ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
      : null;
  };

  // ✅ Actions
  const handleView = () => navigate(`/properties/${_id}`);
  const handleEdit = () => navigate(`/properties/edit/${_id}`);
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      console.log("Deleting property:", _id);
      // TODO: call your delete API here
    }
  };

  if (!mediaSlides.length) {
    return (
      <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded">
        No Media
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg group">
      {/* Slider */}
      <div
        ref={sliderRef}
        onTransitionEnd={handleTransitionEnd}
        className={`flex ${
          isAnimating ? "transition-transform duration-500 ease-in-out" : ""
        }`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {extendedSlides.map((slide, index) =>
          slide.type === "youtube" ? (
            <a
              key={index}
              href={slide.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full flex-shrink-0 h-56"
            >
              <img
                src={getYouTubeThumbnail(slide.url)}
                alt="YouTube Preview"
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fab fa-youtube text-red-600 text-4xl bg-white rounded-full p-2 shadow-lg"></i>
              </div>
            </a>
          ) : (
            <img
              key={index}
              src={slide.src}
              alt={`Slide ${index}`}
              className="w-full flex-shrink-0 h-56 object-cover"
            />
          )
        )}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white text-black rounded-full py-1 px-2 shadow opacity-0 group-hover:opacity-100"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white text-black rounded-full py-1 px-2 shadow opacity-0 group-hover:opacity-100"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
}
