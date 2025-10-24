import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../sections/purposeSections/purposeNav";
import PurposeCard from "../../sections/purposeSections/PurposeCard";
import PropertiesNav from "../../sections/propertiesection/PropertiesNav";

const adImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?fit=crop&w=300&h=600",
  "https://images.unsplash.com/photo-1599423300746-b62533397364?fit=crop&w=300&h=600",
  "https://images.unsplash.com/photo-1600607681928-46063e0f79c2?fit=crop&w=300&h=600",
];

function PurposePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedType, setSelectedType] = useState("All");
  const [adIndex, setAdIndex] = useState(0);
  const [filters, setFilters] = useState({});
  const [purpose, setPurpose] = useState("all");

  // 🟢 Sync with URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryType = params.get("query");

    if (location.pathname === "/purpose" && !queryType) {
      setSelectedType("All");
      setPurpose("all");
      return;
    }

    if (queryType) {
      const formatted =
        queryType === "sale" ? "Buy" : queryType.charAt(0).toUpperCase() + queryType.slice(1).toLowerCase();
      setSelectedType(formatted);
      setPurpose(queryType.toLowerCase());
    }
  }, [location.pathname, location.search]);

  // 🟢 Handle tab selection
  const handleSelect = (tab) => {
    setSelectedType(tab); // immediate highlight

    let queryValue;
    if (tab === "All") {
      queryValue = null; // no query
      setFilters({});
      setPurpose("all");
      navigate("/properties", { replace: true });
    } else if (tab === "Buy") {
      queryValue = "sale"; // Buy → sale
      setPurpose("buy");   // keep UI tab as Buy
      navigate(`/purpose?query=${queryValue}`, { replace: true });
    } else {
      queryValue = tab.toLowerCase();
      setPurpose(tab.toLowerCase());
      navigate(`/purpose?query=${queryValue}`, { replace: true });
    }
  };

  // 🟢 Handle filters
  const handleFilterChange = (newFilters) => setFilters(newFilters);

  // 🟢 Ad scroll rotation
  useEffect(() => {
    const handleScroll = () => {
      const nextIndex = Math.floor(window.scrollY / 1000) % adImages.length;
      setAdIndex(nextIndex);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="space-y-2 mb-5 relative">
      {/* Tabs */}
      <div className="px-8 mt-24 md:absolute md:left-[0px] md:top-0 md:mt-5">
        <Navbar selectedType={selectedType} onSelect={handleSelect} />
      </div>

      {/* Filter + search */}
      <div className="px-4 md:ml-56">
        <PropertiesNav onFilterChange={handleFilterChange} />
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-6 mt-4 overflow-visible">
        {/* Content */}
        <div className="space-y-6 px-3 md:px-7 overflow-visible">
          <PurposeCard transactionType={purpose} filters={filters} />
        </div>

        {/* Ads */}
        <div className="hidden lg:block sticky top-24 h-fit w-[360px] md:-z-20">
          <img
            src={adImages[adIndex]}
            alt={`Ad ${adIndex + 1}`}
            className="w-full rounded-xl shadow-lg object-cover transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
}

export default PurposePage;
