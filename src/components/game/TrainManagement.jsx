import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import { trains, imageAssets } from '@/utils/gameData';

const TrainManagement = ({ cityId }) => {
  const city = useGameStore(state => state.cities.find(c => c.id === cityId));
  const getAvailableTrains = useGameStore(state => state.getAvailableTrains);
  const trainsInProgress = useGameStore(state => 
    state.trainsInProgress.filter(t => t.startingCity === cityId)
  );
  const activeTrains = useGameStore(state => 
    state.trains.filter(t => t.location === cityId)
  );
  const buildTrain = useGameStore(state => state.buildTrain);
  
  if (!city) {
    return <div className="text-center py-10">City not found</div>;
  }
  
  const availableTrains = getAvailableTrains();
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-[color:var(--primary)]">Train Management: {city.name}</h2>
      
      {activeTrains.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Active Trains</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeTrains.map(train => {
              const trainType = trains.find(t => t.id === train.type);
              return (
                <Card key={train.id} className="text-sm flex">
                  {trainType.image && imageAssets.trains[trainType.image] && (
                    <div className="w-16 h-16 flex-shrink-0 mr-3">
                      <img 
                        src={imageAssets.trains[trainType.image]} 
                        alt="" 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium">{trainType.name}</h4>
                    <div className="mt-1">
                      <div><span className="font-medium">Status:</span> {train.status}</div>
                      <div className="mt-2 grid grid-cols-2 gap-x-2">
                        <div><span className="font-medium">Speed:</span> {trainType.speed}</div>
                        <div><span className="font-medium">Passengers:</span> {trainType.capacity.passengers}</div>
                        <div><span className="font-medium">Freight:</span> {trainType.capacity.freight}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
      
      {trainsInProgress.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Trains Under Construction</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {trainsInProgress.map(item => {
              const trainType = trains.find(t => t.id === item.trainType);
              return (
                <Card key={`${item.trainType}-${item.startedOn}`} className="text-sm flex">
                  {trainType.image && imageAssets.trains[trainType.image] && (
                    <div className="w-16 h-16 flex-shrink-0 mr-3 opacity-50">
                      <img 
                        src={imageAssets.trains[trainType.image]} 
                        alt="" 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium">{trainType.name}</h4>
                    <div className="mt-1 text-xs">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[color:var(--primary)]"
                          style={{ 
                            width: `${((trainType.buildTime - item.daysLeft) / trainType.buildTime) * 100}%`
                          }}
                        ></div>
                      </div>
                      <div className="mt-1">
                        {item.daysLeft} {item.daysLeft === 1 ? 'day' : 'days'} remaining
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
      
      {availableTrains.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Build New Trains</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availableTrains.map(train => (
              <Card key={train.id} className="text-sm flex">
                {train.image && imageAssets.trains[train.image] && (
                  <div className="w-16 h-16 flex-shrink-0 mr-3">
                    <img 
                      src={imageAssets.trains[train.image]} 
                      alt="" 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-medium">{train.name}</h4>
                  <p className="text-xs text-gray-600">{train.description}</p>
                  <div className="mt-2 text-xs grid grid-cols-2 gap-x-2">
                    <div><span className="font-medium">Speed:</span> {train.speed}</div>
                    <div><span className="font-medium">Passengers:</span> {train.capacity.passengers}</div>
                    <div><span className="font-medium">Freight:</span> {train.capacity.freight}</div>
                  </div>
                  <div className="mt-3 text-xs">
                    <div className="font-medium">Cost:</div>
                    <div className="grid grid-cols-2 gap-x-2">
                      {Object.entries(train.cost).map(([resource, amount]) => (
                        <div key={resource}>
                          {amount} {resource.charAt(0).toUpperCase() + resource.slice(1)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button 
                      onClick={() => buildTrain(train.id, city.id)}
                      size="sm"
                      className="w-full"
                    >
                      Build ({train.buildTime} days)
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainManagement;