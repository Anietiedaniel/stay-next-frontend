import React, { useState, useEffect } from "react";

function Navbar({
  // UI labels for buttons
  navItems = ["Buying", "Renting", "Booking", "Servicing"],
  selectedType = "All",
  onSelect,
}) {
  const [active, setActive] = useState(selectedType);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Map UI label → backend value
  const mapToValue = {
    Buying: "sale",
    Renting: "rent",
    Booking: "book",
    Servicing: "service",
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keep active tab synced with parent prop
  useEffect(() => {
    setActive(selectedType);
  }, [selectedType]);

  const handleClick = (item) => {
    const value = mapToValue[item] || item;
    setActive(value); // highlight active type
    onSelect(value);  // pass cleaned value to parent
  };

  return (
    <div className="flex justify-center w-full px-4">
      <nav
        className={`flex items-center justify-between ${
          isMobile
            ? "gap-2 text-xs bg-white text-gray-800 rounded-xl shadow-md border border-gray-200 py-2 px-3"
            : "gap-12 text-lg bg-gray-100 text-black py-3 px-3 rounded-md shadow-md"
        }`}
        style={{
          width: isMobile ? "95%" : "60%",
          maxWidth: isMobile ? "420px" : "700px",
          margin: "0 auto",
        }}
      >
        {navItems.map((item) => {
          const value = mapToValue[item];
          return (
            <button
              key={item}
              onClick={() => handleClick(item)}
              className={`flex-1 text-center font-medium rounded-lg transition-all duration-200 ${
                active === value
                  ? "bg-[#D1F0E4] text-green-700 font-semibold"
                  : "hover:bg-gray-200 text-gray-700"
              } ${isMobile ? "py-1.5 text-sm" : "py-3 px-6 text-base"}`}
            >
              {item}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default Navbar;
