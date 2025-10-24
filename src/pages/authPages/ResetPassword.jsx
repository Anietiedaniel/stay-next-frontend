import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import useAuth from "../../hooks/useAuth";

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const { token } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const modalTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
    };
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError([]);
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError(["Passwords do not match"]);
      return;
    }

    setLoading(true);
    setModalMessage("Resetting your password...");
    setShowModal(true);

    try {
      await resetPassword({ token, newPassword: formData.password });
      setShowModal(false);
      setSuccess("Password reset successful! Redirecting to login...");
      modalTimeoutRef.current = setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setShowModal(false);
      const msg = err.response?.data?.message || "Failed to reset password.";
      setError([msg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="bg-gray-200 text-white min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-realestate.jpg')" }}
      >
        <div className="bg-white shadow-lg p-6 rounded-lg max-w-md w-full z-10 backdrop-blur-sm bg-opacity-90 transition-all duration-200">
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="Logo" className="w-24 h-24 mb-2" />
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Reset Password
            </h2>
            <p className="text-gray-500 text-sm text-center">
              Enter and confirm your new password
            </p>
          </div>

          {success && (
            <p className="text-green-600 text-center text-sm font-semibold mb-3">
              {success}
            </p>
          )}
          {error.length > 0 && (
            <div className="space-y-1 mb-3">
              {error.map((msg, i) => (
                <p key={i} className="text-red-500 text-sm text-center" role="alert">
                  {msg}
                </p>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="New password"
                className="border p-3 w-full rounded text-black"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                className="border p-3 w-full rounded text-black"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 w-full rounded hover:bg-green-700 transition duration-200 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <div className="flex justify-center text-sm mt-2">
              <Link to="/login" className="text-green-600 hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
              {modalMessage}
            </h3>
            <div className="flex justify-center">
              <svg
                className="animate-spin h-10 w-10 text-green-600"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </div>
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
              Please wait — we are updating your password.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
