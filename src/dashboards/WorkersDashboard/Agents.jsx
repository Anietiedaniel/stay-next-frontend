import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Agents from './Agents/Agents';
import AgentDetail from './Agents/AgentProfile'


const AgentPage = () => {
  return (
    <div className="p-4">
      <Routes>
        <Route index element={<Agents />} />
        <Route path=":id" element={<AgentDetail />} />      
      </Routes>
    </div>
  );
};

export default AgentPage;
