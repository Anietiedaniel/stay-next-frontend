import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [location, setLocation] = useState("Detecting...");
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // 1. Real-time Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. High-Accuracy Location Detection
  useEffect(() => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true, // Forces device to use GPS
        timeout: 10000,
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
            );
            const data = await response.json();
            console.log(data)
            const address = data.address;
            console.log(address)
            const cityState = address.city || address.town || address.state || "Location Detected";
            setLocation(cityState);
          } catch (err) {
            setLocation("Error fetching location");
          }
        },
        (err) => {
          console.error(err);
          setLocation("Permission Denied");
        },
        options
      );
    } else {
      setLocation("Unsupported");
    }
  }, []);

  return (
    <footer className="bg-[#0f172a] text-white px-6 md:px-10 py-8 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(254,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)] text-md">
      
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-10">
        
        {/* Left Section */}
        <div className="flex flex-col gap-5 items-center md:items-start w-full md:w-1/2">
          <nav className="flex flex-wrap gap-4 justify-center md:justify-start text-sm font-medium">
            <a href="#" className="hover:underline">ABOUT US</a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:underline">CAREERS</a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:underline">CONTACT US</a>
          </nav>

          <div>
            <a href="#" className="text-md hover:underline">TERMS & PRIVACY POLICY</a>
          </div>

         <div className="flex gap-4">
            {/* Time Card */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md">
              <div className="text-blue-400"><i className="fas fa-clock"></i></div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Local Time</p>
                <p className="font-mono font-semibold text-lg">{time}</p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md">
              <div className="text-red-400"><i className="fas fa-map-marker-alt"></i></div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Region</p>
                <p className="font-semibold text-lg capitalize truncate max-w-[120px]">{location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-5 items-center md:items-end w-full md:w-1/2">
          <div className="flex flex-wrap gap-3 justify-center md:justify-end text-gray-300">
            {['youtube', 'twitter', 'facebook-f', 'instagram'].map((icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-110 transition">
                <i className={`fab fa-${icon} text-xl text-gray-700`}></i>
              </a>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-3 justify-center md:justify-end">
            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 pt-5 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} Property Zone
        </div>
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="w-10 h-10 rounded-full bg-gradient-to-br from-red-700 via-pink-400 to-black flex items-center justify-center font-bold text-xs text-white">
          TOP
        </button>
      </div>
    </footer>
  );
}