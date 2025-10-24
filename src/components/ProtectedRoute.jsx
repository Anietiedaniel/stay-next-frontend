import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AGENTAPI from "../utils/agentaxios";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, role, loading } = useAuth();
  const location = useLocation();
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [verifLoading, setVerifLoading] = useState(true);

  useEffect(() => {
    const fetchVerification = async () => {
      if (!role) {
        // Role not loaded or user not authenticated → skip verification fetch
        setVerifLoading(false);
        return;
      }

      if (role === "agent") {
        try {
          const res = await AGENTAPI.get("/agents/verification/my");
          const status = res.data?.profile?.status || "pending";
          setVerificationStatus(status.toLowerCase());
        } catch (err) {
          console.error("Failed to fetch agent verification:", err);
          setVerificationStatus("pending"); // fallback
        } finally {
          setVerifLoading(false);
        }
      } else {
        // Non-agent roles → nothing to fetch
        setVerifLoading(false);
      }
    };

    fetchVerification();
  }, [role]);

  // Show loading while auth or verification data is loading
  if (loading || verifLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // Not authenticated → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // New users must set role (except superadmin and admin)
  if (user?.isNewUser && role !== "superadmin" && role !== "admin" && location.pathname !== "/set-role") {
    return <Navigate to="/set-role" replace />;
  }

  // Role-based access control
  if (allowedRoles.length && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Agent verification redirects
  if (role === "agent") {
    if (
      (verificationStatus === "pending" || verificationStatus === "rejected") &&
      location.pathname !== "/agent-verification"
    ) {
      return <Navigate to="/agent-verification" replace />;
    }
  }

  // Approved or non-agent → render children
  return children;
};

export default ProtectedRoute;
