import React from 'react';

const MobileNav = ({ menuOpen, setMenuOpen }) => {
  return (
    <div className="lg:hidden flex items-center justify-between bg-white dark:bg-gray-700 px-4 py-3 shadow">
      <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        Super Admin Dashboard
      </h1>
      <button onClick={() => setMenuOpen(!menuOpen)}>
        <i className="fas fa-bars text-xl text-gray-700 dark:text-gray-100"></i>
      </button>
    </div>
  );
};

export default MobileNav;
