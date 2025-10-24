// src/routes/authRoutes.js
import { Navigate } from 'react-router-dom';

import SuperAdminLogin from '../pages/authPages/SuperAdminLogin';
import Login from '../pages/authPages/Login';
import VerifyEmail from '../pages/authPages/VerifyEmail';
import Register from '../pages/authPages/Register';
import AdminLogin from '../pages/authPages/AdminLogin';
import ForgotPassword from '../pages/authPages/ForgotPassword';
import ResetPassword from '../pages/authPages/ResetPassword';
import AgentVerification from '../pages/authPages/AgentVerify';
import SelectRole from '../pages/authPages/selectRole';
import PolicyPage from '../pages/authpages/policyPage'
import GuestRoute from '../components/GuestRoute';
import ProtectedRoute from '../components/ProtectedRoute';

const authRoutes = [
     { 
    path: "/super-admin/login",
    element: (
      <GuestRoute>
        <SuperAdminLogin />
      </GuestRoute>
    ),
  },

  { 
    path: "/login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  { 
    path: "/register", 
    element: (
      <GuestRoute>
        <Register />
      </GuestRoute>
    ),
  },

   { 
    path: "/admin/login",
    element: (
      <GuestRoute>
        <AdminLogin />
      </GuestRoute>
    ),
  },
  {
    path: '/set-role',
    element: (
      <ProtectedRoute>
        <SelectRole />
      </ProtectedRoute>
    ),
  },

   {
    path: '/policy',
    element: (
      <ProtectedRoute>
        <PolicyPage />
      </ProtectedRoute>
    ),
  },

  {
    path: '/agent-verification',
    element: (
      <ProtectedRoute>
        <AgentVerification />
      </ProtectedRoute>
    ),
  },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password/:token', element: <ResetPassword /> },
  
{ 
  path: '/verify-email', 
  element: (
    <GuestRoute>
      <VerifyEmail />
    </GuestRoute>
  ),
},


  { path: '/unauthorized', element: <div>Unauthorized</div> },
];

export default authRoutes;
