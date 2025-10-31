import React from 'react';
import './'; // We'll define this below

const Loader = ({ text = 'Loading...' }) => {
  return (
    <div className="loader-container">
      <div className="loader-orbit">
        <div className="loader-core">
          <div className="loader-glow"></div>
          <img
            src="https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
            alt="Stunning visual"
            className="loader-image"
          />
          <div className="loader-ring"></div>
          <div className="loader-pulse"></div>
        </div>
      </div>

      <p className="loader-text">{text}</p>
    </div>
  );
};

export default Loader;