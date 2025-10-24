import React from 'react';

/**
 * Footer Component
 * Renders a responsive footer with company links, social media icons, 
 * store download buttons, and a "back to top" link.
 */
export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white px-6 md:px-10 py-8 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(254,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)] text-md">
      
      {/* ===== Top Section: Navigation + Social + Store Links ===== */}
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-10">
        
        {/* --- Left Section: Navigation Links, Policy, State Selector --- */}
        <div className="flex flex-col gap-5 items-center md:items-start w-full md:w-1/2">
          
          {/* Primary Navigation */}
          <nav className="flex flex-wrap gap-4 justify-center md:justify-start text-sm font-medium">
            <a href="#" className="hover:underline">ABOUT US</a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:underline">CAREERS</a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:underline">CONTACT US</a>
          </nav>

          {/* Terms and Privacy */}
          <div>
            <a href="#" className="text-md hover:underline">TERMS & PRIVACY POLICY</a>
          </div>

          {/* State Selector */}
          <div className="flex items-center text-sm font-medium gap-2 flex-wrap justify-center md:justify-start">
            <span>State:</span>
            <select className="bg-white text-black px-2 py-1 rounded">
              <option className="text-black">Port Harcourt</option>
              <option className="text-black">Abuja</option>
            </select>
          </div>
        </div>

        {/* --- Right Section: Social Icons + App Store Badges --- */}
        <div className="flex flex-col gap-5 items-center md:items-end w-full md:w-1/2">

          {/* Social Media Icons */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-end text-gray-300">
            {[
              { icon: 'youtube', href: 'https://www.youtube.com/@StayNextOfficial' },
              { icon: 'twitter' },
              { icon: 'facebook-f' },
              { icon: 'instagram' },
              { icon: 'linkedin-in' },
            ].map(({ icon, href = '#' }, i) => (
              <a key={i} href={href} className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-110 transition">
                <i className={`fab fa-${icon} text-xl text-gray-700`}></i>
              </a>
            ))}
          </div>

          {/* App Store Buttons */}
          <div className="flex flex-col md:flex-row gap-3 justify-center md:justify-end">
            {/* Apple Store */}
            <a
              href="https://apps.apple.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-105 transition"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className="h-10"
              />
            </a>

            {/* Google Play */}
            <a
              href="https://play.google.com/store/apps"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-105 transition"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-10"
              />
            </a>

            {/* Huawei AppGallery */}
            <a
              href="https://appgallery.huawei.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-white text-black rounded hover:scale-105 transition text-sm font-medium"
            >
              <i className="fas fa-mobile-alt text-lg text-gray-600"></i>
              Explore on AppGallery
            </a>
          </div>
        </div>
      </div>

      {/* ===== Bottom Section: Copyright + Back to Top ===== */}
      <div className="mt-8 pt-5 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
        
        {/* Copyright */}
        <div className="text-sm text-gray-400">
          © 2008 - 2025 StayNext.com
        </div>

        {/* Back to Top Button */}
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-gradient-to-br from-red-700 via-pink-400 to-black flex items-center justify-center font-bold text-xs text-black hover:-translate-y-1 transition"
          aria-label="Back to top"
        >
          TOP
        </a>
      </div>
    </footer>
  );
}
