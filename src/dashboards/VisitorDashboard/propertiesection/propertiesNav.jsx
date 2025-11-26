// PropertiesNav.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "../../../components/ui/Button";
import DropdownGroup from "../../../components/ui/Dropdown";
import SearchBar from "../../../components/ui/SearchBar";

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
    <div className="px-3 py-4 mt-4 mb-10 md:mb-0 md:-mt-5 max-w-[90rem] mx-auto w-full md:sticky top-0 relative sm:z-[50] ">
      {/* --- Main Filter Row --- */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-7 w-full relative">
        
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
          className="  w-full md:w-[190px]
    text-gray-100 dark:text-gray-100
    [&_*]:text-gray-100 dark:[&_ *]:text-gray-100 bg-gray-700 dark:bg-gray-700
    [&_*]:bg-gray-700 dark:[&_ *]:bg-gray-700 rounded-2xl"
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
          className="w-full md:w-[190px] text-gray-100 dark:text-gray-100
    [&_*]:text-gray-100 dark:[&_ *]:text-gray-100 bg-gray-700 dark:bg-gray-700
    [&_*]:bg-gray-700 dark:[&_ *]:bg-gray-700 rounded-2xl"
        />

        {/* Search Input */}
        <div className="relative w-full md:w-[350px] flex md:ml-4 ">
          <SearchBar
            placeholder="Search by description / location / type..."
            value={searchValue}
            className="dark:text-gray-100 dark:bg-gray-700"
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={(cb) => (searchHandlerRef.current = cb)}
            selectedStates={selectedStates}
            selectedFilters={selectedFilters}
            searchBtnRef={searchBtnRef}
            basePath="/visitor-dashboard"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertiesNav;
