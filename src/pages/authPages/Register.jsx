import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import API from "../../utils/axios";
import AGENTAPI from "../../utils/agentaxios";
import logo from "../../assets/images/logo.png";
import LoadingModal from "../../utils/loader";

const Register = () => {
const navigate = useNavigate();
const location = useLocation();

const [formData, setFormData] = useState({ name: "", email: "", password: "" });
const [error, setError] = useState([]);
const [loading, setLoading] = useState(false);
const [successMessage, setSuccessMessage] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [referralCode, setReferralCode] = useState("");

// Extract referral code from query params
useEffect(() => {
const query = new URLSearchParams(location.search);
console.log("query params: ", location.search);

const ref = query.get("ref");
if (ref) setReferralCode(ref);
}, [location.search]);

const handleChange = (e) =>
setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

// Track referral
const trackReferral = async (newUserId) => {
  console.log("Tracking referral for new user:", newUserId);
  console.log("Using referral code:", referralCode);
    if (!referralCode) return;
      try {
        const res = await AGENTAPI.post("/agents/profile/track", {
        withCredentials: true,
        refCode: referralCode,
        newUserId
      });
      console.log("Referral tracked successfully:", res.data);
      
      } catch (err) {
      console.warn("Referral tracking failed:", err.response?.data?.message || err.message);
      }
    };

// Handle normal registration
const handleSubmit = async (e) => {
e.preventDefault();
setError([]);
setSuccessMessage("");
setLoading(true);


// --- PASSWORD LENGTH VALIDATION ADDED HERE ---
    if (formData.password.length < 7) {
        setError(["Password must be at least 6 characters long."]);
        setLoading(false);
        return; // Stops execution if validation fails
    }

try {
  const res = await API.post("/auth/register", formData, { withCredentials: true });
  const newUser = res.data.user;

  if (newUser?.id) {
    await trackReferral(newUser.id);
  }
  console.log("Registration successful:", res.data);
  setSuccessMessage(res.data?.message || "Registration successful!");
  setFormData({ name: "", email: "", password: "" });
  navigate("/register-success");

} catch (err) {
  const msg = err.response?.data?.message;
  if (msg) setError([msg]);
  else if (err.response?.data?.errors) setError(err.response.data.errors.map((e) => e.message));
  else setError(["Registration failed"]);
} finally {
  setLoading(false);
  setTimeout(() => setSuccessMessage(""), 4000);
}

};

// Handle Google login
const handleGoogleSuccess = async (credentialResponse) => {
  if (!credentialResponse?.credential) {
    setError(["Google sign-in failed"]);
    return;
  }

  setLoading(true);
  setError([]);
  setSuccessMessage("");

  try {
    const res = await API.post(
      "/auth/google",
      { token: credentialResponse.credential },
      { withCredentials: true }
    );

    const user = res.data.user;
    console.log("new: ", user)

    // New user → set role
   if (user?.isNewUser === true) {
  console.log("Redirecting new Google user to set-role:", user);
  window.location.href = "/set-role";
  return;
}


    // Track referral (optional, async)
    if (user?._id && referralCode) {
      trackReferral(user._id);
    }

    // Existing user → redirect by role
    switch (user.role) {
      case "visitor":
        navigate("/visitor-dashboard/overview");
        break;
      case "agent":
        navigate("/agent-dashboard/overview");
        break;
      case "handyman":
        navigate("/handyman-dashboard/overview");
        break;
      case "superadmin":
        navigate("/super-admin-dashboard/overview");
        break;
      default:
        navigate("/");
    }
  } catch (err) {
    setError([err.response?.data?.message || "Google sign-in failed"]);
  } finally {
    setLoading(false);
  }
};


return (
<> <LoadingModal
     loading={loading}
     success={!!successMessage}
     error={error.length > 0}
message="Registering your account..."
successMessage={successMessage}
errorMessage={error.join(", ")}
/>

  <div
    className="bg-gray-200 text-white min-h-screen flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: "url('/bg-realestate.jpg')" }}
  >
    <div className="bg-white/90 dark:bg-gray-900/90 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30">
      <div className="flex flex-col items-center mb-6">
        <img src={logo} alt="Logo" className="w-24 h-24 mb-2" />
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Your Account</h2>
      </div>

      {error.length > 0 && (
        <div className="space-y-1 mb-4 text-center">
          {error.map((msg, i) => (
            <p key={i} className="text-red-500 text-sm font-medium">{msg}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 w-full rounded-lg text-black focus:ring-2 focus:ring-green-500 outline-none"
          required
          disabled={loading}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 w-full rounded-lg text-black focus:ring-2 focus:ring-green-500 outline-none"
          required
          disabled={loading}
        />
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg text-black pr-10 focus:ring-2 focus:ring-green-500 outline-none"
            required
            disabled={loading}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
          </button>
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition duration-200 ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
          disabled={loading}
        >
          Register
        </button>
      </form>

      <div className="text-center mt-4">
        <Link to="/login" className="text-sm text-green-600 hover:underline font-medium">
          Already have an account? Login
        </Link>
      </div>

      <div className="mt-6 flex flex-col items-center space-y-3">
        <div className="flex items-center justify-center my-3 w-full">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError(["Google sign-in failed"])}
          useOneTap
          text="continue_with"
        />
      </div>
    </div>
  </div>
</>

);
};

export default Register;
