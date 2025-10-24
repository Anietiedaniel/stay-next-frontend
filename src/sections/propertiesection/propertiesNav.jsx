// PropertiesNav.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "../../components/ui/Button";
import DropdownGroup from "../../components/ui/Dropdown";
import SearchBar from "../../components/ui/SearchBar";

const PropertiesNav = ({ onFilterChange }) => {
  const [selectedTab, setSelectedTab] = useState("Buy"); // Desktop dropdown
  const [selectedBuyFilter, setSelectedBuyFilter] = useState("Buy"); // Mobile buttons
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const searchHandlerRef = useRef(null);
  const searchBtnRef = useRef(null);
  const navigate = useNavigate();

  // Trigger search
  const handleSearch = () => {
    if (searchValue.trim() && searchHandlerRef.current) {
      searchHandlerRef.current(searchValue);
    }
  };

  // Trigger callback when any filter changes
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        purpose: selectedTab || selectedBuyFilter,
        propertyTypes: selectedFilters,
        states: selectedStates,
        priceRange: selectedPriceRange,
        searchText: searchValue,
      });
    }
  }, [selectedTab, selectedBuyFilter, selectedFilters, selectedStates, selectedPriceRange, searchValue]);

  return (
    <div className="px-4 py-4 mt-5 mb-10 md:mb-0 md:-mt-5 max-w-[90rem] mx-auto w-full md:sticky top-0 relative sm:z-[50]">
      {/* --- Main Filter Row --- */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-9 flex-wrap w-full relative">
        
        {/* Desktop: Purpose Dropdown */}
        {/* <div className="hidden md:block">
          <DropdownGroup
            title={selectedTab}
            multiSelect={false}
            onSelect={(items) => items.length > 0 && setSelectedTab(items[0])}
            sections={[{ title: "Purpose", items: ["Buy", "Rent", "Book", "Service"] }]}
            className="w-[120px] md:w-[209px] z-[40]"
          />
        </div> */}

        {/* Search Input */}
        <div className="relative w-full md:w-[350px] flex gap-2">
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

        {/* Mobile: Purpose Buttons */}
        {/* <div className="md:hidden w-full mt-2">
          <ButtonGroup
            buttons={["Buy", "Rent", "Book", "Service"]}
            selected={selectedBuyFilter}
            onSelect={(value) => setSelectedBuyFilter(value)}
            className="rounded-b-xl border border-gray-400 shadow-md"
          />
        </div> */}

        {/* States Filter */}
        <DropdownGroup
          title="States"
          columns={2}
          sections={[{
            title: "States",
            items: [
              "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
              "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa",
              "Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger",
              "Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe",
              "Zamfara","Federal Capital Territory (Abuja)"
            ]
          }]}
          onSelect={(items) => setSelectedStates(items)}
          className="w-full md:w-[190px]"
        />

        {/* Property Type Filter */}
        <DropdownGroup
          title="Property Type"
          onSelect={(items) => setSelectedFilters(items)}
          sections={[
            {
              title: "Residential",
              items: [
                "Apartment","Townhouse","Villa Compound","Bungalow",
                "Land","Mansion","Room","Duplex","Hotel Apartment","Penthouse",
              ],
            },
            {
              title: "Commercial",
              items: [
                "Land","Shop","Warehouse","Building","Office","Plaza","Factory",
                "Workshop","Restaurant Space","Banking Hall","Clinic/Hospital","School",
              ],
            },
          ]}
          className="w-full md:w-[190px]"
        />

        {/* Price Range Filter */}
        <DropdownGroup
          title="Price Range"
          multiSelect={false}
          onSelect={(items) => setSelectedPriceRange(items[0] || "")}
          sections={[{
            title: "Price Range",
            items: ["₦100 - ₦500k","₦500k - ₦1M","₦1M - ₦5M","₦5M - ₦10M","₦10M - ₦50M","₦50M+"]
          }]}
          className="w-full md:w-[190px]"
        />
      </div>
    </div>
  );
};

export default PropertiesNav;
