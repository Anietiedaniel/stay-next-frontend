import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/images/logo.png";
import LoadingModal from "../../utils/loader"; 
import { NIGERIA_STATES } from "../../utils/states";

const VisitorProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone) {
      setErrorMessage("Phone number is required");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      const res = await axios.post(
        "http://localhost:3006/api/clients/create",
        { phone, state },
        { headers: { "x-user-id": user?._id } }
      );

      setSuccessMessage("Profile created successfully!");
      console.log("✅ Visitor profile created:", res.data.profile);

      setTimeout(() => navigate("/visitor-dashboard/overview", { replace: true }), 1000);
    } catch (err) {
      console.error("🔥 Error creating profile:", err);
      setErrorMessage(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(""), 4000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 relative">
      <LoadingModal
        loading={loading}
        success={!!successMessage}
        error={!!errorMessage}
        message="Saving your profile..."
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

      <img src={logo} alt="Company Logo" className="w-32 h-32 mb-4" />
      <h2 className="text-2xl md:text-3xl font-bold text-gray-700 text-center mb-2">
        Let’s Get You Started
      </h2>
      <p className="text-gray-500 text-center mb-6">
        Just a few details to personalize your experience.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md flex flex-col gap-4"
      >
        <div>
          <label className="block text-gray-700 mb-1">Phone Number *</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g., +2348012345678"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={loading}
          >
            <option value="">Select your state</option>
            {NIGERIA_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className={`bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default VisitorProfilePage;
