import React from 'react';
import Card from '@/components/ui/Card';
import { useGameStore } from '@/store/gameStore';
import { imageAssets } from '@/utils/gameData';

const CityDetails = ({ cityId, onClose }) => {
  const city = useGameStore(state => state.cities.find(c => c.id === cityId));
  
  if (!city) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-[color:var(--primary)]">{city.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="prose max-w-none">
              <p className="text-gray-700">{city.storyBackground}</p>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card inkWash={true}>
                <h3 className="font-semibold mb-2">City Information</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Population:</span> {city.population}</div>
                  <div><span className="font-medium">Level:</span> {city.level}</div>
                  <div><span className="font-medium">Building Slots:</span> {city.buildings.length}/{city.buildingSlots}</div>
                  <div><span className="font-medium">Climate:</span> {city.climate}</div>
                  <div>
                    <span className="font-medium">Special Resources:</span>{' '}
                    {city.specialResources.map(r => r.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')).join(', ')}
                  </div>
                  <div><span className="font-medium">Point Value:</span> {city.pointValue}</div>
                </div>
              </Card>
              
              <Card inkWash={true}>
                <h3 className="font-semibold mb-2">Production</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(city.baseProduction).map(([resource, amount]) => (
                    <div key={resource}>
                      <span className="capitalize font-medium">{resource}:</span> +{amount}/day
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t">
          <button 
            onClick={onClose}
            className="w-full py-2 bg-[color:var(--primary)] text-white rounded-lg hover:bg-opacity-90 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityDetails;