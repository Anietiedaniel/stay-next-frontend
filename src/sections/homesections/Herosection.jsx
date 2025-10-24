import React, { useState, useEffect } from "react";
import HeroContent from "./HeroContent";
import "../../styles/globalStyles.css";
import backgroundImage from "../../assets/images/backgroud-img.jpg";
import bgHome from "../../assets/images/bg-home.webp";
import bgHome2 from "../../assets/images/home.jpeg";
import bgHome3 from "../../assets/images/home2.jpeg";
import bgHome4 from "../../assets/images/home3.jpeg";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

// Utility to map tab to query
const mapTabToQuery = (tab) => {
  if (tab === "All") return null;   // no query
  if (tab === "Buy") return "sale"; // behind the scenes
  return tab.toLowerCase();
};

function Herosection() {
  const [currentBg, setCurrentBg] = useState(0);
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();

  const images = [backgroundImage, bgHome, bgHome2, bgHome3, bgHome4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handlePlayClick = () => {
    window.open(
      "https://www.google.com/search?q=pst+paul+rika",
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ✅ Handle Navbar tab click
  const handleSelect = (tab) => {
    setSelectedType(tab); // immediate highlight

    const queryValue = mapTabToQuery(tab);
    if (!queryValue) {
      navigate("/properties", { replace: true }); // All → no query
    } else {
      navigate(`/purpose?query=${queryValue}`, { replace: true }); // Buy → sale, others → lowercase
    }
  };

  return (
    <div className="relative mt-0 mb-28 md:px-5 sm:px-0 z-10 sm:rounded-xl">
      <div className="relative w-full sm:rounded-xl overflow-visible md:min-h-screen">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:min-h-screen h-96 sm:rounded-xl transition-all duration-1000 ease-in-out"
          style={{ backgroundImage: `url(${images[currentBg]})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 sm:rounded-xl" />
        </div>

        {/* Mobile-only play button */}
        <div className="sm:hidden relative w-full aspect-video flex items-center justify-center z-20">
          <button
            onClick={handlePlayClick}
            aria-label="Play video"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-white bg-opacity-30 hover:bg-opacity-50 transition border-white border-2 mt-20"
            style={{ backdropFilter: "blur(0px)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              className="w-8 h-8 ml-1"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>

        {/* Desktop content */}
        <div className="relative z-30 py-8 sm:py-12 text-white max-w-7xl mx-auto md:rounded-xl">
          <div className="text-center mx-auto mb-8 px-3 overflow-hidden">
            <h1
              className="text-3xl sm:text-3xl md:text-5xl font-bold mb-1 leading-tight md:whitespace-nowrap overflow-hidden"
              style={{
                textOverflow: "ellipsis",
                display: "inline-block",
              }}
            >
              Real Homes Service Live Here
            </h1>
          </div>

          {/* ✅ Integrated Navbar */}
          <div className="mt-28 md:mt-0">
            <Navbar selectedType={selectedType} onSelect={handleSelect} />
          </div>

          <HeroContent />
        </div>
      </div>
    </div>
  );
}

export default Herosection;
