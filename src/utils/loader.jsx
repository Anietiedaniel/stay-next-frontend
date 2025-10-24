import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AGENTAPI from "../utils/agentaxios";
import LoadingModal from "../utils/loader"; // import the loader

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

  // ===== 🌀 Show Custom Loader While Loading =====
  if (loading || verifLoading) {
    return (
      <LoadingModal
        loading={true}
        message="Authenticating... Please wait"
      />
    );
  }

  // ===== 🚫 Not Authenticated =====
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ===== 🧭 New User Setup =====
  if (
    user?.isNewUser &&
    role !== "superadmin" &&
    role !== "admin" &&
    location.pathname !== "/set-role"
  ) {
    return <Navigate to="/set-role" replace />;
  }

  // ===== 🔐 Role-Based Access Control =====
  if (allowedRoles.length && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ===== 🧾 Agent Verification Flow =====
  if (role === "agent") {
    // Pending or Rejected → redirect to policy
    if (
      (verificationStatus === "pending" || verificationStatus === "rejected") &&
      location.pathname !== "/policy" &&
      location.pathname !== "/agent-verification"
    ) {
      return <Navigate to="/policy" replace />;
    }

    // ✅ Verified agent → go to overview if base dashboard route
    if (
      verificationStatus === "verified" &&
      location.pathname === "/agent-dashboard"
    ) {
      return <Navigate to="/agent-dashboard/overview" replace />;
    }
  }

  // ===== ✅ Render Content =====
  return children;
};

export default ProtectedRoute;
