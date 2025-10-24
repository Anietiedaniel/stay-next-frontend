import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OverviewHome from './overview/OverviewHome';
import Earnings from './overview/Earnings';
import RecentProperties from './overview/RecentProperties';
import ClientMessages from './overview/RecentMessages';
// import RecentApplications from './overview/RecentApplications';
// import Appointments from './overview/RecentAppointments';


const Overview = () => {
  return (
    <div className="p-4">
      <Routes>
        <Route index element={<OverviewHome />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="properties" element={<RecentProperties />} />
        <Route path="messages" element={<ClientMessages />} />
        {/* <Route path="applications" element={<RecentApplications />} />
        <Route path="appointments" element={<Appointments />} /> 
         */}
      </Routes>
    </div>
  );
};

export default Overview;
