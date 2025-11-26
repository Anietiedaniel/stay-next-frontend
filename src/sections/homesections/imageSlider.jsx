import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/imageSlider.css';

import image1 from '../../assets/images/Electrical Services.png';
import image2 from '../../assets/images/Engineering Services.png';
import image3 from '../../assets/images/Plumbing Services.png';

const slides = [
  {
    bgImage: image1,
    text: 'Professional Electrical Services',
  },
  {
    bgImage: image2,
    text: 'Reliable Engineering Solutions',
  },
  {
    bgImage: image3,
    text: 'Expert Plumbing Services',
  },
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [animating, setAnimating] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isHovered || animating) return;

    const interval = setInterval(() => {
      triggerSlide((current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [current, isHovered, animating]);

  const triggerSlide = (targetIndex) => {
    if (targetIndex === current) return;

    setNext(targetIndex);
    setAnimating(true);

    setTimeout(() => {
      setCurrent(targetIndex);
      setNext(null);
      setAnimating(false);
    }, 300);
  };

  const handleClick = (index) => {
    if (!animating && index !== current) {
      triggerSlide(index);
    }
  };

  const handleViewMoreClick = () => {
    navigate('/building');
  };

  return (
    <div
      className="slider-container mt-8 mb-12 ml-6 md:ml-20 rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Current Slide */}
      <div
        className="slide"
        style={{
          backgroundImage: `url(${slides[current].bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          left: next !== null ? '-100%' : '0%',
          transition: next !== null ? 'left 0.5s ease-in-out' : 'none',
          zIndex: 1,
        }}
      >
        {/* Responsive Button Position */}
          <button
            className="button absolute bottom-4 left-4 md:bottom-6 md:right-6 md:left-auto"
            onClick={handleViewMoreClick}
          >
            View More
          </button>
      </div>

      {/* Incoming Slide */}
      {next !== null && (
        <div
          className="slide"
          style={{
            backgroundImage: `url(${slides[next].bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            left: '100%',
            animation: 'slideInLeft 0.5s forwards',
            zIndex: 2,
          }}
        >
            <button
              className="button absolute bottom-4 left-4 md:bottom-6 md:right-6 md:left-auto"
              onClick={handleViewMoreClick}
            >
              View More
            </button>
        </div>
      )}

      {/* Indicators */}
      <div className="indicators">
        {slides.map((_, i) => (
          <div
            key={i}
            className="dash-block"
            onClick={() => handleClick(i)}
            style={{ opacity: current === i ? 1 : 0.4 }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
