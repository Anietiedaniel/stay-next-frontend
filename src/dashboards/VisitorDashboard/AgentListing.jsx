import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AGENTAPI from "../../utils/agentaxios";
import useAuth from "../../hooks/useAuth";

export default function AgentProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [agent, setAgent] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false); // Track connection status
  const [hovered, setHovered] = useState(false); // Track hover on body

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount || 0);

  useEffect(() => {
    if (!user) return;

    const fetchAgentProfile = async () => {
      try {
        setLoading(true);
        const res = await AGENTAPI.get(`/agents/properties/${id}`);
        const { agent: rawAgent, properties: rawProperties } = res.data;

        const agentData = {
          _id: rawAgent._id,
          name: rawAgent.user?.name || "Agent Name",
          phone: rawAgent.profile?.phone || "",
          profileImage: rawAgent.profile?.profileImage || rawAgent.user?.profileImage || "",
          coverImage: rawAgent.profile?.coverImage || "",
          state: rawAgent.profile?.state || "Unknown",
          bio: rawAgent.profile?.otherInfo || "",
          soldCount: rawAgent.profile?.sales?.total || 0,
          rentedCount: rawAgent.profile?.rented?.total || 0,
        };

        setAgent(agentData);
        setProperties(rawProperties || []);
      } catch (err) {
        console.error("❌ Error fetching agent data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgentProfile();
  }, [id, user]);

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg font-semibold text-gray-700">
          Please{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            login
          </span>{" "}
          to view this profile.
        </p>
      </div>
    );

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading profile...
      </div>
    );

  if (!agent)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Agent not found.
      </div>
    );

  const handleCall = () => {
    if (!connected) return;
    if (!agent.phone) return alert("Phone number not available");
    window.location.href = `tel:${agent.phone}`;
  };

  const handleConnect = () => {
    setConnected(true); // Simulate connection
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="max-w-[1000px] mx-auto">
        {/* Cover Image */}
        <div className="relative w-full h-60 md:h-52 bg-gradient-to-r from-green-700 via-green-500 to-green-400 rounded-b-2xl shadow-lg">
          <img
            src={
              agent.coverImage ||
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0"
            }
            alt="cover"
            className="w-full h-full object-cover opacity-60 rounded-b-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-b-2xl"></div>

          {/* Profile Photo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:-translate-x-[460px] -translate-y-20">
            <img
              src={
                agent.profileImage ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt={agent.name}
              className="w-36 h-36 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Agent Info */}
        <div className="mt-20 px-6 md:px-0">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pb-6 border-b">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{agent.name}</h1>
              <p className="text-gray-600 mt-1">{agent.bio}</p>
              <div className="mt-2 text-gray-700 flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <span>
                  <i className="fa fa-map-marker-alt text-green-600 mr-1"></i>
                  {agent.state}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-4 md:mt-0 justify-center md:justify-end">
              <button
                onClick={() => navigate(-1)}
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
              >
                <i className="fa fa-arrow-left mr-2"></i> Back
              </button>

              {/* Connect / Chat Button */}
              <button
                onClick={connected ? null : handleConnect}
                className={`px-5 py-2 rounded-lg ${
                  connected
                    ? "bg-white border border-green-600 text-green-600 hover:bg-green-50"
                    : "bg-green-600 text-white hover:bg-green-700"
                } font-semibold transition flex items-center gap-2`}
              >
                <i className={`fa ${connected ? "fa-comments" : "fa-user-plus"}`}></i>
                {connected ? "Chat" : "Connect"}
              </button>

              {/* Call Button (hover on body enables if connected) */}
              <button
                onClick={handleCall}
                className={`px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold flex items-center gap-2 transition ${
                  connected && hovered
                    ? "hover:bg-blue-700 opacity-100 cursor-pointer"
                    : "opacity-40 cursor-not-allowed"
                }`}
                disabled={!connected || !hovered}
              >
                <i className="fa fa-phone"></i> Call
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center md:justify-start gap-6 py-6">
            <div className="bg-white shadow-lg rounded-xl px-6 py-4 text-center w-40">
              <p className="text-2xl font-bold text-green-700">{agent.soldCount}</p>
              <p className="text-gray-600 text-sm">Sold Properties</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl px-6 py-4 text-center w-40">
              <p className="text-2xl font-bold text-blue-700">{agent.rentedCount}</p>
              <p className="text-gray-600 text-sm">Rented</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl px-6 py-4 text-center w-40">
              <p className="text-2xl font-bold text-gray-800">{properties.length}</p>
              <p className="text-gray-600 text-sm">Active Listings</p>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="mt-10">
            {properties.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 text-gray-500 italic mb-20">
                <i className="fa fa-box-open text-5xl text-gray-400"></i>
                <p>No active listings for {agent.name}.</p>
              </div>
            ) : (
              <div className="mb-20">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Listings by {agent.name}
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((p) => (
                    <div
                      key={p._id}
                      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border"
                    >
                      <div className="relative">
                        <img
                          src={p.images?.[0] || "https://via.placeholder.com/400"}
                          alt={p.title}
                          className="h-52 w-full object-cover"
                        />
                        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
                          {p.transactionType}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-900">{p.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{p.description || ""}</p>
                        <div className="mt-2">
                          <p className="text-green-600 font-semibold">{formatPrice(p.price)}</p>
                          <p className="text-gray-500 text-sm">{p.location}</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-gray-50 border-t flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          <i className="fa fa-calendar-alt mr-1"></i>
                          {new Date(p.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => navigate(`/properties/${p._id}`)}
                          className="text-sm text-white bg-green-600 px-3 py-1 rounded-md hover:bg-green-700 transition"
                        >
                          <i className="fa fa-eye mr-1"></i> View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
