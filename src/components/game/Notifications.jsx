import React from 'react';
import { useGameStore } from '@/store/gameStore';

const Notifications = () => {
  const notifications = useGameStore(state => state.notifications);
  const dismissNotification = useGameStore(state => state.dismissNotification);
  
  if (notifications.length === 0) return null;
  
  return (
    <div className="fixed bottom-16 right-4 z-40 max-w-xs w-full space-y-2">
      {notifications.map(notification => {
        let bgColor;
        switch (notification.type) {
          case 'success':
            bgColor = 'bg-green-500';
            break;
          case 'error':
            bgColor = 'bg-red-500';
            break;
          case 'info':
          default:
            bgColor = 'bg-blue-500';
        }
        
        return (
          <div 
            key={notification.id} 
            className={`${bgColor} text-white p-3 rounded-lg shadow-lg flex justify-between items-start`}
          >
            <p className="text-sm flex-1">{notification.message}</p>
            <button 
              onClick={() => dismissNotification(notification.id)}
              className="ml-2 text-white opacity-70 hover:opacity-100 cursor-pointer text-xl"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;