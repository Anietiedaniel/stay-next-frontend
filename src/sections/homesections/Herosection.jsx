import React, { useState, useEffect } from "react";
import HeroContent from "./HeroContent";
import "../../styles/globalStyles.css";
import backgroundImage from "../../assets/images/backgroud-img.jpg";
import bgHome from "../../assets/images/bg-home.webp";
import bgHome2 from "../../assets/images/home.jpeg";
import bgHome3 from "../../assets/images/home2.jpeg";
import bgHome4 from "../../assets/images/home3.jpeg";
import { useNavigate } from "react-router-dom";

function Herosection() {
  const [currentBg, setCurrentBg] = useState(0);
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const phrases = ["Connecting People, Properties and Possibilities."];
  
  const images = [backgroundImage, bgHome, bgHome2, bgHome3, bgHome4];
  const navigate = useNavigate();

  // Background Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Typing Effect Logic
  useEffect(() => {
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex <= phrases[phraseIndex].length) {
        setText(phrases[phraseIndex].substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setPhraseIndex((prev) => (prev + 1) % phrases.length), 2000);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, [phraseIndex]);

  return (
    <div className="relative mt-0 mb-28 md:px-5 sm:px-0 z-10 sm:rounded-xl">
      <div className="relative w-full sm:rounded-xl overflow-hidden md:min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:min-h-screen h-96 sm:rounded-xl transition-all duration-1000 ease-in-out"
          style={{ backgroundImage: `url(${images[currentBg]})` }}
        >
          <div className="absolute inset-0 bg-black/50 sm:rounded-xl" />
        </div>

        <div className="relative z-30 py-20 sm:py-32 text-white max-w-6xl mx-auto text-center px-4">
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Property Zone Global Limited
          </h1>
          
          {/* Typing Effect Tagline */}
          <p className="text-xl md:text-2xl font-light h-10 text-blue-100 border-b-2 border-transparent">
            {text}<span className="animate-pulse">|</span>
          </p>

          <div className="mt-10">
            <HeroContent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Herosection;
