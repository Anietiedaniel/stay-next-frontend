import React, { useState, useRef } from "react";
import DropdownGroup from "../../components/ui/Dropdown";
import SearchBar from "../../components/ui/SearchBar";

function HeroContent() {
  const [selectedFilters, setSelectedFilters] = useState([]); // property type filter
  const [selectedAgentFee, setSelectedAgentFee] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedStates, setSelectedStates] = useState([]); // states filter
  const [selectedPriceRange, setSelectedPriceRange] = useState(""); // price range filter
  const searchHandlerRef = useRef(null); // stores SearchBar search callback
  const searchBtnRef = useRef(null); // ref for search button

  const handleSearch = () => {
    if (searchValue.trim() && searchHandlerRef.current) {
      searchHandlerRef.current(searchValue); // trigger SearchBar search logic
    }
  };

  console.log("Selected States:", selectedStates);
  console.log("Selected Filters (Types):", selectedFilters);
  console.log("Selected Price Range:", selectedPriceRange);
  console.log("Search Value:", searchValue);

  return (
    <div className="grid gap-5 px-4 py-5 md:bg-gray-100 rounded-xl mt-5 mb-28 max-w-4xl mx-auto">
      {/* Top Row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
        {/* Search Bar + Search Button */}
        <div className="flex flex-col sm:flex-row flex-1 gap-3">
          <div className="relative w-full">
            <SearchBar
              placeholder="Search by description / location / type..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onSearch={(cb) => (searchHandlerRef.current = cb)}
              selectedStates={selectedStates}
              selectedFilters={selectedFilters}
              searchBtnRef={searchBtnRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
          </div>
          <button
            ref={searchBtnRef}
            className="w-full md:w-[230px] md:-ml-32 sm:w-auto bg-green-600 text-white px-6 py-3 mt-3 md:mt-0 rounded-xl font-bold hover:bg-green-700 transition"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="hidden gap-5 w-full sm:flex sm:flex-wrap md:gap-2 mt-5 md:mt-0">
        {/* States Filter */}
        <DropdownGroup
          title="States"
          columns={2}
          sections={[
            {
              title: "States",
              items: [
                "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
                "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa",
                "Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger",
                "Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe",
                "Zamfara","Federal Capital Territory (Abuja)"
              ],
            },
          ]}
          onSelect={(items) => setSelectedStates(items)}
        />

        {/* Property Type Filter */}
        <DropdownGroup
          title="Property Type"
          onSelect={(items) => setSelectedFilters(items)}
          sections={[
            {
              title: "Residential",
              items: [
                "Apartment",
                "Villa Compound",
                "Bungalow",
                "Land",
                "Mansion",
                "Room",
                "Duplex",
                "Hotel Apartment",
              ],
            },
            {
              title: "Commercial",
              items: [
                "Land",
                "Shop",
                "Warehouse",
                "Building",
                "Office",
                "Plaza",
                "Factory",
                "Workshop",
                "Restaurant Space",
                "Banking Hall",
                "Clinic/Hospital",
                "School",
              ],
            },
          ]}
        />

        {/* Price Range Filter */}
        <DropdownGroup
          title="Price(NGN)"
          multiSelect={false}
          onSelect={(items) => setSelectedPriceRange(items[0] || "")}
          sections={[
            {
              title: "Price(NGN)",
              items: [
                "₦100 - ₦500k",
                "₦500k - ₦1M",
                "₦1M - ₦5M",
                "₦5M - ₦10M",
                "₦10M - ₦50M",
                "₦50M+",
              ],
            },
          ]}
        />

 <DropdownGroup
  title="Agent Fee"
  readOnly={true} // 🟩 this makes it static
  multiSelect={false}
  sections={[
    {
      title: "Agent Fee (%)",
      items: ["Rent - 20%", "Buy - 5%", "Book - n%", "Service - 5%"],
    },
  ]}
/>


      </div>

      {/* Banner */}
      <div className="hidden md:flex bg-[#D1F0E2] p-4 rounded-lg flex-col md:flex-row justify-between items-start md:items-center gap-2 text-left text-black mt-5 md:mt-0">
        <p>Want to find more about Nigeria real estates using AI?</p>
        <p className="text-green-800 font-bold cursor-pointer">
          Try NextGPT <i className="fas fa-arrow-right ml-1"></i>
        </p>
      </div>
    </div>
  );
}

export default HeroContent;
