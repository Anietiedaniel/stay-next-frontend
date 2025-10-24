import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import for routing
import '../../styles/imageSlider.css';

const slides = [
  {
    bgImage: 'https://images.unsplash.com/photo-1591696205602-52c5b57f5ec0?auto=format&fit=crop&w=1200&q=80', // Electrician
    text: 'Professional Electrical Services',
  },
  {
    bgImage: 'https://images.unsplash.com/photo-1590080875293-9e1f24c85a57?auto=format&fit=crop&w=1200&q=80', // Plumber
    text: 'Reliable Plumbing Solutions',
  },
  {
    bgImage: 'https://images.unsplash.com/photo-1600585153837-51d7c2e3f1a4?auto=format&fit=crop&w=1200&q=80', // Painter
    text: 'Expert Home Painting',
  },
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [animating, setAnimating] = useState(false);

  const navigate = useNavigate(); // ✅ Navigation hook

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
    }, 500);
  };

  const handleClick = (index) => {
    if (!animating && index !== current) {
      triggerSlide(index);
    }
  };

  const handleViewMoreClick = () => {
    navigate('/technicians'); // ✅ Navigate on button click
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
        <div className="overlay">
          <h2 className="heading">{slides[current].text}</h2>
          <p className="paragraph">Hire skilled technicians for your home</p>
          <button className="button" onClick={handleViewMoreClick}>View More</button>
        </div>
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
          <div className="overlay">
            <h2 className="heading">{slides[next].text}</h2>
            <p className="paragraph">Hire skilled technicians for your home</p>
            <button className="button" onClick={handleViewMoreClick}>View More</button>
          </div>
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
