import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AGENTAPI from "../../../utils/agentaxios";
import "../../../styles/badge.css";
import { PropertyCard } from "../propertiesection/PropertyShowcaseCard";

function PurposeCard({ transactionType }) {
  const [allProperties, setAllProperties] = useState([]); // ✅ store all fetched once
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 🟢 Fetch all properties once on mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await AGENTAPI.get(`/agents/properties/all`);
        setAllProperties(res.data.properties || []);
      } catch (err) {
        console.error("❌ Failed to fetch properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []); // ✅ runs once only

  // 🧠 Filter locally using useMemo (fast and avoids re-filtering unnecessarily)
  const filteredProperties = useMemo(() => {
    return allProperties.filter(
      (p) =>
        p.transactionType?.toLowerCase() === transactionType?.toLowerCase()
    );
  }, [allProperties, transactionType]);

  // 🌀 Loading state (only on first mount)
  if (loading) {
    return (
      <div className="w-full max-w-4xl p-6 border rounded-lg shadow text-center">
        Loading properties...
      </div>
    );
  }

  // ❌ Error display
  if (error) {
    return (
      <div className="w-full max-w-4xl p-6 border rounded-lg shadow text-center text-red-500">
        {error}
      </div>
    );
  }

  // ❗ No matching properties found for the selected type
  if (!filteredProperties.length) {
    return (
      <div className="w-full max-w-4xl p-6 border rounded-lg shadow text-center text-red-500">
        No properties found for {transactionType}.
      </div>
    );
  }

  // ✅ Render filtered list instantly when switching tabs
  return (
    <div className="flex flex-col gap-10">
      {filteredProperties.map((property) => (
        <PropertyCard
          key={property._id}
          property={property}
          navigate={navigate}
        />
      ))}
    </div>
  );
}

export default PurposeCard;
