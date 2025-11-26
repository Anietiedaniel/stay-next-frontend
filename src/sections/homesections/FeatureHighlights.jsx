import React from 'react';
import FeatureCard from './FeatureCard';
import image1 from '../../assets/images/Tru-Estimate.png';
import image2 from '../../assets/images/Search 2.0.png';
import image3 from '../../assets/images/Map View.png';

const features = [
  {
    title: <>TruEstimate<sup className='text-xs'>TM</sup></>,
    description: "Accurately estimate property values with AI-powered insights.",
    imageUrl: image1, // using local import
  },
  {
    title: "Search 2.0",
    description: "Discover homes faster with advanced filtering and smart suggestions.",
    imageUrl: image2, // using local import
  },
  {
    title: "Map View",
    description: "Visualize listings in real time across neighborhoods and cities.",
    imageUrl: image3, // using local import
  }
];

function FeatureHighlights() {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 max-w-7xl mx-auto px-2 mt-8 md:-mt-7">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          imageUrl={feature.imageUrl}
        />
      ))}
    </div>
  );
}

export default FeatureHighlights;
