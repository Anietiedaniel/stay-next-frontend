import React from "react";
import { useNavigate } from "react-router-dom";

function AgentCard({ _id, profileImage, agencyLogo, name, state, rent, sale }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden border hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      {/* Top Section with Agent Profile */}
      <div className="flex items-center p-5">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500 shadow-md">
          <img
            src={profileImage}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="ml-4 flex-1">
          <h2 className="text-lg font-bold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-500">
            Serves in{" "}
            <span className="font-semibold text-green-600">{state}</span>
          </p>
        </div>
      </div>


      {/* Agency Section */}
      <div className="flex justify-center items-center p-4 bg-white border-t h-14">
        {agencyLogo ? (
          <img
            src={agencyLogo}
            alt="Agency Logo"
            className="h-10 object-contain"
          />
        ) : (
          <p className="text-gray-500 italic text-sm">Independent Agent</p>
        )}
      </div>

      {/* CTA Button */}
      <div className="px-5 pb-5">
        <button
          onClick={() => navigate(`/agents/${_id}/listings`)}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

export default AgentCard;
