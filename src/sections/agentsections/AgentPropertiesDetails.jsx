import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AGENTAPI from "../../utils/agentaxios";
import useAuth from "../../hooks/useAuth";

function AgentPropertiesDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const formatPrice = (amount) => {
    if (!amount) return "";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    if (!user) return;

    const fetchProperty = async () => {
      try {
        setLoading(true);
        const res = await AGENTAPI.get(`/agents/properties/single/${id}`);
        setProperty(res.data.property);
      } catch (err) {
        console.error("Failed to fetch property:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg font-semibold text-gray-800">
          Please{" "}
          <span
            className="text-green-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            login
          </span>{" "}
          to view property details.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading property details...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        Property not found.
      </div>
    );
  }

  // 🌟 CLOUDINARY ONLY — VIDEOS FIRST
  const videoSlides = property.videos || [];   // cloudinary video URLs
  const imageSlides = property.images || [];   // cloudinary image URLs
  const slides = [...videoSlides, ...imageSlides];

  return (
    <div className="container mx-auto px-4 py-8 mt-20 md:mt-10">

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
        <p className="text-green-600 text-xl font-semibold mt-2">
          {formatPrice(property.price)}
        </p>
        <p className="text-gray-500">{property.location}</p>
      </div>

      {/* MAIN SLIDER */}
      <div className="relative w-full max-w-4xl mx-auto mb-6 aspect-video">
        {slides[currentSlide] ? (
          slides[currentSlide].endsWith(".mp4") ||
          slides[currentSlide].includes("video")
            ? (
                <video
                  className="w-full h-full rounded-xl shadow-lg"
                  src={slides[currentSlide]}
                  controls
                ></video>
              )
            : (
                <img
                  src={slides[currentSlide]}
                  alt="Property"
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
              )
        ) : null}

        {/* Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentSlide(
                  (prev) => (prev - 1 + slides.length) % slides.length
                )
              }
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
            >
              ❮
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % slides.length)
              }
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
            >
              ❯
            </button>
          </>
        )}
      </div>

      {/* THUMBNAILS */}
      {slides.length > 1 && (
        <div className="flex gap-3 justify-center mb-6">
          {slides.map((slide, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-20 h-20 rounded-lg cursor-pointer border-2 overflow-hidden ${
                currentSlide === index ? "border-green-600" : "border-transparent"
              }`}
            >
              {slide.endsWith(".mp4") ||
              slide.includes("video") ? (
                <video src={slide} className="w-full h-full object-cover"></video>
              ) : (
                <img
                  src={slide}
                  alt={`Thumb ${index}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* DETAILS */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Property Details</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
          <p><span className="font-semibold">Type:</span> {property.type}</p>

          {property.type?.toLowerCase() === "land" ? (
            <p>
              <span className="font-semibold">Area:</span> {property.area} sq.m
            </p>
          ) : (
            <>
              <p>
                <span className="font-semibold">Beds:</span> {property.bedrooms}
              </p>
              <p>
                <span className="font-semibold">Toilets:</span> {property.toilets}
              </p>
            </>
          )}

          {property.features?.length > 0 && (
            <p className="col-span-2 md:col-span-4">
              <span className="font-semibold">Features:</span>{" "}
              {property.features.join(", ")}
            </p>
          )}
        </div>
      </div>

      {/* TRANSACTION BUTTON */}
      {property.transactionType && (
        <div className="flex justify-center mb-6">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
            {property.transactionType}
          </button>
        </div>
      )}

      {/* AGENT INFO */}
      {property.agent && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Agent Info</h2>

          <div className="flex items-center gap-4 mb-2">
            <img
              src={
                property.agent?.profileImage?.trim()
                  ? property.agent.profileImage
                  : "https://via.placeholder.com/100"
              }
              alt="Agent"
              className="w-16 h-16 rounded-full object-cover border-2 border-green-600"
            />

            <div>
              <h3 className="font-bold text-gray-900">{property.agent.name}</h3>
              <p className="text-gray-600">
                {property.agent.verification?.state || "Unverified"}
              </p>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            {property.agent.phone && (
              <a
                href={`tel:${property.agent.phone}`}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Call
              </a>
            )}

            {property.agent.whatsapp && (
              <a
                href={`https://wa.me/${property.agent.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                WhatsApp
              </a>
            )}

            {property.agent.email && (
              <a
                href={`mailto:${property.agent.email}`}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Email
              </a>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default AgentPropertiesDetails;
