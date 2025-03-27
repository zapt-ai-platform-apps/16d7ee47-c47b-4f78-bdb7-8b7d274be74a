import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';

const Navbar = ({ resources }) => {
  const [showResources, setShowResources] = useState(false);
  const currentSeason = useGameStore(state => state.currentSeason);
  const currentEra = useGameStore(state => state.currentEra);
  const day = useGameStore(state => state.day);
  const advanceDay = useGameStore(state => state.advanceDay);
  
  return (
    <div className="bg-white shadow-md p-3">
      <div className="max-w-screen-md mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold text-[color:var(--primary)]">
            Snowverse: Railway Expansion
          </h1>
          <div className="flex text-xs space-x-3 text-gray-600">
            <span>{currentEra.name}</span>
            <span>•</span>
            <span>{currentSeason.name}</span>
            <span>•</span>
            <span>Day {day}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Button 
              onClick={() => setShowResources(!showResources)}
              variant="secondary"
              size="sm"
            >
              Resources
            </Button>
            
            {showResources && resources && (
              <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-lg p-3 z-10 w-64">
                <h3 className="font-semibold mb-2 border-b pb-1">Resources</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(resources).map(([resource, amount]) => (
                    <div key={resource} className="flex items-center">
                      <span className="capitalize">{resource}:</span>
                      <span className="ml-1 font-medium">{Math.floor(amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <Button onClick={advanceDay} variant="primary" size="sm">
            Next Day
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;