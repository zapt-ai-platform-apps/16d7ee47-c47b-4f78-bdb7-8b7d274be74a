import React from 'react';
import Button from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import { storyEvents, imageAssets } from '@/utils/gameData';

const StoryEvent = ({ storyEventId, onClose }) => {
  const viewStoryEvent = useGameStore(state => state.viewStoryEvent);
  
  const storyEvent = storyEvents.find(event => event.id === storyEventId);
  
  if (!storyEvent) {
    return null;
  }
  
  const handleClose = () => {
    viewStoryEvent(storyEventId);
    if (onClose) onClose();
  };
  
  const handleChoiceSelected = (choice) => {
    // Handle any outcome logic here
    console.log('Story choice selected:', choice);
    handleClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="relative">
          {storyEvent.image && imageAssets.story[storyEvent.image] && (
            <div className="w-full h-48 relative">
              <img 
                src={imageAssets.story[storyEvent.image]} 
                alt="" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{storyEvent.title}</h2>
            </div>
          )}
          
          {!storyEvent.image && (
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold text-[color:var(--primary)]">{storyEvent.title}</h2>
              <p className="text-sm text-gray-600">{storyEvent.description}</p>
            </div>
          )}
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <div className="prose max-w-none">
            {storyEvent.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="mb-4 leading-relaxed">{paragraph}</p>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t">
          {storyEvent.choices && storyEvent.choices.length > 0 ? (
            <div className="space-y-3">
              {storyEvent.choices.map((choice, index) => (
                <Button 
                  key={index} 
                  onClick={() => handleChoiceSelected(choice)}
                  className="w-full mb-2"
                >
                  {choice.text}
                </Button>
              ))}
            </div>
          ) : (
            <Button onClick={handleClose} className="w-full">
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryEvent;