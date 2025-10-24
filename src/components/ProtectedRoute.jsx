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
          setVerificationStatus("pending");
        } finally {
          setVerifLoading(false);
        }
      } else {
        setVerifLoading(false);
      }
    };

    fetchVerification();
  }, [role]);

  // ===== SHOW LOADING SCREEN =====
  if (loading || verifLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // ===== AUTH CHECK =====
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ===== NEW USER ROLE SETUP =====
  if (
    user?.isNewUser &&
    role !== "superadmin" &&
    role !== "admin" &&
    location.pathname !== "/set-role"
  ) {
    return <Navigate to="/set-role" replace />;
  }

  // ===== ROLE-BASED ACCESS CONTROL =====
  if (allowedRoles.length && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ===== AGENT VERIFICATION FLOW =====
  if (role === "agent") {
    // Unverified or rejected → go to policy
    if (
      (verificationStatus === "pending" || verificationStatus === "rejected") &&
      location.pathname !== "/policy" &&
      location.pathname !== "/agent-verification"
    ) {
      return <Navigate to="/policy" replace />;
    }

    // Verified agent — just stay wherever inside /agent-dashboard/*
    // ✅ No redirect needed since default route already points to /overview
  }

  // ===== RENDER CHILDREN =====
  return children;
};

export default ProtectedRoute;
