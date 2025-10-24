import React, { useState, useEffect, useRef } from "react";

function DropdownGroup({
  title = "More Filters",
  sections = [],
  onSelect = () => {},
  multiSelect = true,
  className = "",
  columns = 2,
  readOnly = false, // 🟩 new prop added
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  const toggleItem = (sectionTitle, item) => {
    setSelectedItems((prev) => {
      if (!multiSelect) return { [sectionTitle]: [item] };
      const current = prev[sectionTitle] || [];
      const updated = current.includes(item)
        ? current.filter((i) => i !== item)
        : [...current, item];
      return { ...prev, [sectionTitle]: updated };
    });
  };

  const handleReset = () => setSelectedItems({});

  const handleDone = () => {
    const all = Object.values(selectedItems).flat();
    onSelect(all);
    setIsOpen(false);
  };

  const activeTitle = sections[activeSection]?.title;
  const activeItems = selectedItems[activeTitle] || [];
  const totalSelected = Object.values(selectedItems).flat().length;

  const displayTitle =
    totalSelected === 0
      ? title
      : totalSelected === 1
      ? Object.values(selectedItems).flat()[0]
      : `${activeTitle} (${activeItems.length})`;

  const gridClass = `grid grid-cols-${columns} gap-3 mb-4 px-1`;
  const scrollClass =
    sections[activeSection]?.title === "States"
      ? "max-h-[250px] overflow-y-auto pr-2"
      : "";

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block text-left gap-4 transition-all duration-150 ${

        isOpen ? "z-[99999]" : "z-0"
      } ${className}`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-gray-100 border border-gray-400 py-3 px-2 rounded-xl shadow-md flex items-center justify-between w-full md:w-[210px]"
      >
        <span className="text-black max-w-[120px] truncate">{displayTitle}</span>
        <i
          className={`fas text-gray-500 ml-1 md:ml-2 ${
            isOpen ? "fa-chevron-up" : "fa-chevron-down"
          }`}
        ></i>
      </button>

      {/* Desktop Dropdown */}
      {isOpen && (
        <div className="hidden md:block absolute mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-2 w-fit min-w-[300px] z-[9999999]">
          {/* Tabs */}
          <div className="border-b pb-3 mb-4 relative">
            <div className="flex justify-between px-1 text-xl">
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSection(index)}
                  className={`text-sm font-semibold px-4 py-2 rounded-md transition whitespace-nowrap ${
                    activeSection === index
                      ? "text-green-700 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-300"></div>
            <div
              className="absolute bottom-0 h-[2px] bg-green-600 transition-all duration-300"
              style={{
                width: `${100 / sections.length}%`,
                left: `${(100 / sections.length) * activeSection}%`,
              }}
            ></div>
          </div>

          {/* Items */}
          <div className={`${gridClass} ${scrollClass}`}>
            {sections[activeSection]?.items.map((item, i) => {
              const sectionTitle = sections[activeSection].title;
              const isSelected = selectedItems[sectionTitle]?.includes(item);
              return (
                <div
                  key={i}
                  onClick={() => {
                    if (!readOnly) toggleItem(sectionTitle, item);
                  }}
                  className={`px-1 py-2 text-sm ${readOnly ? "cursor-default" : "cursor-pointer"} transition text-black border rounded-3xl text-center ${
                    isSelected
                      ? "bg-[#D1F0E2] font-bold text-green-600 border-green-600"
                      : "bg-gray-100 hover:bg-[#f5f5f5]"
                  }`}
                >
                  {item}
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
         {/* Action Buttons */}
{!readOnly && (
  <div className="flex justify-between items-center mt-4 px-1">
    <button
      onClick={handleReset}
      className="text-sm text-red-500 hover:underline font-medium"
    >
      Reset
    </button>
    <button
      onClick={handleDone}
      className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-bold"
    >
      Done
    </button>
  </div>
)}

        </div>
      )}

      {/* Mobile Modal */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center w-full">
          <div className="bg-white w-[100%] rounded-xl p-4 shadow-xl">
            <h2 className="text-lg font-bold mb-3 text-center">{displayTitle}</h2>

            {/* Tabs */}
            <div className="flex justify-around border-b pb-2 mb-3">
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSection(index)}
                  className={`text-sm px-2 py-1 font-medium ${
                    activeSection === index
                      ? "text-green-600 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>

            {/* Items */}
            <div
              className={`grid grid-cols-2 gap-3 mb-4 ${
                sections[activeSection]?.title === "States"
                  ? "max-h-[250px] overflow-y-auto pr-2"
                  : ""
              }`}
            >
              {sections[activeSection]?.items.map((item, i) => {
                const sectionTitle = sections[activeSection].title;
                const isSelected = selectedItems[sectionTitle]?.includes(item);
                return (
                  <div
                    key={i}
                    onClick={() => toggleItem(sectionTitle, item)}
                    className={`px-1 py-2 text-sm cursor-pointer transition text-black border rounded-3xl text-center ${
                      isSelected
                        ? "bg-[#D1F0E2] font-bold text-green-600 border-green-600"
                        : "bg-gray-100 hover:bg-[#f5f5f5]"
                    }`}
                  >
                    {item}
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleReset}
                className="text-sm text-red-500 hover:underline font-medium"
              >
                Reset
              </button>
              <button
                onClick={handleDone}
                className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownGroup;
