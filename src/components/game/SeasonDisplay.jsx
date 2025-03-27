import React, { useState } from 'react';
import Card from '@/components/ui/Card';

const SeasonDisplay = ({ season }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  if (!season) return null;
  
  // Icons for each season
  const seasonIcons = {
    spring: '🌱',
    summer: '☀️',
    autumn: '🍂',
    winter: '❄️'
  };
  
  return (
    <Card inkWash={true} chineseBrush={true} className="mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold flex items-center">
            <span className="mr-2">{seasonIcons[season.id]}</span>
            {season.name}
          </h3>
          <p className="text-sm text-gray-600">{season.description}</p>
        </div>
        <button 
          onClick={() => setShowDetails(!showDetails)} 
          className="text-gray-500 hover:text-gray-700 text-sm cursor-pointer"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      
      {showDetails && (
        <div className="mt-3 border-t pt-3">
          <p className="text-sm text-gray-700 italic mb-3">{season.storyText}</p>
          
          <div className="grid grid-cols-2 text-sm">
            <div>
              <span className="font-medium">Agriculture:</span> 
              <span className={`${season.effects.agriculture > 1 ? 'text-green-600' : 'text-red-600'}`}>
                {' '}×{season.effects.agriculture.toFixed(1)}
              </span>
            </div>
            <div>
              <span className="font-medium">Construction:</span> 
              <span className={`${season.effects.construction > 1 ? 'text-green-600' : 'text-red-600'}`}>
                {' '}×{season.effects.construction.toFixed(1)}
              </span>
            </div>
            <div>
              <span className="font-medium">Tourism:</span> 
              <span className={`${season.effects.tourism > 1 ? 'text-green-600' : 'text-red-600'}`}>
                {' '}×{season.effects.tourism.toFixed(1)}
              </span>
            </div>
            <div>
              <span className="font-medium">Train Speed:</span> 
              <span className={`${season.effects.train_speed > 1 ? 'text-green-600' : 'text-red-600'}`}>
                {' '}×{season.effects.train_speed.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SeasonDisplay;