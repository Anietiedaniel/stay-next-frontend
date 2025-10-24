import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import API from "../utils/axios";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // =============================
  // Fetch Current User (any role)
  // =============================
  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/getMe");
      const u = res.data.user || null;
      setUser(u);
      setRole(u?.role || "");
      console.log("Fetched user:", u);
      return u;
    } catch (err) {
      console.warn("fetchUser failed", err);
      setUser(null);
      setRole("");
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =============================
  // Normal Login (user / admin)
  // =============================
  const login = async (data) => {
    const res = await API.post("/auth/login", data);
    const u = res.data.user;
    setUser(u);
    setRole(u.role);
    return u;
  };

  // =============================
  // Super Admin Login
  // =============================
  const superAdminLogin = async (data) => {
    const res = await API.post("/admins/login", data);
    const superAdmin = res.data.user;
    setUser(superAdmin);
    setRole(superAdmin.role);
    return superAdmin;
  };

  // =============================
  // Logout
  // =============================
  const logout = async () => {
    await API.post("/auth/logout");
    setUser(null);
    setRole("");
  };

  // =============================
  // Update User Info
  // =============================
  const updateUser = (updated, callback = () => {}) => {
    if (typeof updated === "function") {
      setUser((prev) => {
        const result = updated(prev); // Call the function passed to updateUser
        const merged = { ...(prev || {}), ...(result || {}) };

        // Determine if it's a full or partial update
        if (result && result._id) {
          setRole(result.role || "");
          callback(result);
          return result;
        } else {
          setRole(merged.role || prev?.role || "");
          callback(merged);
          return merged;
        }
      });
    } else if (updated && updated._id) {
      // Full user object -> replace
      setUser(updated);
      setRole(updated.role || "");
      callback(updated);
    } else {
      // Partial object -> merge
      setUser((prev) => {
        const merged = { ...(prev || {}), ...(updated || {}) };
        setRole(merged.role || prev?.role || "");
        callback(merged);
        return merged;
      });
    }
  };

  // =============================
  // Reset Password
  // =============================
  const resetPassword = async ({ token, newPassword }) => {
    const res = await API.post(`/auth/reset-password/${token}`, { newPassword });
    return res.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        login,
        superAdminLogin,
        logout,
        loading,
        fetchUser,
        updateUser,
        resetPassword,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
