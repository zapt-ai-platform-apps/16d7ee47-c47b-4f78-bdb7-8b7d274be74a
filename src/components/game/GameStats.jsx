import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';

const GameStats = ({ onClose }) => {
  const stats = useGameStore(state => state.stats);
  const cities = useGameStore(state => state.cities);
  const trains = useGameStore(state => state.trains);
  const railConnections = useGameStore(state => state.railConnections);
  const currentEra = useGameStore(state => state.currentEra);
  const playerPoints = useGameStore(state => state.playerPoints);
  const playerRank = useGameStore(state => state.getCurrentPlayerRank());
  
  // Calculate additional stats
  const unlockedCities = cities.filter(city => city.unlocked).length;
  const totalCities = cities.length;
  const completionPercentage = Math.round((unlockedCities / totalCities) * 100);
  
  const statsCategories = [
    {
      name: 'Game Progress',
      stats: [
        { label: 'Current Era', value: currentEra.name },
        { label: 'Player Rank', value: playerRank.title },
        { label: 'Total Points', value: playerPoints },
        { label: 'Days Played', value: stats.totalDaysPlayed },
        { label: 'Map Completion', value: `${completionPercentage}%` }
      ]
    },
    {
      name: 'Railway Network',
      stats: [
        { label: 'Cities Unlocked', value: `${unlockedCities}/${totalCities}` },
        { label: 'Rail Connections', value: railConnections.length },
        { label: 'Active Trains', value: trains.length },
        { label: 'Train Types Built', value: [...new Set(trains.map(t => t.type))].length }
      ]
    },
    {
      name: 'Economy',
      stats: [
        { label: 'Total Money Earned', value: Math.floor(stats.totalMoneyEarned) },
        { label: 'Buildings Constructed', value: stats.totalBuildingsConstructed },
        { label: 'Trains Built', value: stats.totalTrainsBuilt },
        { label: 'Railways Constructed', value: stats.totalRailConnectionsBuilt }
      ]
    }
  ];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-[color:var(--primary)]">Game Statistics</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {statsCategories.map(category => (
              <div key={category.name}>
                <h3 className="font-semibold mb-3">{category.name}</h3>
                <Card inkWash={true}>
                  <div className="grid grid-cols-2 gap-4">
                    {category.stats.map(stat => (
                      <div key={stat.label} className="flex justify-between">
                        <span className="text-gray-600">{stat.label}:</span>
                        <span className="font-medium">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
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

export default GameStats;