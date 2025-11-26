import React from "react";

// Map of common real estate features to Font Awesome icons
const featureIcons = {
  // Interior / Exterior
  "Pool": "fas fa-swimming-pool",
  "Parking": "fas fa-car",
  "Garage": "fas fa-warehouse",
  "Garden": "fas fa-tree",
  "Balcony": "fas fa-building",
  "Gym": "fas fa-dumbbell",
  "Furnished": "fas fa-couch",
  "Air Conditioning": "fas fa-wind",
  "Fireplace": "fas fa-fire",
  "Security": "fas fa-shield-alt",
  "Elevator": "fas fa-elevator",
  "Pet Friendly": "fas fa-paw",
  "WiFi": "fas fa-wifi",
  "Rooftop": "fas fa-building",
  "CCTV": "fas fa-video",
  "Solar Panels": "fas fa-solar-panel",
  "Basement": "fas fa-box",
  "Dining Room": "fas fa-utensils",
  "Living Room": "fas fa-couch",
  "Kitchen": "fas fa-kitchen-set",
  "Laundry": "fas fa-tshirt",
  "Accessible": "fas fa-wheelchair",
  "Storage": "fas fa-archive",
  "Fire Alarm": "fas fa-bell",
  "Playground": "fas fa-child",
  "Sauna": "fas fa-hot-tub",
  "Jacuzzi": "fas fa-hot-tub",
  "Library": "fas fa-book",
  "Office": "fas fa-briefcase",
  "Terrace": "fas fa-building",
  "Patio": "fas fa-tree",

  // Location / Proximity
  "School": "fas fa-school",
  "Hospital": "fas fa-hospital",
  "Market": "fas fa-store",
  "Mall": "fas fa-shopping-bag",
  "Airport": "fas fa-plane-departure",
  "Train Station": "fas fa-train",
  "Bus Stop": "fas fa-bus",
  "Road": "fas fa-road",
  "Highway": "fas fa-road",
  "Park": "fas fa-tree",
  "Church": "fas fa-church",

  // Views
  "Sea": "fas fa-water",
  "Lake": "fas fa-water",
  "Mountain": "fas fa-mountain",
  "City": "fas fa-city",

  // Utilities & Infrastructure
  "Power": "fas fa-bolt",
  "Generator": "fas fa-charging-station",
  "Water": "fas fa-faucet",
  "Internet": "fas fa-network-wired",
  "Lights": "fas fa-lightbulb",
  "Drainage": "fas fa-tint",
};

// Helper to find matching icon
const getFeatureIcon = (feature) => {
  const lowerFeature = feature.toLowerCase();

  // find the first key that appears in the feature text
  const match = Object.keys(featureIcons).find((key) =>
    lowerFeature.includes(key.toLowerCase())
  );

  return featureIcons[match] || "fas fa-check"; // fallback icon
};

// Component
const PropertyFeatures = ({ features = [] }) => {
  if (!features || features.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 text-gray-800 text-sm">
      {features.map((feature, index) => (
        <span
          key={index}
          className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full border border-green-200"
        >
          <i className={`${getFeatureIcon(feature)} text-green-600`}></i>
          {feature}
        </span>
      ))}
    </div>
  );
};

export default PropertyFeatures;
