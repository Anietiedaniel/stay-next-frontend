import React from 'react';
import ScrollToTop from '../utils/autotop';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Outlet } from 'react-router-dom';

{/* Header and Footer are common across all pages */}
const MainLayout = () => {
  return (
    <div className="">
      <ScrollToTop />
      <Header />
      <main className="">
        <Outlet /> {/* All pages will be injected here */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
