import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import API from "../../utils/axios";
import logo from "../../assets/images/logo.png";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // ✅ Show check email
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Manual Register
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError([]);
    setSuccessMessage("");
    setLoading(true);

    try {
      const res = await API.post("/auth/register", formData, { withCredentials: true });
      if (res.data?.message) {
        setSuccessMessage(res.data.message); // Show "check your email" message
      }
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg) setError([msg]);
      else if (err.response?.data?.errors) {
        setError(err.response.data.errors.map((e) => e.message));
      } else {
        setError(["Registration failed"]);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Login
  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      setError(["Google sign in failed"]);
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

      if (res.data?.message) {
        setSuccessMessage(res.data.message); // Show "check your email" message
      }
    } catch (err) {
      setError([err.response?.data?.message || "Google sign in failed"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-gray-200 text-white min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-realestate.jpg')" }}
    >
      <div className="bg-white shadow-lg p-6 rounded-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="w-24 h-24 mb-2" />
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Create Your Account
          </h2>
        </div>

        {/* ✅ Success message */}
        {successMessage && (
          <p className="text-green-600 font-semibold mb-4 text-center">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="form-errors">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="border p-3 w-full rounded text-black"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading || successMessage}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-3 w-full rounded text-black"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading || successMessage}
          />

          {/* Password Input with Eye */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="border p-3 w-full rounded text-black pr-10"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading || successMessage}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
            </button>
          </div>

          <div className="text-center mt-2">
            <Link to="/login" className="text-sm text-green-600 hover:underline">
              Already have an account? Login
            </Link>
          </div>

          {error.length > 0 && (
            <div id="form-errors" className="space-y-1">
              {error.map((msg, i) => (
                <p key={i} className="text-red-500 text-sm">{msg}</p>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 w-full rounded hover:bg-green-700 transition duration-200 disabled:opacity-60"
            disabled={loading || !!successMessage} // prevent re-submit after success
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-6">
          <div className="flex items-center justify-center my-3">
            <hr className="flex-1 border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>
          <div className="flex flex-col space-y-3 items-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError(["Google sign in failed"])}
              useOneTap
              text="continue_with"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
