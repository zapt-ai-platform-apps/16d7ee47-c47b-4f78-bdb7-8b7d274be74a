import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import { imageAssets } from '@/utils/gameData';

const AchievementsPanel = ({ onClose }) => {
  const achievements = useGameStore(state => state.achievements);
  
  // Group achievements by unlocked status
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked && !a.hidden);
  const hiddenAchievements = achievements.filter(a => !a.unlocked && a.hidden);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-[color:var(--primary)]">Achievements</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {unlockedAchievements.length > 0 && (
              <div className="sm:col-span-2">
                <h3 className="font-semibold mb-3">Unlocked Achievements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {unlockedAchievements.map(achievement => (
                    <Card key={achievement.id} className="flex items-start">
                      {achievement.icon && imageAssets.achievements[achievement.icon] && (
                        <div className="w-12 h-12 flex-shrink-0 mr-3">
                          <img 
                            src={imageAssets.achievements[achievement.icon]} 
                            alt="" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                        <div className="mt-1 text-xs text-green-600">
                          +{achievement.rewardPoints} points
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {lockedAchievements.length > 0 && (
              <div className="sm:col-span-2 mt-4">
                <h3 className="font-semibold mb-3">Locked Achievements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lockedAchievements.map(achievement => (
                    <Card key={achievement.id} className="flex items-start opacity-70">
                      <div className="w-12 h-12 flex-shrink-0 mr-3 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-xl text-gray-400">🔒</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                        <div className="mt-1 text-xs text-gray-500">
                          +{achievement.rewardPoints} points
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {hiddenAchievements.length > 0 && (
              <div className="sm:col-span-2 mt-4">
                <h3 className="font-semibold mb-3">Hidden Achievements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hiddenAchievements.map(achievement => (
                    <Card key={achievement.id} className="flex items-start opacity-70">
                      <div className="w-12 h-12 flex-shrink-0 mr-3 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-xl text-gray-400">❔</span>
                      </div>
                      <div>
                        <h4 className="font-medium">???</h4>
                        <p className="text-xs text-gray-600">Complete special conditions to unlock</p>
                        <div className="mt-1 text-xs text-gray-500">
                          +? points
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
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

export default AchievementsPanel;