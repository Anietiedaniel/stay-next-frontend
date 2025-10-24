import React, { useState } from 'react';
import PageHeader from '../../sections/Servicesections/PageHeader';
import WorkersSection from '../../sections/Servicesections/workersSection';
import WorkShowcase from '../../sections/Servicesections/WorkShowcase';
import '../../styles/globalStyles.css';

const allWorkers = [
  {
    id: 1,
    name: 'John Doe',
    profession: 'Bricklayer',
    experience: 5,
    location: 'Lagos',
    image: 'https://randomuser.me/api/portraits/men/12.jpg',
    whatsapp: '+2347012345678',
  },
  {
    id: 2,
    name: 'Grace Smith',
    profession: 'Plumber',
    experience: 4,
    location: 'Abuja',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
    whatsapp: '+2348098765432',
  },
  {
    id: 3,
    name: 'Samuel Kelvin',
    profession: 'Electrician',
    experience: 7,
    location: 'Port Harcourt',
    image: 'https://randomuser.me/api/portraits/men/36.jpg',
    whatsapp: '+2348034567890',
  },
  {
    id: 4,
    name: 'Jane Williams',
    profession: 'Architect',
    experience: 10,
    location: 'Lagos',
    image: 'https://randomuser.me/api/portraits/women/55.jpg',
    whatsapp: '+2348023456789',
  },
];

const ServicesPage = () => {
  const [selectedProfession, setSelectedProfession] = useState('All');

  const filteredWorkers =
    selectedProfession === 'All'
      ? allWorkers
      : allWorkers.filter((w) => w.profession === selectedProfession);

  return (
    <div className="px-3">
      <PageHeader />
      <WorkersSection />
      <WorkShowcase/>
    </div>
  );
};

export default ServicesPage;
