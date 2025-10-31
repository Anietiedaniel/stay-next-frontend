import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AGENTAPI from "../../utils/agentaxios";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/images/logo.png";
import { NIGERIA_STATES } from "../../utils/states";

const AgentVerification = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const modalTimeoutRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [hasAgency, setHasAgency] = useState(false);

  // Agency fields
  const [agencyName, setAgencyName] = useState("");
  const [agencyEmail, setAgencyEmail] = useState("");
  const [agencyPhone, setAgencyPhone] = useState("");
  const [agencyLogo, setAgencyLogo] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);

  // Personal fields
  const [nationalId, setNationalId] = useState(null);
  const [previewId, setPreviewId] = useState(null);
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [otherInfo, setOtherInfo] = useState("");

  const [verificationData, setVerificationData] = useState(null);

  // Cleanup modal timers
  useEffect(() => {
    return () => {
      if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
    };
  }, []);

  // Fetch user verification info
  useEffect(() => {
    const fetchVerification = async () => {
      if (!user?._id) return;
      setLoading(true);

      try {
        const res = await AGENTAPI.get("/agents/verification/my", {
          params: { userId: user._id },
        });

        const v = res.data?.profile || null;
        setVerificationData(v);

        if (v?.status === "rejected") {
          setHasAgency(!!v.agencyName);
          setAgencyName(v.agencyName || "");
          setAgencyEmail(v.agencyEmail || "");
          setAgencyPhone(v.agencyPhone || "");
          setPhone(v.phone || "");
          setState(v.state || "");
          setOtherInfo(v.otherInfo || "");
          setPreviewLogo(v.agencyLogo || null);
          setPreviewId(v.nationalId || null);
        }

        if (v?.status === "approved") {
          modalTimeoutRef.current = setTimeout(() => {
            navigate("/agent-dashboard/overview", { replace: true });
          }, 1000);
        }
      } catch (err) {
        console.error("❌ Error fetching verification:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVerification();
  }, [user?._id, navigate]);

  // File handlers
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setAgencyLogo(file);
    setPreviewLogo(URL.createObjectURL(file));
  };

  const handleIdChange = (e) => {
    const file = e.target.files[0];
    setNationalId(file);
    setPreviewId(URL.createObjectURL(file));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      alert("User not loaded yet. Please wait...");
      return;
    }

    if (!nationalId || !state || !phone) {
      alert("Please fill all required fields");
      return;
    }

    if (hasAgency && (!agencyName || !agencyEmail || !agencyPhone || !agencyLogo)) {
      alert("Please fill all agency details");
      return;
    }

    try {
      setLoading(true);
      setShowModal(true);
      setModalMessage("Submitting...");

      const formData = new FormData();
      formData.append("nationalId", nationalId);
      formData.append("state", state);
      formData.append("phone", phone);
      formData.append("otherInfo", otherInfo || "");

      if (hasAgency) {
        formData.append("agencyName", agencyName);
        formData.append("agencyEmail", agencyEmail);
        formData.append("agencyPhone", agencyPhone);
        formData.append("agencyLogo", agencyLogo);
      }

      const res = await AGENTAPI.post("/agents/verification/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        params: { userId: user._id },
      });

      const v = res.data?.profile || null;
      setVerificationData(v);

      setModalMessage("✅ Submitted successfully. Verification pending...");
      modalTimeoutRef.current = setTimeout(() => setShowModal(false), 3000);
    } catch (err) {
      console.error("❌ Submission failed:", err);
      setModalMessage("❌ Submission failed. Try again.");
      modalTimeoutRef.current = setTimeout(() => setShowModal(false), 2500);
    } finally {
      setLoading(false);
    }
  };

  // If verification exists — show status page
  if (verificationData) {
    const status = verificationData.status.toLowerCase();
    if (["pending", "approved", "rejected"].includes(status)) {
      const statusColors = {
        pending: "bg-yellow-100 text-yellow-700",
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
      };
      const statusMessages = {
        pending: "Your verification is under review.",
        approved: "✅ Your verification was successful!",
        rejected: "❌ Your verification was rejected. Please resubmit.",
      };

      return (
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen flex items-center justify-center p-6">
          <div className="bg-white backdrop-blur-sm bg-opacity-90 p-8 rounded-3xl shadow-xl max-w-md w-full text-center transition-all duration-300">
            <img src={logo} alt="Logo" className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Verification Status</h2>
            <div className={`p-4 rounded-lg font-semibold text-lg ${statusColors[status]}`}>
              {verificationData.status.toUpperCase()}
            </div>
            <p className="mt-4 text-gray-600">{statusMessages[status]}</p>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen flex items-center justify-center p-6">
        <div className="bg-white backdrop-blur-md bg-opacity-90 shadow-xl p-10 rounded-3xl max-w-6xl w-full transition-all duration-300">
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="Logo" className="w-24 h-24 mb-3" />
            <h2 className="text-3xl font-bold text-center text-gray-800">Agent Verification</h2>
            <p className="text-gray-500 text-sm text-center">
              Complete your verification to continue
            </p>
          </div>

          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="text-gray-700 font-semibold">Do you belong to an agency?</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
                checked={hasAgency}
                onChange={() => setHasAgency((s) => !s)}
              />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className={`grid gap-8 ${hasAgency ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 justify-items-center"}`}>
              {hasAgency && (
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-lg w-full hover:scale-[1.02] transition transform">
                  <h3 className="text-xl font-semibold text-green-700 text-center mb-4">
                    Agency Details
                  </h3>
                  <InputField label="Agency Name *" value={agencyName} setValue={setAgencyName} />
                  <InputField label="Agency Email *" value={agencyEmail} setValue={setAgencyEmail} type="email" />
                  <InputField label="Agency Phone *" value={agencyPhone} setValue={setAgencyPhone} />
                  <FileUpload label="Upload Agency Logo" file={agencyLogo} preview={previewLogo} handleChange={handleLogoChange} bgColor="green" />
                </div>
              )}

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-lg w-full max-w-md hover:scale-[1.02] transition transform">
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">Personal Information</h3>
                <InputField label="Phone *" value={phone} setValue={setPhone} />
                <SelectField label="State *" value={state} setValue={setState} options={NIGERIA_STATES} />
                <TextAreaField label="Other Info" value={otherInfo} setValue={setOtherInfo} />
                <FileUpload label="Upload National ID" file={nationalId} preview={previewId} handleChange={handleIdChange} bgColor="gray" />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading || !user?._id}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              >
                {loading ? "Submitting..." : "Submit Verification"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center animate-fade-in">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm text-center transition-transform transform scale-105">
            <p className="font-medium">{modalMessage}</p>
          </div>
        </div>
      )}
    </>
  );
};

// Reusable Inputs
const InputField = ({ label, value, setValue, type = "text" }) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-1 font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
    />
  </div>
);

const TextAreaField = ({ label, value, setValue }) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-1 font-medium">{label}</label>
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
    />
  </div>
);

const SelectField = ({ label, value, setValue, options }) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-1 font-medium">{label}</label>
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
    >
      <option value="">Select a state</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const FileUpload = ({ label, file, preview, handleChange, bgColor }) => (
  <div className="flex flex-col items-center mb-4">
    <input type="file" id={label} accept="image/*" onChange={handleChange} className="hidden" />
    <label htmlFor={label} className={`cursor-pointer bg-${bgColor}-600 hover:bg-${bgColor}-700 text-white px-4 py-2 rounded-lg shadow transition`}>
      {label}
    </label>
    {preview && (
      <img src={preview} alt={`${label} Preview`} className="mt-3 h-28 w-28 object-cover rounded-xl shadow-lg transition-all" />
    )}
  </div>
);

export default AgentVerification;
