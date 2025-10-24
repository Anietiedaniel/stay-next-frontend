import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const GuestRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    // If still new → force role setup
    if (user?.isNewUser) return <Navigate to="/set-role" replace />;

    // Otherwise → send to dashboard by role
    switch (user?.role) {
      case "admin":
        return <Navigate to="/admin-dashboard/overview" replace />;
      case "agent":
        return <Navigate to="/agent-dashboard/overview" replace />;
      case "handyman":
        return <Navigate to="/handyman-dashboard/overview" replace />;
      case "visitor":
      default:
        return <Navigate to="/visitor-dashboard/overview" replace />;
    }
  }

  return children;
};

export default GuestRoute;
