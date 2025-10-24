import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AGENTAPI from "../../utils/agentaxios";

const SearchBar = ({
  value,
  onChange,
  placeholder,
  className = "",
  selectedStates = [],
  selectedFilters = [],
  searchBtnRef, // ✅ ref for search button passed from parent
  onSearch,     // ✅ callback setter from parent
}) => {
  const [properties, setProperties] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  // ✅ Fetch all properties once
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await AGENTAPI.get("/agents/properties/all");
        setProperties(res.data.properties || []);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // ✅ Suggestions filter
  useEffect(() => {
    if (value?.length >= 2) {
      const q = value.toLowerCase().trim();
      let filtered = properties;

      if (selectedStates.length > 0) {
        filtered = filtered.filter((p) =>
          selectedStates.some((st) =>
            (p?.agent?.verification?.state || "")
              .toLowerCase()
              .includes(st.toLowerCase())
          )
        );
      }

      if (selectedFilters.length > 0) {
        filtered = filtered.filter((p) =>
          selectedFilters.some(
            (type) => (p?.type || "").toLowerCase() === type.toLowerCase()
          )
        );
      }

      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q)
      );

      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [value, properties, selectedStates, selectedFilters]);

  // ✅ Actual search handler (used by Enter + button + parent + suggestion click)
  const handleSearch = React.useCallback(() => {
    const q = value.trim().toLowerCase();
    if (!q) return;

    let filtered = properties;

    if (selectedStates.length > 0) {
      filtered = filtered.filter((p) =>
        selectedStates.some(
          (st) =>
            (p?.agent?.verification?.state || "").toLowerCase() ===
            st.toLowerCase()
        )
      );
    }

    if (selectedFilters.length > 0) {
      filtered = filtered.filter((p) =>
        selectedFilters.some(
          (type) => (p?.type || "").toLowerCase() === type.toLowerCase()
        )
      );
    }

    // ✅ Exact match prioritization
    const exact = filtered.find(
      (p) =>
        p.title.toLowerCase() === q ||
        p.location.toLowerCase() === q ||
        p.type.toLowerCase() === q
    );

    let similar = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    );

    if (exact) {
      similar = [exact, ...similar.filter((p) => p._id !== exact._id)];
    }

    navigate(`/search?query=${encodeURIComponent(q)}`, {
      state: { results: similar },
    });
    setSuggestions([]); // ✅ clear dropdown after search
  }, [value, properties, selectedStates, selectedFilters, navigate]);

  // ✅ Expose search handler to parent
  useEffect(() => {
    if (onSearch) {
      onSearch(handleSearch);
    }
  }, [onSearch, handleSearch]);

  // ✅ Close suggestions + clear input when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        (wrapperRef.current && wrapperRef.current.contains(e.target)) ||
        (searchBtnRef?.current && searchBtnRef.current.contains(e.target))
      ) {
        return;
      }
      setSuggestions([]);
      if (onChange) {
        onChange({ target: { value: "" } }); // clear input
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [onChange, searchBtnRef]);

  return (
    <div className="relative w-full md:w-[640px]" ref={wrapperRef}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className={`w-full pl-5 pr-4 py-3 border border-gray-400 rounded-xl text-black shadow-md focus:outline-none text-sm ${className}`}
      />

      {value?.length >= 2 && !loading && (
        <ul className="absolute left-0 right-0 bg-white border rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto z-50 text-black">
          {suggestions.length > 0 ? (
            suggestions.map((s) => (
              <li
                key={s._id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  // ✅ put suggestion into input
                  if (onChange) {
                    onChange({ target: { value: s.title } });
                  }
                  // ✅ trigger same search logic
                  setTimeout(() => handleSearch(), 0);
                }}
              >
                <span className="font-semibold">{s.title}</span> – {s.location} |{" "}
                <span className="italic">{s.type}</span>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500 italic">
              No matching properties found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
