import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import SuperAdminDashboard from "../dashboards/SuperAdmin/SuperAdminDashboard";
import AdminManagement from "../dashboards/SuperAdmin/AdminManagement";

// ================== ADMIN DASHBOARD ==================
import AdminDashboard from "../dashboards/AdminDashboard/AdminDashboard";
import AdminOverview from "../dashboards/AdminDashboard/Overview";
import AdminAgentManagement from "../dashboards/AdminDashboard/AgentManagement";

// ================== AGENT DASHBOARD ==================
import AgentDashboard from "../dashboards/AgentDashboard/AgentDashboard";
import AgentOverview from "../dashboards/AgentDashboard/Overview";
import AgentProperties from "../dashboards/AgentDashboard/Properties";
import AgentClients from "../dashboards/AgentDashboard/Clients";
import AgentSettings from "../dashboards/AgentDashboard/Settings";
import AgentPayments from "../dashboards/AgentDashboard/Payment";


// ================== VISITOR DASHBOARD ==================
import VisitorDashboard from "../dashboards/VisitorDashboard/VisitorDashboard";
import VisitorOverview from "../dashboards/VisitorDashboard/Overview";
import VisitorProperties from "../dashboards/VisitorDashboard/Properties";

// ================== ROUTES ==================
const dashboardRoutes = [


  // ===== Super Admin =====
  {
    path: "super-admin-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["superadmin"]}>
        <SuperAdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="overview" replace /> },
      { path: "overview/*", element: <AdminOverview /> },
      { path: "admins/", element: <AdminManagement /> },
    ],
  },
  // ===== Admin =====
  {
    path: "admin-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="overview" replace /> },
      { path: "overview/*", element: <AdminOverview /> },
      { path: "agents/", element: <AdminAgentManagement /> },
    ],
  },

  // ===== Agent =====
  {
    path: "agent-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["agent"]}>
        <AgentDashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="overview" replace /> },
      { path: "overview/*", element: <AgentOverview /> },
      { path: "properties/*", element: <AgentProperties /> },
      { path: "clients/*", element: <AgentClients /> },
      { path: "settings/*", element: <AgentSettings /> },
      { path: "payments/*", element: <AgentPayments /> },
    ],
  },


  // ===== Visitor =====
  {
    path: "visitor-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["visitor"]}>
        <VisitorDashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="overview" replace /> },
      { path: "overview/*", element: <VisitorOverview /> },
      { path: "properties/*", element: <VisitorProperties /> },
    ],
  },
];

export default dashboardRoutes;
