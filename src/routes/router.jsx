import { createBrowserRouter } from 'react-router-dom';
import publicRoutes from './PublicRoutes';
import authRoutes from './AuthRoutes';
import dashboardRoutes from './DashboardsRoutes';

const router = createBrowserRouter([
  ...publicRoutes,
  ...authRoutes,
  ...dashboardRoutes,
]);

export default router;
