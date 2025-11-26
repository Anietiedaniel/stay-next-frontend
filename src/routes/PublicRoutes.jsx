// src/routes/publicRoutes.js
import MainLayout from '../layouts/MainLayout';

import HomePage from '../pages/publicPages/Homepage';
import PropertiesPage from '../pages/publicPages/Propertiespage';
import SearchResultsPage from '../pages/publicPages/SearchResults';
import PurposePage from '../pages/publicPages/purposePage';
import FavoritesPage from '../pages/publicPages/Favourites';
import GuidesPage from '../pages/publicPages/Guides';
import AgentPage from '../pages/publicPages/Agentpage';
import AgentListings from '../sections/agentsections/AgentListing';
import AgentPropertiesDetails from '../sections/agentsections/AgentPropertiesDetails';
import ProfilePage from '../pages/publicPages/Workersprofile';
import ServicesPage from '../pages/publicPages/ServicesPage';
import ProfessionalsPage from '../pages/publicPages/Professional'
import AboutUsPage from '../pages/publicPages/Referral'
import NotFoundPage from '../pages/publicPages/NotFound';


const publicRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'find-agents', element: <AgentPage /> },
      { path: 'properties', element: <PropertiesPage /> },
      {path: 'search', element: <SearchResultsPage />},
      {path: 'purpose', element: <PurposePage />},
      { path: 'profile/:workerId', element: <ProfilePage /> },
      { path:"/agents/:id/listings", element:<AgentListings />},
      {path:"/properties/:id", element:<AgentPropertiesDetails />},
      { path: 'services', element: <ServicesPage /> },
      {path: 'guides', element: <GuidesPage /> },
      {path: 'favorites', element: <FavoritesPage /> },
      {path: 'building', element: <ProfessionalsPage /> },
      {path: 'about', element: <AboutUsPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
];

export default publicRoutes;
