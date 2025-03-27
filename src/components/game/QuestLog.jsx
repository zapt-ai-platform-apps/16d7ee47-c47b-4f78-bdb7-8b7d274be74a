import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import { imageAssets } from '@/utils/gameData';

const QuestObjectiveStatus = ({ quest, cities, railConnections, trains, currentEra }) => {
  // Helper function to check objective completion
  const isObjectiveComplete = (objective) => {
    switch (objective.type) {
      case 'build_building':
        if (objective.cityId) {
          // Check specific city
          const city = cities.find(c => c.id === objective.cityId);
          if (!city) return false;
          
          const buildingsOfType = city.buildings.filter(b => b === objective.target);
          return buildingsOfType.length >= objective.count;
        } else {
          // Check all cities
          const totalBuildings = cities.reduce((total, city) => {
            return total + city.buildings.filter(b => b === objective.target).length;
          }, 0);
          return totalBuildings >= objective.count;
        }
        
      case 'connect_cities':
        return railConnections.some(
          conn => (conn.from === objective.sourceId && conn.to === objective.targetId) || 
                  (conn.from === objective.targetId && conn.to === objective.sourceId)
        );
        
      case 'build_train':
        const trainsOfType = trains.filter(t => t.type === objective.target);
        return trainsOfType.length >= objective.count;
        
      case 'reach_era':
        return currentEra.id === objective.target;
        
      default:
        return false;
    }
  };
  
  // Function to get human-readable objective description
  const getObjectiveDescription = (objective) => {
    switch (objective.type) {
      case 'build_building':
        const building = objective.target.split('_').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        if (objective.cityId) {
          const city = cities.find(c => c.id === objective.cityId);
          return `Build ${objective.count} ${building} in ${city?.name || objective.cityId}`;
        } else {
          return `Build ${objective.count} ${building}`;
        }
        
      case 'connect_cities':
        const sourceCity = cities.find(c => c.id === objective.sourceId);
        const targetCity = cities.find(c => c.id === objective.targetId);
        return `Connect ${sourceCity?.name || objective.sourceId} to ${targetCity?.name || objective.targetId} by rail`;
        
      case 'build_train':
        const train = objective.target.split('_').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        return `Build ${objective.count} ${train}`;
        
      case 'reach_era':
        const era = objective.target.charAt(0).toUpperCase() + objective.target.slice(1);
        return `Reach the ${era} Era`;
        
      default:
        return `Unknown objective: ${objective.type}`;
    }
  };
  
  return (
    <div className="mt-2 space-y-1 text-sm">
      {quest.objectives.map((objective, index) => {
        const complete = isObjectiveComplete(objective);
        return (
          <div key={index} className="flex items-center">
            <div className={`w-5 h-5 flex-shrink-0 rounded-full border flex items-center justify-center mr-2 ${complete ? 'bg-green-500 border-green-600 text-white' : 'border-gray-400'}`}>
              {complete && <span className="text-xs">✓</span>}
            </div>
            <span className={complete ? 'line-through text-gray-500' : ''}>{getObjectiveDescription(objective)}</span>
          </div>
        );
      })}
    </div>
  );
};

const QuestLog = ({ onClose }) => {
  const activeQuests = useGameStore(state => state.getActiveQuests());
  const completedQuests = useGameStore(state => state.getCompletedQuests());
  const cities = useGameStore(state => state.cities);
  const railConnections = useGameStore(state => state.railConnections);
  const trains = useGameStore(state => state.trains);
  const currentEra = useGameStore(state => state.currentEra);
  const playerPoints = useGameStore(state => state.playerPoints);
  const playerRank = useGameStore(state => state.getCurrentPlayerRank());
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-[color:var(--primary)]">Quest Log</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{playerRank.title}</h3>
              <p className="text-sm text-gray-600">{playerRank.description}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">{playerPoints} Points</div>
              {playerRanks.findIndex(r => r.id === playerRank.id) < playerRanks.length - 1 && (
                <div className="text-xs text-gray-500">
                  Next rank at {playerRanks[playerRanks.findIndex(r => r.id === playerRank.id) + 1].minPoints} points
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-2 text-sm">
            <strong>Perks:</strong>
            <ul className="list-disc pl-5 mt-1">
              {playerRank.perks.map((perk, index) => (
                <li key={index}>{perk}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="font-semibold mb-2">Active Quests</h3>
          {activeQuests.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No active quests</p>
          ) : (
            <div className="space-y-4">
              {activeQuests.map(quest => (
                <Card key={quest.id} className="relative overflow-hidden">
                  {quest.image && imageAssets.quests[quest.image] && (
                    <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
                      <img src={imageAssets.quests[quest.image]} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <h4 className="font-semibold">{quest.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{quest.description}</p>
                  
                  <QuestObjectiveStatus 
                    quest={quest}
                    cities={cities}
                    railConnections={railConnections}
                    trains={trains}
                    currentEra={currentEra}
                  />
                  
                  <div className="mt-3 text-xs text-gray-500">
                    <span>Rewards: {quest.rewards.points} points</span>
                    {Object.entries(quest.rewards.resources || {}).length > 0 && (
                      <span> + Resources</span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {completedQuests.length > 0 && (
            <>
              <h3 className="font-semibold mb-2 mt-6">Completed Quests</h3>
              <div className="space-y-2">
                {completedQuests.map(quest => (
                  <div key={quest.id} className="p-3 bg-gray-100 rounded-lg opacity-70">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center mr-2">
                        <span className="text-xs">✓</span>
                      </div>
                      <h4 className="font-medium">{quest.title}</h4>
                      <div className="ml-auto text-xs text-gray-500">+{quest.rewards.points} pts</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="p-4 border-t">
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestLog;