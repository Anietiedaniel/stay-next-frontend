import React, { useEffect, useState } from "react";
import "../../../styles/badge.css";
import { PropertyCard } from "../propertiesection/PropertyShowcaseCard";

function ResultCard({ results = [] }) {
  const [agentProperties, setAgentProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (results && results.length > 0) {
      const groupedMap = {};
      results.forEach((p) => {
        const agent = p.agent;
        if (!groupedMap[agent._id]) {
          groupedMap[agent._id] = { agent, properties: [] };
        }
        groupedMap[agent._id].properties.push(p);
      });
      setAgentProperties(Object.values(groupedMap));
    } else {
      setAgentProperties([]);
    }

    setLoading(false);
  }, [results]);

  if (loading) {
    return (
      <div className="w-full max-w-4xl p-6 border rounded-lg shadow text-center">
        Loading properties...
      </div>
    );
  }

  if (!agentProperties.length) {
    return (
      <div className="w-full max-w-4xl p-6 border rounded-lg shadow text-center text-gray-500">
        <i className="fas fa-search text-gray-400 text-2xl mb-2"></i>
        <div>No properties found. Try another search.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {agentProperties.map(({ agent, properties }) => (
        <div key={agent._id} className="space-y-4">
          <div className="flex flex-col gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


export default ResultCard;
