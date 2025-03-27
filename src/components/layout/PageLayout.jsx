import React from 'react';
import Navbar from './Navbar';
import ZaptBadge from '@/components/common/ZaptBadge';

const PageLayout = ({ children, currentSeason = null, resources = null }) => {
  // Get color filter based on season
  const getSeasonFilter = () => {
    if (!currentSeason) return '';
    return currentSeason.visualEffects.color_filter;
  };

  return (
    <div 
      className="min-h-screen h-full flex flex-col"
      style={{ 
        backgroundColor: 'var(--background)',
        boxShadow: `inset 0 0 0 2000px ${getSeasonFilter()}`
      }}
    >
      <Navbar resources={resources} />
      <main className="flex-1 p-4 md:p-6 max-w-screen-md mx-auto w-full">
        {children}
      </main>
      <ZaptBadge />
    </div>
  );
};

export default PageLayout;