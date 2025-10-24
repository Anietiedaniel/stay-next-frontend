import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../utils/axios';
import logo from '../../assets/images/logo.png';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
  });

  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const modalTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ email: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError([]);
    setLoading(true);

    try {
      // Replace with your forgot password endpoint
      const res = await API.post('/auth/forgot-password', { email: formData.email });

      setModalMessage(res.data?.message || 'Password reset email sent!');
      setShowModal(true);

      modalTimeoutRef.current = setTimeout(() => {
        setShowModal(false);
        navigate('/login');
      }, 3000);
    } catch (err) {
      const msg = err.response?.data?.message;
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.map((e) => e.message));
      } else {
        setError([msg || 'Failed to send password reset email']);
      }
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
        <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg max-w-md w-full z-10 backdrop-blur-sm bg-opacity-90 transition-all duration-200">
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="Logo" className="w-24 h-24 mb-2" />
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
              Forgot Password
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mt-2 text-sm">
              Enter your email to receive reset instructions
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="form-errors">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-3 w-full rounded text-black"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              disabled={loading}
            />

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
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="text-center mt-4 cursor-pointer text-green-600">
            <Link to="/login" className="text-sm text-green-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        aria-hidden={!showModal}
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
          showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            showModal ? 'opacity-50' : 'opacity-0'
          }`}
        />
        <div
          role="status"
          aria-live="polite"
          className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full mx-4 transform transition-all duration-300 ${
            showModal ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
            {modalMessage}
          </h3>
          <div className="flex justify-center">
            <svg
              className="animate-spin h-10 w-10"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
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
            Please check your inbox.
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
