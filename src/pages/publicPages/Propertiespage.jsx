import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropertyShowcaseCard from "../../sections/propertiesection/PropertyShowcaseCard";
import Navbar from "../../sections/purposeSections/purposeNav";
import PropertiesNav from "../../sections/propertiesection/propertiesNav";

const adImages = [
  "https://images.unsplash.com/photo-1599423300746-b62533397364?fit=crop&w=300&h=600",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?fit=crop&w=300&h=600",
  "https://images.unsplash.com/photo-1600607681928-46063e0f79c2?fit=crop&w=300&h=600",
];

function PropertiesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedType, setSelectedType] = useState("All");
  const [adIndex, setAdIndex] = useState(0);
  const [filters, setFilters] = useState({});
  const [purpose, setPurpose] = useState("all");

  // Watch for route or query changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryType = params.get("query");

    // All tab → /properties
    if (location.pathname === "/properties") {
      setSelectedType("All");
      setPurpose("all");
      return;
    }

    // Other tabs → map query to UI tab
    if (queryType) {
      const formatted = queryType.toLowerCase() === "sale" ? "Buy"
                        : queryType.charAt(0).toUpperCase() + queryType.slice(1);
      setSelectedType(formatted);
      setPurpose(queryType.toLowerCase());
    }
  }, [location.pathname, location.search]);

  // Handle tab select
  const handleSelect = (tab) => {
    setSelectedType(tab);          // highlight immediately
    let queryValue = tab === "Buy" ? "sale" : tab.toLowerCase();

    if (tab === "All") {
      setPurpose("all");
      setFilters({});
      navigate("/properties", { replace: true }); // no query param
    } else {
      setPurpose(tab.toLowerCase());
      navigate(`/purpose?query=${queryValue}`, { replace: true });
    }
  };

  // Filters from PropertiesNav
  const handleFilterChange = (newFilters) => setFilters(newFilters);

  // Ad rotation on scroll
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
      <div className="px-8 mt-24 md:absolute md:left-[0px] md:top-0 md:mt-5 ">
        <Navbar selectedType={selectedType} onSelect={handleSelect} />
      </div>

      {/* Filters */}
      <div className="px-4 md:ml-56">
        <PropertiesNav onFilterChange={handleFilterChange} />
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-6 mt-4 overflow-visible">
        <div className="space-y-6 px-3 md:px-7 overflow-visible">
          <PropertyShowcaseCard purpose={purpose} filters={filters} />
        </div>

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

export default PropertiesPage;
