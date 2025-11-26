import React, { useState, useEffect } from "react";

function Navbar({
  navItems = ["All", "Buy", "Rent", "Book", "Service"],
  selectedType = "All",
  onSelect,
}) {
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
        // 🌙 MOBILE NAV (Light + Dark)
        <nav className="flex items-center justify-around gap-2 text-md bg-gray-100 dark:bg-gray-800 dark:text-gray-200 rounded-xl shadow-lg border border-gray-300 dark:border-gray-600 py-2 px-3 w-full">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleSelect(item)}
              className={`flex-1 text-center font-medium rounded-lg transition-all duration-200 py-2 text-sm ${
                active === item
                  ? "bg-green-200 text-green-900 dark:bg-green-400 dark:text-black font-bold shadow-inner"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      ) : (
        // 🖥 DESKTOP DROPDOWN (Clean Light/Dark Mode)
        <div className="relative w-[220px]">
          <select
            value={active}
            onChange={(e) => handleSelect(e.target.value)}
            className="
              w-full px-4 py-3 text-base font-medium rounded-xl shadow-lg
              border border-gray-300 dark:border-gray-400
              bg-gray-50 dark:bg-gray-700
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-500
              transition-all appearance-none -mt-1
            "
          >
            {navItems.map((item) => (
              <option
                key={item}
                value={item}
                className="text-black dark:text-white bg-white dark:bg-gray-800"
              >
                {item}
              </option>
            ))}
          </select>

          {/* Custom SVG Arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
