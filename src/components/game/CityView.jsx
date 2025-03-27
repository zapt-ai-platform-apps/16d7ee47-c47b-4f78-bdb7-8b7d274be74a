import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import { buildings, imageAssets } from '@/utils/gameData';
import CityDetails from './CityDetails';

const CityView = ({ cityId }) => {
  const [showCityDetails, setShowCityDetails] = useState(false);
  
  const city = useGameStore(state => state.cities.find(c => c.id === cityId));
  const getAvailableBuildings = useGameStore(state => state.getAvailableBuildings);
  const buildingInProgress = useGameStore(state => 
    state.buildingInProgress.filter(b => b.cityId === cityId)
  );
  const startBuilding = useGameStore(state => state.startBuilding);
  
  if (!city) {
    return <div className="text-center py-10">City not found</div>;
  }
  
  const availableBuildings = getAvailableBuildings();
  
  // Filter out buildings that are already built in this city
  const buildableBuildings = availableBuildings.filter(building => 
    !city.buildings.includes(building.id)
  );
  
  // Calculate current production
  const calculateProduction = () => {
    let production = { ...city.baseProduction };
    
    city.buildings.forEach(buildingId => {
      const building = buildings.find(b => b.id === buildingId);
      if (building) {
        Object.entries(building.production).forEach(([resource, amount]) => {
          production[resource] = (production[resource] || 0) + amount;
        });
      }
    });
    
    return production;
  };
  
  const production = calculateProduction();
  
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div className="text-center flex-1">
          <h2 className="text-2xl font-bold text-[color:var(--primary)]">{city.name}</h2>
          <p className="text-gray-600">{city.description}</p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowCityDetails(true)}
        >
          City Details
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
            {Object.entries(production).map(([resource, amount]) => (
              <div key={resource}>
                <span className="capitalize font-medium">{resource}:</span> +{amount}/day
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Buildings</h3>
        {city.buildings.length === 0 ? (
          <p className="text-sm text-gray-600">No buildings yet. Build some to increase production!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {city.buildings.map(buildingId => {
              const building = buildings.find(b => b.id === buildingId);
              return (
                <Card key={buildingId} className="text-sm flex">
                  {building.image && imageAssets.buildings[building.image] && (
                    <div className="w-16 h-16 flex-shrink-0 mr-3">
                      <img 
                        src={imageAssets.buildings[building.image]} 
                        alt="" 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium">{building.name}</h4>
                    <p className="text-xs text-gray-600">{building.description}</p>
                    <div className="mt-2 text-xs grid grid-cols-2 gap-x-2">
                      {Object.entries(building.production).map(([resource, amount]) => (
                        <div key={resource} className="text-green-600">
                          +{amount} {resource.charAt(0).toUpperCase() + resource.slice(1)}
                        </div>
                      ))}
                      {Object.entries(building.maintenance).map(([resource, amount]) => (
                        <div key={resource} className="text-red-600">
                          -{amount} {resource.charAt(0).toUpperCase() + resource.slice(1)}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
      
      {buildingInProgress.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Under Construction</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {buildingInProgress.map(item => {
              const building = buildings.find(b => b.id === item.buildingId);
              return (
                <Card key={`${item.buildingId}-${item.startedOn}`} className="text-sm">
                  <h4 className="font-medium">{building.name}</h4>
                  <div className="mt-1 text-xs">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[color:var(--primary)]"
                        style={{ 
                          width: `${((building.buildTime - item.daysLeft) / building.buildTime) * 100}%`
                        }}
                      ></div>
                    </div>
                    <div className="mt-1">
                      {item.daysLeft} {item.daysLeft === 1 ? 'day' : 'days'} remaining
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
      
      {buildableBuildings.length > 0 && city.buildings.length < city.buildingSlots && (
        <div>
          <h3 className="font-semibold mb-2">Available Buildings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {buildableBuildings.map(building => (
              <Card key={building.id} className="text-sm flex">
                {building.image && imageAssets.buildings[building.image] && (
                  <div className="w-16 h-16 flex-shrink-0 mr-3">
                    <img 
                      src={imageAssets.buildings[building.image]} 
                      alt="" 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-medium">{building.name}</h4>
                  <p className="text-xs text-gray-600">{building.description}</p>
                  <div className="mt-2 text-xs grid grid-cols-2 gap-x-2">
                    {Object.entries(building.production).map(([resource, amount]) => (
                      <div key={resource} className="text-green-600">
                        +{amount} {resource.charAt(0).toUpperCase() + resource.slice(1)}
                      </div>
                    ))}
                    {Object.entries(building.maintenance).map(([resource, amount]) => (
                      <div key={resource} className="text-red-600">
                        -{amount} {resource.charAt(0).toUpperCase() + resource.slice(1)}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-xs">
                    <div className="font-medium">Cost:</div>
                    <div className="grid grid-cols-2 gap-x-2">
                      {Object.entries(building.cost).map(([resource, amount]) => (
                        <div key={resource}>
                          {amount} {resource.charAt(0).toUpperCase() + resource.slice(1)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button 
                      onClick={() => startBuilding(city.id, building.id)}
                      size="sm"
                      className="w-full"
                    >
                      Build ({building.buildTime} days)
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {showCityDetails && (
        <CityDetails 
          cityId={cityId} 
          onClose={() => setShowCityDetails(false)} 
        />
      )}
    </div>
  );
};

export default CityView;