import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import Button from '@/components/ui/Button';

const MapView = ({ onSelectCity }) => {
  const cities = useGameStore(state => state.cities);
  const railConnections = useGameStore(state => state.railConnections);
  const buildRailConnection = useGameStore(state => state.buildRailConnection);
  const [selectedCities, setSelectedCities] = useState([]);
  
  const handleCityClick = (cityId) => {
    // Don't allow selecting locked cities
    const city = cities.find(c => c.id === cityId);
    if (!city.unlocked) return;
    
    if (selectedCities.includes(cityId)) {
      setSelectedCities(selectedCities.filter(id => id !== cityId));
    } else {
      if (selectedCities.length < 2) {
        setSelectedCities([...selectedCities, cityId]);
      } else {
        setSelectedCities([selectedCities[1], cityId]);
      }
    }
  };
  
  const handleBuildRailConnection = () => {
    if (selectedCities.length === 2) {
      const success = buildRailConnection(selectedCities[0], selectedCities[1]);
      if (success) {
        setSelectedCities([]);
      }
    }
  };
  
  const isConnectionBuilt = (cityId1, cityId2) => {
    return railConnections.some(
      conn => (conn.from === cityId1 && conn.to === cityId2) || 
              (conn.from === cityId2 && conn.to === cityId1)
    );
  };
  
  return (
    <div className="relative w-full h-80 md:h-96 bg-[#f0f0f0] rounded-lg overflow-hidden ink-wash-bg">
      {/* Railway lines */}
      {railConnections.map((connection, index) => {
        const fromCity = cities.find(c => c.id === connection.from);
        const toCity = cities.find(c => c.id === connection.to);
        
        // Calculate line position
        const x1 = fromCity.position.x;
        const y1 = fromCity.position.y;
        const x2 = toCity.position.x;
        const y2 = toCity.position.y;
        
        // Calculate angle for proper rotation
        const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        
        return (
          <div
            key={`rail-${index}`}
            className="railway-line absolute origin-left"
            style={{
              top: `${y1}%`,
              left: `${x1}%`,
              width: `${length}%`,
              transform: `rotate(${angle}deg)`,
              transformOrigin: '0 50%'
            }}
          />
        );
      })}
      
      {/* City nodes */}
      {cities.map(city => (
        <div
          key={city.id}
          className={`
            absolute 
            ${city.unlocked ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'} 
            ${selectedCities.includes(city.id) ? 'scale-110' : ''}
            transition-transform duration-200
          `}
          style={{
            top: `${city.position.y}%`,
            left: `${city.position.x}%`,
            transform: 'translate(-50%, -50%)'
          }}
          onClick={() => city.unlocked && onSelectCity(city.id)}
          onContextMenu={(e) => {
            e.preventDefault();
            handleCityClick(city.id);
          }}
        >
          <div className={`
            station-node 
            ${city.unlocked ? 'border-[color:var(--primary)]' : 'border-gray-400'}
            ${selectedCities.includes(city.id) ? 'bg-[color:var(--primary)] text-white' : ''}
          `}>
            {city.name.charAt(0)}
          </div>
          <div className="text-xs font-medium mt-1 text-center whitespace-nowrap">
            {city.name}
          </div>
        </div>
      ))}
      
      {/* Controls */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
        {selectedCities.length === 2 && (
          <Button 
            onClick={handleBuildRailConnection}
            variant="primary"
            size="sm"
          >
            Build Railway
          </Button>
        )}
      </div>
      
      {/* Instructions */}
      <div className="absolute top-3 left-3 right-3 text-xs text-center bg-white bg-opacity-70 p-2 rounded">
        Tap a city to view details. Right-click or long-press to select cities for railway connections.
      </div>
    </div>
  );
};

export default MapView;