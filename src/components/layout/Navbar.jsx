import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import QuestLog from '@/components/game/QuestLog';
import AchievementsPanel from '@/components/game/AchievementsPanel';
import GameStats from '@/components/game/GameStats';

const Navbar = ({ resources }) => {
  const [showResources, setShowResources] = useState(false);
  const [showQuestLog, setShowQuestLog] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showStats, setShowStats] = useState(false);
  
  const currentSeason = useGameStore(state => state.currentSeason);
  const currentEra = useGameStore(state => state.currentEra);
  const day = useGameStore(state => state.day);
  const advanceDay = useGameStore(state => state.advanceDay);
  const advanceToNextEra = useGameStore(state => state.advanceToNextEra);
  const playerPoints = useGameStore(state => state.playerPoints);
  const playerRank = useGameStore(state => state.getCurrentPlayerRank());
  const activeQuests = useGameStore(state => state.activeQuests);
  const pendingStoryEvents = useGameStore(state => state.pendingStoryEvents);
  
  return (
    <>
      <div className="bg-white shadow-md p-3">
        <div className="max-w-screen-md mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
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
          
          <div className="mt-3 md:mt-0 flex items-center gap-2 flex-wrap justify-end">
            <div className="flex items-center">
              <div className="text-xs font-medium mr-2 bg-[color:var(--primary)] text-white px-2 py-1 rounded">
                {playerPoints} Points
              </div>
              
              <div onClick={() => setShowStats(true)} className="text-xs border border-gray-300 px-2 py-1 rounded cursor-pointer hover:bg-gray-100">
                {playerRank.title}
              </div>
            </div>
            
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
            
            <Button 
              onClick={() => setShowQuestLog(true)}
              variant="secondary"
              size="sm"
              className="relative"
            >
              Quests
              {activeQuests.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[color:var(--primary)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeQuests.length}
                </span>
              )}
            </Button>
            
            <Button 
              onClick={() => setShowAchievements(true)}
              variant="secondary"
              size="sm"
            >
              Achievements
            </Button>
            
            <Button 
              onClick={advanceToNextEra}
              variant="secondary"
              size="sm"
            >
              Advance Era
            </Button>
            
            <Button onClick={advanceDay} variant="primary" size="sm" className="relative">
              Next Day
              {pendingStoryEvents.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-[color:var(--primary)] text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  !
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {showQuestLog && (
        <QuestLog onClose={() => setShowQuestLog(false)} />
      )}
      
      {showAchievements && (
        <AchievementsPanel onClose={() => setShowAchievements(false)} />
      )}
      
      {showStats && (
        <GameStats onClose={() => setShowStats(false)} />
      )}
    </>
  );
};

export default Navbar;