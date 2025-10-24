import { useState } from "react";
import  useAuth  from "../../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const { token } = useParams(); // Get token from URL params
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword({ token, password });
      setSuccess("Password reset successful! You can now login.");
      setTimeout(() => navigate("/login"), 2000); // Redirect after success
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-gray-900 to-black px-4">
      <div className="w-80 max-w-md p-8 rounded-2xl backdrop-blur-3xl bg-gray-200/80 border border-green-200 shadow-2xl transition-all hover:scale-105 z-10 hover:shadow-green-400/40">
        <h2 className="text-lg font-extrabold text-center text-white mb-6">
          Reset Password
        </h2>

        {success && (
          <p className="text-green-400 text-center text-sm font-semibold mb-3">
            {success}
          </p>
        )}
        {error && (
          <p className="text-red-400 text-center text-sm font-semibold mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-white">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-1 bg-white/20 text-black border border-white/30 rounded-lg focus:ring-2 focus:ring-green-400"
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-white">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-1 bg-white/20 text-black border border-white/30 rounded-lg focus:ring-2 focus:ring-green-400"
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-1 text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-300"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;