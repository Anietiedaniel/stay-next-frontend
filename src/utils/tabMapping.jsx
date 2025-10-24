// utils/tabMapping.js
export const mapTabToQuery = (tab) => {
  if (tab === "All") return null; // no query for All
  if (tab === "Buy") return "sale";
  return tab.toLowerCase();
};

export const mapQueryToTab = (query) => {
  if (!query) return "All";
  if (query === "sale") return "Buy";
  return query.charAt(0).toUpperCase() + query.slice(1);
};
