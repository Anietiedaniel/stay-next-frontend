import React from 'react';
import HeroSection from '../../sections/homesections/Herosection';
import TrustedAgentSection from '../../sections/homesections/TrustedAgentSection';
import ImageSlider from '../../sections/homesections/imageSlider';
import Houselisting from '../../sections/homesections/houselisting';
import Agencylogo from '../../sections/homesections/propertySlider';

function HomePage() {
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <HeroSection />
      <TrustedAgentSection />
      <ImageSlider />
      <Houselisting />
      <Agencylogo />
    </div>
  );
}

export default HomePage;
