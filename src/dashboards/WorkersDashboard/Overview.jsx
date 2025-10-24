import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OverviewHome from './overview/OverviewHome';
import Earnings from './overview/Earnings';
import RecentApplications from './overview/RecentApplications';
import Appointments from './overview/RecentAppointments';
import RecentProperties from './overview/RecentProperties';
import Messages from './overview/RecentMessages';

const Overview = () => {
  return (
    <div className="p-4">
      <Routes>
        <Route index element={<OverviewHome />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="properties" element={<RecentProperties />} />
        <Route path="applications" element={<RecentApplications />} />
        <Route path="appointments" element={<Appointments />} /> 
        <Route path="messages" element={<Messages />} />
      </Routes>
    </div>
  );
};

export default Overview;
