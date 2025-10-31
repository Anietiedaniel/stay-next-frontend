import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import useAuth from '../../hooks/useAuth';
import { GoogleLogin } from '@react-oauth/google';
import API from '../../utils/axios';
import GlowingRealEstateLoader from '../../utils/loader'; // adjust path if needed

const Login = () => {
  const navigate = useNavigate();
  const { login, fetchUser } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const redirectByRole = (role) => {
    if (!role) return navigate('/');
    if (role === 'visitor') navigate('/visitor-dashboard/overview');
    else if (role === 'agent') navigate('/agent-dashboard/overview');
    else if (role === 'handyman') navigate('/handyman-dashboard/overview');
    else if (role === 'superadmin') navigate('/super-admin-dashboard/overview');
    else navigate('/');
  };

  // --- Email/Password Login ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError([]);
    setLoading(true);

    try {
      const user = await login(formData);
      await fetchUser();
      redirectByRole(user?.role);
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg) setError([msg]);
      else if (err.response?.data?.errors) {
        setError(err.response.data.errors.map((e) => e.message));
      } else setError(['Unable to sign in. Please try again.']);
    } finally {
      setLoading(false);
    }
  };

  // --- Google Login ---
  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      setError(['Google sign-in failed']);
      return;
    }

    setLoading(true);
    setError([]);

    try {
      const res = await API.post('/auth/google', { token: credentialResponse.credential });
      const user = res.data.user;

      await fetchUser();
      redirectByRole(user.role);
    } catch (err) {
      console.log(err);
      setError(['Google login failed']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Loader */}
      {loading ? (
        <GlowingRealEstateLoader msg="Registering your account..." />
      ) : (
      <div
        className="bg-gray-200 text-white min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-realestate.jpg')" }}
      >
        <div className="bg-white shadow-lg p-6 rounded-lg max-w-md w-full z-10 backdrop-blur-sm bg-opacity-90 transition-all duration-200">
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="Logo" className="w-24 h-24 mb-2" />
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm text-center">
              Please Login to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="form-errors">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="border p-3 w-full rounded text-black"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              disabled={loading}
            />

            {/* Password Input with Eye */}
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="border p-3 w-full rounded text-black pr-10"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
              </button>
            </div>

            <div className="flex justify-between items-center text-sm">
              <Link to="/forgot-password" className="text-green-600 hover:underline">
                Forgot Password?
              </Link>
              <Link to="/register" className="text-green-600 hover:underline">
                Create New Account
              </Link>
            </div>

            <div id="form-errors" className="space-y-1">
              {error.map((msg, i) => (
                <p key={i} className="text-red-500 text-sm" role="alert">
                  {msg}
                </p>
              ))}
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 w-full rounded hover:bg-green-700 transition duration-200 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
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
                onError={() => setError(['Google sign-in failed'])}
                useOneTap
                text="continue_with"
              />
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Sign in quickly with Google
              </p>
            </div>
          </div>
        </div>
        </div>
      )}
    </>
  );
};

export default Login;
