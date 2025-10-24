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

  const extractYouTubeId = (url) => {
    if (!url || typeof url !== "string") return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  useEffect(() => {
    if (!user) return;

    const fetchProperty = async () => {
      try {
        setLoading(true);
        const res = await AGENTAPI.get(`/agents/properties/single/${id}`);
        console.log("Fetched property:", res.data.property);
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

  // Combine videos first, then images
  const videoSlides = (property.youtubeVideos || []).filter((v) =>
    extractYouTubeId(v)
  );
  const imageSlides = property.images || [];
  const slides = [...videoSlides, ...imageSlides];

  const isYouTube = (slide) => extractYouTubeId(slide) !== null;

  return (
    <div className="container mx-auto px-4 py-8 mt-20 md:mt-10">
      {/* Property Title & Price */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
        <p className="text-green-600 text-xl font-semibold mt-2">
          {formatPrice(property.price)}
        </p>
        <p className="text-gray-500">{property.location}</p>
      </div>

      {/* Slider */}
      <div className="relative w-full max-w-4xl mx-auto mb-6 aspect-video">
        {slides[currentSlide] ? (
          isYouTube(slides[currentSlide]) ? (
            <iframe
              className="w-full h-full rounded-xl shadow-lg"
              src={`https://www.youtube.com/embed/${extractYouTubeId(
                slides[currentSlide]
              )}`}
              title="Property Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              src={
                slides[currentSlide].trim() !== ""
                  ? slides[currentSlide]
                  : "https://via.placeholder.com/800x500"
              }
              alt="Property"
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
          )
        ) : null}

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

      {/* Thumbnails */}
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
              {isYouTube(slide) ? (
                <img
                  src={`https://img.youtube.com/vi/${extractYouTubeId(slide)}/0.jpg`}
                  alt={`Video ${index}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={slide.trim() !== "" ? slide : "https://via.placeholder.com/150"}
                  alt={`Thumb ${index}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Property Details */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Property Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
          <p>
            <span className="font-semibold">Type:</span> {property.type}
          </p>

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

      {/* Transaction Type Button */}
      {property.transactionType && (
        <div className="flex justify-center mb-6">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            {property.transactionType.toLowerCase() === "sale"
              ? "Buy Now"
              : property.transactionType.toLowerCase() === "rent"
              ? "Rent Now"
              : property.transactionType.toLowerCase() === "book"
              ? "Book Now"
              : property.transactionType}
          </button>
        </div>
      )}

      {/* Agent Info */}
      {property.agent && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Agent Info</h2>
          <div className="flex items-center gap-4 mb-2">
            <img
              src={
                property.agent?.profileImage &&
                property.agent.profileImage.trim() !== ""
                  ? property.agent.profileImage
                  : "https://via.placeholder.com/100"
              }
              alt={property.agent?.name || "Agent"}
              className="w-16 h-16 rounded-full object-cover border-2 border-green-600"
            />
            <div>
              <h3 className="font-bold text-gray-900">{property.agent.name}</h3>
              <p className="text-gray-600">
                {property?.agent?.verification?.state || "Unverified"}
              </p>
            </div>
          </div>

          {/* Agent Contact Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            {property.agent?.phone || property.agent?.verification?.phone ? (
              <a
                href={`tel:${property.agent.phone || property.agent.verification.phone}`}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Call
              </a>
            ) : null}

            {property.agent?.whatsapp || property.agent?.verification?.whatsapp ? (
              <a
                href={`https://wa.me/${
                  property.agent.whatsapp || property.agent.verification.whatsapp
                }`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                WhatsApp
              </a>
            ) : null}

            {property.agent?.email ? (
              <a
                href={`mailto:${property.agent.email}`}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Email
              </a>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default AgentPropertiesDetails;
