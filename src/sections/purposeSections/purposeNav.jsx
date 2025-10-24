import React, { useState, useEffect } from "react";

function Navbar({ navItems = ["All", "Buy", "Rent", "Book", "Service"], selectedType = "All", onSelect }) {
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(selectedType);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setActive(selectedType);
  }, [selectedType]);

  const handleSelect = (item) => {
    setActive(item);
    onSelect(item);
  };

  return (
    <div className="flex justify-center w-full">
      {isMobile ? (
        // Mobile buttons
        <nav className="flex items-center justify-around gap-2 text-md bg-gray-100 rounded-xl shadow-lg border border-gray-300 py-2 px-3 w-full">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleSelect(item)}
              className={`flex-1 text-center font-medium rounded-lg transition-all duration-200 ${
                active === item
                  ? "bg-green-200 text-green-800 font-bold shadow-inner"
                  : "hover:bg-gray-200 text-gray-700"
              } py-2 text-sm`}
            >
              {item}
            </button>
          ))}
        </nav>
      ) : (
        // Desktop dropdown
        <div className="relative w-[220px]">
          <select
            value={active}
            onChange={(e) => handleSelect(e.target.value)}
            className="w-full border border-gray-400 rounded-xl shadow-lg px-4 py-2 bg-gray-50 text-gray-900 text-base font-medium hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all appearance-none"
            style={{ color: "#111", backgroundColor: "#f7f7f7" }}
          >
            {navItems.map((item) => (
              <option
                key={item}
                value={item}
                className={`text-black ${
                  active === item ? "bg-green-100 font-semibold" : "bg-gray-50"
                }`}
              >
                {item}
              </option>
            ))}
          </select>
          {/* Custom arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
