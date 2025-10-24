import React, { useMemo, useState } from "react";

// NOTE: TailwindCSS + Font Awesome must be included globally in index.html
// Tailwind: <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
// Font Awesome: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

const MOCK_SERVICES = [
  {
    id: 1,
    name: "Plumber",
    fullName: "Ifeanyi Okeke",
    desc: "Expert in leak fixes, pipe installations, bathroom & kitchen repairs.",
    icon: "fas fa-faucet",
    contact: "+2348031234567",
    whatsapp: "+2348031234567",
    email: "ifeanyi.okeke@gmail.com", // ✅ Added email
    rating: 4.8,
    reviews: 129,
    img: "https://images.unsplash.com/photo-1581579188871-45ea61f2a0c8?q=80&w=1000&auto=format&fit=crop",
    location: "Lekki, Lagos",
    hourlyRate: 5000,
    categories: ["Plumber"],
    specialties: ["Leak Detection", "Pipe Fitting", "Heater Install"],
    verified: true,
    online: true,
    jobsDone: 342,
    gallery: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521207418485-99c705420785?q=80&w=1000&auto=format&fit=crop",
    ],
  },
  {
    id: 2,
    name: "Electrician",
    fullName: "Aisha Bello",
    desc: "Professional wiring, lighting installs, generator & inverter support.",
    icon: "fas fa-bolt",
    contact: "+2348124567890",
    whatsapp: "+2348124567890",
    email: "aisha.bello@yahoo.com", // ✅ Added email
    rating: 4.9,
    reviews: 214,
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop",
    location: "Gwarinpa, Abuja",
    hourlyRate: 6500,
    categories: ["Electrician"],
    specialties: ["House Wiring", "Panel Upgrade", "Solar Setup"],
    verified: true,
    online: false,
    jobsDone: 510,
    gallery: [
      "https://images.unsplash.com/photo-1582719478252-1f0b8792aa76?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1000&auto=format&fit=crop",
    ],
  },
  {
    id: 3,
    name: "Painter",
    fullName: "Samuel Ade",
    desc: "Interior & exterior painting with durable, premium finishing.",
    icon: "fas fa-paint-roller",
    contact: "+2349019876543",
    whatsapp: "+2349019876543",
    email: "samuel.ade@outlook.com", // ✅ Added email
    rating: 4.6,
    reviews: 86,
    img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1000&auto=format&fit=crop",
    location: "Port Harcourt, Rivers",
    hourlyRate: 4000,
    categories: ["Painter"],
    specialties: ["Interior Walls", "Exterior", "POP Finishing"],
    verified: false,
    online: true,
    jobsDone: 220,
    gallery: [
      "https://images.unsplash.com/photo-1505575967455-40e256f73376?q=80&w=1000&auto=format&fit=crop",
    ],
  },
];


const CATEGORIES = [
  "All",
  "Plumber",
  "Electrician",
  "Painter",
  "Carpenter",
  "AC Technician",
  "Cleaner",
];

function Rating({ value }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div
      className="flex items-center gap-1 text-yellow-500"
      title={`${value.toFixed(1)} / 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) return <i key={i} className="fas fa-star" />;
        if (i === full && half) return <i key={i} className="fas fa-star-half-alt" />;
        return <i key={i} className="far fa-star" />;
      })}
    </div>
  );
}

function Badge({ children, icon, tone = "emerald" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-${tone}-50 text-${tone}-700 border border-${tone}-200`}
    >
      {icon && <i className={`${icon}`} />}
      {children}
    </span>
  );
}

export default function ServicesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedService, setSelectedService] = useState(null);
  const [bookmarks, setBookmarks] = useState([]); // <-- bookmark state

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const filteredServices = useMemo(() => {
    return MOCK_SERVICES.filter((service) => {
      const matchesCategory =
        activeCategory === "All" ||
        service.categories.includes(activeCategory);

      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.specialties.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="p-6 dark:bg-gray-800 min-h-screen">
      {/* Search Bar */}
      <div className="mb-6 flex justify-center md:justify-start">
        <input
          type="text"
          placeholder="Search for a service or professional..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:max-w-lg px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Category Dropdown */}
      <div className="mb-8 flex justify-center md:justify-start">
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="w-full sm:w-64 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Service Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.length === 0 ? (
          <div className="text-center col-span-full text-gray-500 dark:text-gray-400">
            No services found.
          </div>
        ) : (
          filteredServices.map((s) => (
            <div
              key={s.id}
              className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img
                  src={s.img}
                  alt={s.name}
                  className="h-48 w-full object-cover"
                />
                <button
                  onClick={() => toggleBookmark(s.id)}
                  className="absolute top-2 right-2 bg-white dark:bg-gray-700 p-2 rounded-full shadow"
                  title="Bookmark"
                >
                  {bookmarks.includes(s.id) ? (
                    <i className="fas fa-bookmark text-emerald-600"></i>
                  ) : (
                    <i className="far fa-bookmark text-gray-500"></i>
                  )}
                </button>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{s.fullName}</h3>
                  {s.verified && (
                    <Badge icon="fas fa-check" tone="emerald">
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {s.desc}
                </p>
                <Rating value={s.rating} />
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  ({s.reviews} reviews)
                </div>
                <div className="mt-auto pt-4 space-y-1">
                  <div className="text-sm font-medium flex items-center gap-1">
                    <i className="fas fa-map-marker-alt text-emerald-600"></i>{" "}
                    {s.location}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <i className="fas fa-money-bill-wave text-emerald-600"></i>{" "}
                    ₦{s.hourlyRate.toLocaleString()} / hr
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(s)}
                  className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  <i className="fas fa-eye mr-2"></i> View
                </button>
              </div>
            </div>
          ))
        )}
      </div>

     {/* Modal */}
{selectedService && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg max-w-2xl w-full overflow-y-auto max-h-[90vh]">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold">
          {selectedService.fullName}
        </h2>
        <button onClick={() => setSelectedService(null)}>
          <i className="fas fa-times text-gray-600 dark:text-gray-300"></i>
        </button>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        {/* Profile Image */}
        <img
          src={selectedService.img}
          alt={selectedService.fullName}
          className="w-full h-56 object-cover rounded"
        />

        {/* Description */}
        <p>{selectedService.desc}</p>

        {/* Contact Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <i className="fas fa-phone text-emerald-600"></i>
            <a href={`tel:${selectedService.contact}`} className="hover:underline">
              {selectedService.contact}
            </a>
          </div>
          {selectedService.email && (
            <div className="flex items-center gap-2">
              <i className="fas fa-envelope text-emerald-600"></i>
              <a href={`mailto:${selectedService.email}`} className="hover:underline">
                {selectedService.email}
              </a>
            </div>
          )}
          <div className="flex items-center gap-2">
            <i className="fab fa-whatsapp text-emerald-600"></i>
            <a
              href={`https://wa.me/${selectedService.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {selectedService.whatsapp}
            </a>
          </div>
        </div>

        {/* Meta Info */}
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <i className="fas fa-map-marker-alt text-green-600"></i>
            <span> {selectedService.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <i className="fas fa-money-bill-wave text-yellow-600"></i>
            <span>₦{selectedService.hourlyRate.toLocaleString()} / hr</span>
          </div>

          <div className="flex items-center gap-2">
            <i className="fas fa-tools text-blue-600"></i>
            <span>
              {selectedService.specialties.join(", ")}
            </span>
          </div>
        </div>

        {/* Gallery */}
        {selectedService.gallery.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <i className="fas fa-images text-purple-600"></i>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {selectedService.gallery.map((g, idx) => (
                <img
                  key={idx}
                  src={g}
                  alt="gallery"
                  className="h-32 w-full object-cover rounded shadow transition-transform duration-200 hover:scale-105"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)}

    </div>
  );
}
