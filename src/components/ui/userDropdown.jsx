import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const UserDropdown = ({ user, logout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDashboardPath = () => {
    switch (user?.role) {
      case "superadmin":
        return "/super-admin-dashboard";
      case "admin":
        return "/admin-dashboard";
      case "agent":
        return "/agent-dashboard";
      case "visitor":
        return "/visitor-dashboard";
      case "handyman":
        return "/handyman-dashboard";
      default:
        return "/";
    }
  };

  const allowedRoles = ["superadmin", "admin", "agent", "visitor", "handyman"];

  // Determine which profile image to show
  const profileImage =
    user?.role === "agent" && user?.verification?.nationalId
      ? user.verification.nationalId
      : user?.profileImage;

  return user ? (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 focus:outline-none"
      >
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-6 h-6 rounded-full object-cover"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-lg text-gray-600">
            <i className="fas fa-user-circle"></i>
          </div>
        )}
        {user?.name}
        <i className="fas fa-chevron-down text-xs"></i>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-200 
                        rounded-lg shadow-xl w-44 z-50 overflow-hidden">
          {user?.role && allowedRoles.includes(user.role) && (
            <Link
              to={getDashboardPath()}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm font-semibold text-green-600 
                         hover:bg-green-50"
            >
              🚀 My Dashboard
            </Link>
          )}
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 
                       hover:bg-red-50 border-t"
          >
            ⏻ Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <Link
      to="/login"
      className="login-glow flex items-center px-4 py-1 
                 font-bold text-white rounded-md bg-green-600 
                 animate-pulse hover:bg-green-700 shadow-lg"
    >
      <i className="fas fa-user mr-2"></i> Login
    </Link>
  );
};

export default UserDropdown;
