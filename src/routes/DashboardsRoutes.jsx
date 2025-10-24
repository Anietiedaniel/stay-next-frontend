import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import SuperAdminDashboard from "../dashboards/SuperAdmin/SuperAdminDashboard";
import AdminManagement from "../dashboards/SuperAdmin/AdminManagement";
import AgentManagement from "../dashboards/SuperAdmin/AgentManagement";

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

// ================== HANDYMAN DASHBOARD ==================
import WorkerDashboard from "../dashboards/WorkersDashboard/WorkersDashboard";
import WorkerOverview from "../dashboards/WorkersDashboard/Overview";
import WorkerProjects from "../dashboards/WorkersDashboard/Projects";
import WorkerClients from "../dashboards/WorkersDashboard/Clients";
import WorkerAgents from "../dashboards/WorkersDashboard/Agents";
import WorkerPayments from "../dashboards/WorkersDashboard/Payments";
import WorkerSettings from "../dashboards/WorkersDashboard/Settings";

// ================== VISITOR DASHBOARD ==================
import VisitorDashboard from "../dashboards/VisitorDashboard/VisitorDashboard";
import VisitorOverview from "../dashboards/VisitorDashboard/Overview";
import VisitorProperties from "../dashboards/VisitorDashboard/Properties";
import VisitorServices from "../dashboards/VisitorDashboard/Workers";
import VisitorSettings from "../dashboards/VisitorDashboard/Settings";
import VisitorPayments from "../dashboards/VisitorDashboard/Payments";
import VisitorAgents from "../dashboards/VisitorDashboard/Agents";

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
      { path: "agents/", element: <AgentManagement /> },
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

  // ===== Handyman =====
  {
    path: "handyman-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["handyman"]}>
        <WorkerDashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="overview" replace /> },
      { path: "overview/*", element: <WorkerOverview /> },
      { path: "projects/*", element: <WorkerProjects /> },
      { path: "clients/*", element: <WorkerClients /> },
      { path: "agents/*", element: <WorkerAgents /> },
      { path: "payments/*", element: <WorkerPayments /> },
      { path: "settings/*", element: <WorkerSettings /> },
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
      { path: "workers/*", element: <VisitorServices /> },
      { path: "agents/*", element: <VisitorAgents /> },
      { path: "settings/*", element: <VisitorSettings /> },
      { path: "payments/*", element: <VisitorPayments /> },
    ],
  },
];

export default dashboardRoutes;
