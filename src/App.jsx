import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import MapView from '@/components/game/MapView';
import CityView from '@/components/game/CityView';
import TrainManagement from '@/components/game/TrainManagement';
import SeasonDisplay from '@/components/game/SeasonDisplay';
import Notifications from '@/components/game/Notifications';
import StoryEvent from '@/components/game/StoryEvent';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useGameStore } from '@/store/gameStore';

const VIEWS = {
  MAP: 'map',
  CITY: 'city',
  TRAIN: 'train'
};

export default function App() {
  const [currentView, setCurrentView] = useState(VIEWS.MAP);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  
  const resources = useGameStore(state => state.resources);
  const currentSeason = useGameStore(state => state.currentSeason);
  const pendingStoryEvents = useGameStore(state => state.pendingStoryEvents);
  const initializeGame = useGameStore(state => state.initializeGame);
  
  useEffect(() => {
    if (!showIntro) {
      initializeGame();
    }
  }, [showIntro, initializeGame]);
  
  const handleSelectCity = (cityId) => {
    setSelectedCityId(cityId);
    setCurrentView(VIEWS.CITY);
  };
  
  const handleBackToMap = () => {
    setCurrentView(VIEWS.MAP);
  };
  
  const handleSwitchToTrains = () => {
    setCurrentView(VIEWS.TRAIN);
  };
  
  const [activeStoryEvent, setActiveStoryEvent] = useState(null);
  
  useEffect(() => {
    if (pendingStoryEvents.length > 0 && !activeStoryEvent) {
      setActiveStoryEvent(pendingStoryEvents[0]);
    }
  }, [pendingStoryEvents, activeStoryEvent]);
  
  const handleStoryEventClose = () => {
    setActiveStoryEvent(null);
  };

  return (
    <PageLayout currentSeason={currentSeason} resources={resources}>
      {showIntro ? (
        <div className="flex flex-col items-center justify-center py-8">
          <Card className="max-w-md mb-6" inkWash={true} chineseBrush={true}>
            <h1 className="text-2xl font-bold text-center text-[color:var(--primary)] mb-4">
              Welcome to Snowverse: Railway Expansion
            </h1>
            <p className="mb-3">
              Take command of China's historic railway development from Xi'an to Changchun!
            </p>
            <p className="mb-3">
              Build and expand your railway network, develop cities, manage resources, and 
              adapt to seasonal challenges as you connect this historic corridor.
            </p>
            <p className="mb-3">
              Start in the ancient city of Xi'an and gradually expand northeastward through 
              different eras, each with unique challenges and opportunities.
            </p>
            <div className="text-center mt-6">
              <Button onClick={() => setShowIntro(false)}>
                Start Your Journey
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        <>
          <SeasonDisplay season={currentSeason} />
          
          {currentView === VIEWS.MAP && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-[color:var(--primary)]">Railway Map</h2>
              <MapView onSelectCity={handleSelectCity} />
            </div>
          )}
          
          {currentView === VIEWS.CITY && selectedCityId && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <Button onClick={handleBackToMap} variant="secondary" size="sm">
                  Back to Map
                </Button>
                <Button onClick={handleSwitchToTrains} variant="primary" size="sm">
                  Train Management
                </Button>
              </div>
              <CityView cityId={selectedCityId} />
            </div>
          )}
          
          {currentView === VIEWS.TRAIN && selectedCityId && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <Button onClick={() => setCurrentView(VIEWS.CITY)} variant="secondary" size="sm">
                  Back to City
                </Button>
                <Button onClick={handleBackToMap} variant="secondary" size="sm">
                  Back to Map
                </Button>
              </div>
              <TrainManagement cityId={selectedCityId} />
            </div>
          )}
          
          <Notifications />
          
          {activeStoryEvent && (
            <StoryEvent 
              storyEventId={activeStoryEvent} 
              onClose={handleStoryEventClose} 
            />
          )}
        </>
      )}
    </PageLayout>
  );
}