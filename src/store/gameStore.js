import { create } from 'zustand';
import { cities, buildings, trains, eras, seasons } from '@/utils/gameData';

const initialState = {
  // Game progression
  day: 1,
  currentSeason: seasons[0],
  currentEra: eras[0],
  
  // Player resources
  resources: {
    money: 200,
    food: 50,
    industry: 0,
    coal: 0,
    power: 0,
    research: 0,
    culture: 0,
    oil: 0,
    happiness: 50
  },
  
  // Cities and development
  cities: cities.map(city => ({
    ...city,
    buildings: [],
    level: 1,
    population: city.id === 'xian' ? 100 : 0
  })),
  
  // Railway network
  railConnections: [],
  trains: [],
  
  // Game state
  notifications: [],
  selectedCity: null,
  selectedTrain: null,
  buildingInProgress: [],
  trainsInProgress: []
};

export const useGameStore = create((set, get) => ({
  ...initialState,
  
  // Selectors
  getCity: (cityId) => get().cities.find(city => city.id === cityId),
  getAvailableBuildings: () => {
    const { currentEra, cities } = get();
    return buildings.filter(building => 
      building.requirements.era === currentEra.id || 
      eras.findIndex(era => era.id === currentEra.id) > 
      eras.findIndex(era => era.id === building.requirements.era)
    );
  },
  getAvailableTrains: () => {
    const { currentEra, cities } = get();
    return trains.filter(train => 
      train.requirements.era === currentEra.id || 
      eras.findIndex(era => era.id === currentEra.id) > 
      eras.findIndex(era => era.id === train.requirements.era)
    );
  },
  
  // Actions
  selectCity: (cityId) => set({ selectedCity: cityId }),
  
  advanceDay: () => {
    const { day, currentSeason, buildingInProgress, trainsInProgress, resources } = get();
    const newDay = day + 1;
    
    // Check season change
    let newSeason = currentSeason;
    if (newDay % currentSeason.duration === 0) {
      const currentIndex = seasons.findIndex(season => season.id === currentSeason.id);
      const nextIndex = (currentIndex + 1) % seasons.length;
      newSeason = seasons[nextIndex];
    }
    
    // Process resource production from all cities
    const newResources = { ...resources };
    const cities = get().cities.map(city => {
      // Only process unlocked cities
      if (!city.unlocked) return city;
      
      // Calculate production from buildings
      let production = { ...city.baseProduction };
      city.buildings.forEach(buildingId => {
        const building = buildings.find(b => b.id === buildingId);
        if (building) {
          // Apply season effects to production
          Object.entries(building.production).forEach(([resource, amount]) => {
            const seasonMultiplier = resource === 'food' ? newSeason.effects.agriculture : 1;
            production[resource] = (production[resource] || 0) + (amount * seasonMultiplier);
          });
          
          // Subtract maintenance costs
          Object.entries(building.maintenance).forEach(([resource, amount]) => {
            newResources[resource] = (newResources[resource] || 0) - amount;
          });
        }
      });
      
      // Add production to resources
      Object.entries(production).forEach(([resource, amount]) => {
        newResources[resource] = (newResources[resource] || 0) + amount;
      });
      
      return city;
    });
    
    // Update building progress
    const updatedBuildingProgress = buildingInProgress.map(item => {
      return { ...item, daysLeft: item.daysLeft - 1 };
    });
    
    // Finish completed buildings
    const completedBuildings = updatedBuildingProgress.filter(item => item.daysLeft <= 0);
    const remainingBuildingProgress = updatedBuildingProgress.filter(item => item.daysLeft > 0);
    
    // Add completed buildings to cities
    const updatedCities = cities.map(city => {
      const cityCompletedBuildings = completedBuildings.filter(item => item.cityId === city.id);
      if (cityCompletedBuildings.length > 0) {
        return {
          ...city,
          buildings: [
            ...city.buildings,
            ...cityCompletedBuildings.map(item => item.buildingId)
          ]
        };
      }
      return city;
    });
    
    // Update train progress
    const updatedTrainProgress = trainsInProgress.map(item => {
      return { ...item, daysLeft: item.daysLeft - 1 };
    });
    
    // Finish completed trains
    const completedTrains = updatedTrainProgress.filter(item => item.daysLeft <= 0);
    const remainingTrainProgress = updatedTrainProgress.filter(item => item.daysLeft > 0);
    
    // Add completed trains to fleet
    const newTrains = [
      ...get().trains,
      ...completedTrains.map(item => ({
        id: `${item.trainType}_${Date.now()}`,
        type: item.trainType,
        location: item.startingCity,
        status: 'idle'
      }))
    ];
    
    // Generate notifications for completed items
    const newNotifications = [
      ...completedBuildings.map(item => ({
        id: Date.now() + Math.random(),
        message: `New building completed in ${updatedCities.find(city => city.id === item.cityId)?.name}: ${buildings.find(b => b.id === item.buildingId)?.name}`,
        type: 'success'
      })),
      ...completedTrains.map(item => ({
        id: Date.now() + Math.random(),
        message: `New train completed: ${trains.find(t => t.id === item.trainType)?.name}`,
        type: 'success'
      }))
    ];
    
    // Check for unlockable cities
    const connectedCityIds = get().railConnections.flatMap(conn => [conn.from, conn.to]);
    const uniqueConnectedCities = [...new Set(connectedCityIds)];
    
    const updatedCitiesWithUnlocks = updatedCities.map(city => {
      // If already unlocked, keep it that way
      if (city.unlocked) return city;
      
      // Check if adjacent to an unlocked city
      const cityIndex = cities.findIndex(c => c.id === city.id);
      const adjacentCityIds = [cities[cityIndex - 1]?.id, cities[cityIndex + 1]?.id].filter(Boolean);
      
      const adjacentUnlockedCities = adjacentCityIds.filter(id => 
        updatedCities.find(c => c.id === id && c.unlocked)
      );
      
      // Unlock if it's adjacent to an unlocked city and we have enough money
      if (adjacentUnlockedCities.length > 0 && newResources.money >= 500) {
        return { ...city, unlocked: true };
      }
      
      return city;
    });
    
    set({
      day: newDay,
      currentSeason: newSeason,
      resources: newResources,
      cities: updatedCitiesWithUnlocks,
      buildingInProgress: remainingBuildingProgress,
      trainsInProgress: remainingTrainProgress,
      trains: newTrains,
      notifications: [...get().notifications, ...newNotifications].slice(-10) // Keep only the 10 most recent
    });
  },
  
  startBuilding: (cityId, buildingId) => {
    const { resources, cities } = get();
    const city = cities.find(c => c.id === cityId);
    const building = buildings.find(b => b.id === buildingId);
    
    if (!city || !building) return false;
    
    // Check if we have enough resources
    let canAfford = true;
    Object.entries(building.cost).forEach(([resource, amount]) => {
      if ((resources[resource] || 0) < amount) {
        canAfford = false;
      }
    });
    
    if (!canAfford) {
      set({
        notifications: [
          ...get().notifications, 
          {
            id: Date.now(),
            message: `Not enough resources to build ${building.name}`,
            type: 'error'
          }
        ].slice(-10)
      });
      return false;
    }
    
    // Deduct resources
    const newResources = { ...resources };
    Object.entries(building.cost).forEach(([resource, amount]) => {
      newResources[resource] = (newResources[resource] || 0) - amount;
    });
    
    // Add to in-progress
    set({
      resources: newResources,
      buildingInProgress: [
        ...get().buildingInProgress,
        {
          cityId,
          buildingId,
          daysLeft: building.buildTime,
          startedOn: get().day
        }
      ],
      notifications: [
        ...get().notifications,
        {
          id: Date.now(),
          message: `Started building ${building.name} in ${city.name}`,
          type: 'info'
        }
      ].slice(-10)
    });
    
    return true;
  },
  
  buildRailConnection: (fromCityId, toCityId) => {
    const { resources, cities, railConnections } = get();
    const fromCity = cities.find(c => c.id === fromCityId);
    const toCity = cities.find(c => c.id === toCityId);
    
    if (!fromCity || !toCity) return false;
    
    // Check if connection already exists
    const existingConnection = railConnections.find(
      conn => (conn.from === fromCityId && conn.to === toCityId) || 
              (conn.from === toCityId && conn.to === fromCityId)
    );
    
    if (existingConnection) {
      set({
        notifications: [
          ...get().notifications, 
          {
            id: Date.now(),
            message: `Rail connection already exists between ${fromCity.name} and ${toCity.name}`,
            type: 'error'
          }
        ].slice(-10)
      });
      return false;
    }
    
    // Check if cities are adjacent
    const cityIds = cities.map(c => c.id);
    const fromIndex = cityIds.indexOf(fromCityId);
    const toIndex = cityIds.indexOf(toCityId);
    
    if (Math.abs(fromIndex - toIndex) !== 1) {
      set({
        notifications: [
          ...get().notifications, 
          {
            id: Date.now(),
            message: `Can only build rail connections between adjacent cities`,
            type: 'error'
          }
        ].slice(-10)
      });
      return false;
    }
    
    // Cost based on distance and era
    const baseCost = 300;
    const cost = { 
      money: baseCost, 
      industry: Math.floor(baseCost / 3) 
    };
    
    // Check if we have enough resources
    if (resources.money < cost.money || resources.industry < cost.industry) {
      set({
        notifications: [
          ...get().notifications, 
          {
            id: Date.now(),
            message: `Not enough resources to build rail connection`,
            type: 'error'
          }
        ].slice(-10)
      });
      return false;
    }
    
    // Deduct resources and add connection
    set({
      resources: {
        ...resources,
        money: resources.money - cost.money,
        industry: resources.industry - cost.industry
      },
      railConnections: [
        ...railConnections,
        { from: fromCityId, to: toCityId, quality: 1 }
      ],
      notifications: [
        ...get().notifications,
        {
          id: Date.now(),
          message: `Built rail connection between ${fromCity.name} and ${toCity.name}`,
          type: 'success'
        }
      ].slice(-10)
    });
    
    return true;
  },
  
  buildTrain: (trainType, startingCity) => {
    const { resources, cities } = get();
    const city = cities.find(c => c.id === startingCity);
    const train = trains.find(t => t.id === trainType);
    
    if (!city || !train) return false;
    
    // Check if we have enough resources
    let canAfford = true;
    Object.entries(train.cost).forEach(([resource, amount]) => {
      if ((resources[resource] || 0) < amount) {
        canAfford = false;
      }
    });
    
    if (!canAfford) {
      set({
        notifications: [
          ...get().notifications, 
          {
            id: Date.now(),
            message: `Not enough resources to build ${train.name}`,
            type: 'error'
          }
        ].slice(-10)
      });
      return false;
    }
    
    // Deduct resources
    const newResources = { ...resources };
    Object.entries(train.cost).forEach(([resource, amount]) => {
      newResources[resource] = (newResources[resource] || 0) - amount;
    });
    
    // Add to in-progress
    set({
      resources: newResources,
      trainsInProgress: [
        ...get().trainsInProgress,
        {
          trainType,
          startingCity,
          daysLeft: train.buildTime,
          startedOn: get().day
        }
      ],
      notifications: [
        ...get().notifications,
        {
          id: Date.now(),
          message: `Started building ${train.name} in ${city.name}`,
          type: 'info'
        }
      ].slice(-10)
    });
    
    return true;
  },
  
  dismissNotification: (notificationId) => {
    set({
      notifications: get().notifications.filter(n => n.id !== notificationId)
    });
  },
  
  resetGame: () => {
    set(initialState);
  }
}));