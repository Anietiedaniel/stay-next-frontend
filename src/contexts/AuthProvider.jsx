import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import API from "../utils/axios";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [role, setRole] = useState(user?.role || "");
  const [loading, setLoading] = useState(false); // <-- start false to render immediately

  const isAuthenticated = !!user;

  // Fetch current user in background
  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/getMe");
      const u = res.data.user || null;
      setUser(u);
      setRole(u?.role || "");
      if (u) localStorage.setItem("user", JSON.stringify(u));
      return u;
    } catch (err) {
      console.warn("fetchUser failed", err);
      setUser(null);
      setRole("");
      localStorage.removeItem("user");
      return null;
    }
  };

  useEffect(() => {
    if (!user) fetchUser(); // only fetch if not already in localStorage
  }, []);

  // Normal login
  const login = async (data) => {
    const res = await API.post("/auth/login", data);
    const u = res.data.user;
    setUser(u);
    setRole(u.role);
    localStorage.setItem("user", JSON.stringify(u));
    return u;
  };

  // Super admin login
  const superAdminLogin = async (data) => {
    const res = await API.post("/admins/login", data);
    const superAdmin = res.data.user;
    setUser(superAdmin);
    setRole(superAdmin.role);
    localStorage.setItem("user", JSON.stringify(superAdmin));
    return superAdmin;
  };

  // Logout
  const logout = async () => {
    await API.post("/auth/logout");
    setUser(null);
    setRole("");
    localStorage.removeItem("user");
  };

  // Update user
  const updateUser = (updated, callback = () => {}) => {
    if (typeof updated === "function") {
      setUser((prev) => {
        const result = updated(prev);
        const merged = { ...(prev || {}), ...(result || {}) };
        if (result && result._id) {
          setRole(result.role || "");
          localStorage.setItem("user", JSON.stringify(result));
          callback(result);
          return result;
        } else {
          setRole(merged.role || prev?.role || "");
          localStorage.setItem("user", JSON.stringify(merged));
          callback(merged);
          return merged;
        }
      });
    } else if (updated && updated._id) {
      setUser(updated);
      setRole(updated.role || "");
      localStorage.setItem("user", JSON.stringify(updated));
      callback(updated);
    } else {
      setUser((prev) => {
        const merged = { ...(prev || {}), ...(updated || {}) };
        setRole(merged.role || prev?.role || "");
        localStorage.setItem("user", JSON.stringify(merged));
        callback(merged);
        return merged;
      });
    }
  };

  // Reset password
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
      {children} {/* no more waiting on loading */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
