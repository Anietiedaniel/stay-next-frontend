import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../../utils/axios";
import useAuth from "../../hooks/useAuth";

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying your email...");
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const token = params.get("token");
    if (!token) {
      setStatus("invalid");
      setMessage("⚠️ Invalid or missing token.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await API.get(`/auth/verify-email?token=${token}`, { signal });
        setStatus("success");
        setMessage(res.data.message || "✅ Email verified successfully!");

        // Update frontend user context
        updateUser((prev) => ({
          ...prev,
          isVerified: true,
          isNewUser: true, // keep if applicable
        }));

        setTimeout(() => {
          navigate("/set-role", { replace: true });
        }, 1000);
      } catch (error) {
        if (error.name !== "CanceledError" && !signal.aborted) {
          setStatus("failed");
          setMessage(
            error.response?.data?.message ||
              "❌ Verification failed. The token might be invalid or expired."
          );
        }
      }
    };

    if (status === "verifying") {
      verifyEmail();
    }

    return () => {
      controller.abort();
    };
  }, [params, navigate, status, updateUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Email Verification</h2>

        {status === "verifying" && <p className="text-blue-600 animate-pulse">{message}</p>}
        {status === "success" && <p className="text-green-700 font-semibold mb-4">{message}</p>}
        {status === "failed" && <p className="text-red-600">{message}</p>}
        {status === "invalid" && <p className="text-yellow-600">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyEmail;
