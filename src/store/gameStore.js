import { create } from 'zustand';
import { cities, buildings, trains, eras, seasons, quests, achievements, storyEvents, playerRanks } from '@/utils/gameData';

const initialState = {
  // Game progression
  day: 1,
  currentSeason: seasons[0],
  currentEra: eras[0],
  
  // Player resources and progression
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
  playerPoints: 0,
  playerRank: playerRanks[0],
  
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
  trainsInProgress: [],
  
  // Quests and story
  activeQuests: [],
  completedQuests: [],
  unlockedQuests: [],
  viewedStoryEvents: [],
  pendingStoryEvents: [],
  
  // Achievements
  achievements: achievements.map(achievement => ({
    ...achievement,
    unlocked: false,
    dateUnlocked: null
  })),
  
  // Game statistics
  stats: {
    totalBuildingsConstructed: 0,
    totalTrainsBuilt: 0,
    totalRailConnectionsBuilt: 0,
    totalMoneyEarned: 0,
    totalDaysPlayed: 0
  }
};

export const useGameStore = create((set, get) => ({
  ...initialState,
  
  // Selectors
  getCity: (cityId) => get().cities.find(city => city.id === cityId),
  getCurrentPlayerRank: () => {
    const points = get().playerPoints;
    const ranks = [...playerRanks].reverse();
    return ranks.find(rank => points >= rank.minPoints) || playerRanks[0];
  },
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
  getQuestById: (questId) => {
    return quests.find(quest => quest.id === questId);
  },
  getActiveQuests: () => {
    return get().activeQuests.map(questId => 
      quests.find(quest => quest.id === questId)
    );
  },
  getCompletedQuests: () => {
    return get().completedQuests.map(questId => 
      quests.find(quest => quest.id === questId)
    );
  },
  getUnlockedQuests: () => {
    return get().unlockedQuests.map(questId => 
      quests.find(quest => quest.id === questId)
    );
  },
  
  // Quest management
  initializeQuests: () => {
    // Add starting quests with no prerequisites
    const startingQuests = quests.filter(quest => quest.requiredQuestIds.length === 0);
    set({
      activeQuests: startingQuests.map(quest => quest.id),
      unlockedQuests: startingQuests.map(quest => quest.id)
    });
  },
  
  checkQuestProgress: () => {
    const { activeQuests, cities, railConnections, trains, currentEra, buildingInProgress } = get();
    const updatedCompletedQuests = [...get().completedQuests];
    let questsUpdated = false;
    
    // Check each active quest for completion
    activeQuests.forEach(questId => {
      const quest = quests.find(q => q.id === questId);
      if (!quest) return;
      
      let allObjectivesComplete = true;
      
      // Check each objective
      quest.objectives.forEach(objective => {
        switch (objective.type) {
          case 'build_building':
            if (objective.cityId) {
              // Check specific city
              const city = cities.find(c => c.id === objective.cityId);
              if (!city) {
                allObjectivesComplete = false;
                return;
              }
              
              const buildingsOfType = city.buildings.filter(b => b === objective.target);
              if (buildingsOfType.length < objective.count) {
                allObjectivesComplete = false;
              }
            } else {
              // Check all cities
              const totalBuildings = cities.reduce((total, city) => {
                return total + city.buildings.filter(b => b === objective.target).length;
              }, 0);
              if (totalBuildings < objective.count) {
                allObjectivesComplete = false;
              }
            }
            break;
            
          case 'connect_cities':
            const isConnected = railConnections.some(
              conn => (conn.from === objective.sourceId && conn.to === objective.targetId) || 
                      (conn.from === objective.targetId && conn.to === objective.sourceId)
            );
            if (!isConnected) {
              allObjectivesComplete = false;
            }
            break;
            
          case 'build_train':
            const trainsOfType = trains.filter(t => t.type === objective.target);
            if (trainsOfType.length < objective.count) {
              allObjectivesComplete = false;
            }
            break;
            
          case 'reach_era':
            if (currentEra.id !== objective.target) {
              allObjectivesComplete = false;
            }
            break;
            
          default:
            console.log(`Unknown objective type: ${objective.type}`);
            allObjectivesComplete = false;
        }
      });
      
      // If all objectives complete, mark quest as completed
      if (allObjectivesComplete && !updatedCompletedQuests.includes(questId)) {
        updatedCompletedQuests.push(questId);
        questsUpdated = true;
        
        // Award quest rewards
        const questData = quests.find(q => q.id === questId);
        if (questData) {
          const { resources, points } = questData.rewards;
          
          // Update resources
          const newResources = { ...get().resources };
          if (resources) {
            Object.entries(resources).forEach(([resource, amount]) => {
              newResources[resource] = (newResources[resource] || 0) + amount;
            });
          }
          
          // Update points
          const newPoints = get().playerPoints + (points || 0);
          
          // Update player rank if needed
          const playerRank = get().playerRank;
          const newRank = playerRanks
            .slice()
            .reverse()
            .find(rank => newPoints >= rank.minPoints) || playerRanks[0];
          
          // Add notification
          const notifications = [
            ...get().notifications,
            {
              id: Date.now(),
              message: `Quest Completed: ${questData.title}! +${points} points`,
              type: 'success'
            }
          ];
          
          // Add story event for quest completion if exists
          const storyEvent = storyEvents.find(
            event => event.trigger.type === 'complete_quest' && event.trigger.questId === questId
          );
          
          if (storyEvent && !get().viewedStoryEvents.includes(storyEvent.id)) {
            const pendingStoryEvents = [...get().pendingStoryEvents, storyEvent.id];
            set({ pendingStoryEvents });
          }
          
          set({
            resources: newResources,
            playerPoints: newPoints,
            playerRank: newRank.id !== playerRank.id ? newRank : playerRank,
            notifications
          });
        }
      }
    });
    
    // Update active quests
    if (questsUpdated) {
      const newActiveQuests = get().activeQuests.filter(
        questId => !updatedCompletedQuests.includes(questId)
      );
      
      // Unlock new quests
      const newUnlockedQuests = [...get().unlockedQuests];
      quests.forEach(quest => {
        // If all required quests are completed and this quest isn't already unlocked
        if (
          !newUnlockedQuests.includes(quest.id) &&
          quest.requiredQuestIds.every(reqId => updatedCompletedQuests.includes(reqId))
        ) {
          newUnlockedQuests.push(quest.id);
          newActiveQuests.push(quest.id);
          
          // Add notification
          const notifications = [
            ...get().notifications,
            {
              id: Date.now() + Math.random(),
              message: `New Quest Available: ${quest.title}`,
              type: 'info'
            }
          ];
          
          set({ notifications });
        }
      });
      
      set({
        completedQuests: updatedCompletedQuests,
        activeQuests: newActiveQuests,
        unlockedQuests: newUnlockedQuests
      });
    }
  },
  
  viewStoryEvent: (storyEventId) => {
    const viewedStoryEvents = [...get().viewedStoryEvents, storyEventId];
    const pendingStoryEvents = get().pendingStoryEvents.filter(id => id !== storyEventId);
    set({ viewedStoryEvents, pendingStoryEvents });
  },
  
  // Achievements
  checkAchievements: () => {
    const { 
      railConnections, currentEra, cities, resources, trains, 
      achievements: currentAchievements 
    } = get();
    
    const updatedAchievements = [...currentAchievements];
    let achievementsUpdated = false;
    
    // Check each achievement
    updatedAchievements.forEach(achievement => {
      if (achievement.unlocked) return; // Skip already unlocked achievements
      
      let shouldUnlock = false;
      
      switch (achievement.id) {
        case 'first_connection':
          shouldUnlock = railConnections.length > 0;
          break;
          
        case 'industrial_pioneer':
          shouldUnlock = currentEra.id === 'industrial' || 
                        eras.findIndex(era => era.id === currentEra.id) > 
                        eras.findIndex(era => era.id === 'industrial');
          break;
          
        case 'city_developer':
          shouldUnlock = cities.some(city => {
            const availableBuildings = buildings.filter(
              b => b.requirements.era === currentEra.id || 
                  eras.findIndex(era => era.id === currentEra.id) > 
                  eras.findIndex(era => era.id === b.requirements.era)
            );
            
            return availableBuildings.every(building => 
              city.buildings.includes(building.id)
            );
          });
          break;
          
        case 'train_collector':
          const availableTrains = trains.filter(
            t => t.requirements.era === currentEra.id || 
                eras.findIndex(era => era.id === currentEra.id) > 
                eras.findIndex(era => era.id === t.requirements.era)
          );
          
          shouldUnlock = availableTrains.every(train => 
            get().trains.some(t => t.type === train.id)
          );
          break;
          
        case 'economic_powerhouse':
          shouldUnlock = resources.money >= 10000;
          break;
          
        case 'master_networker':
          // Check if all unlocked cities are connected
          const unlockedCities = cities.filter(city => city.unlocked);
          if (unlockedCities.length < 2) break; // Need at least 2 cities to connect
          
          const connectedCities = new Set();
          
          // Start with the first city
          const toVisit = [unlockedCities[0].id];
          
          // Do a breadth-first search
          while (toVisit.length > 0) {
            const cityId = toVisit.shift();
            if (connectedCities.has(cityId)) continue;
            
            connectedCities.add(cityId);
            
            // Find all connected cities
            railConnections.forEach(conn => {
              if (conn.from === cityId && !connectedCities.has(conn.to)) {
                toVisit.push(conn.to);
              } else if (conn.to === cityId && !connectedCities.has(conn.from)) {
                toVisit.push(conn.from);
              }
            });
          }
          
          // If all unlocked cities are in the connected set
          shouldUnlock = unlockedCities.every(city => connectedCities.has(city.id));
          break;
          
        case 'future_visionary':
          shouldUnlock = currentEra.id === 'information';
          break;
      }
      
      if (shouldUnlock) {
        achievement.unlocked = true;
        achievement.dateUnlocked = new Date().toISOString();
        achievementsUpdated = true;
        
        // Add notification and update points
        const newNotifications = [
          ...get().notifications,
          {
            id: Date.now() + Math.random(),
            message: `Achievement Unlocked: ${achievement.title}! +${achievement.rewardPoints} points`,
            type: 'success'
          }
        ];
        
        const newPoints = get().playerPoints + achievement.rewardPoints;
        
        // Update player rank if needed
        const currentRank = get().playerRank;
        const newRank = playerRanks
          .slice()
          .reverse()
          .find(rank => newPoints >= rank.minPoints) || playerRanks[0];
        
        set({
          notifications: newNotifications,
          playerPoints: newPoints,
          playerRank: newRank.id !== currentRank.id ? newRank : currentRank
        });
      }
    });
    
    if (achievementsUpdated) {
      set({ achievements: updatedAchievements });
    }
  },
  
  // Actions
  selectCity: (cityId) => set({ selectedCity: cityId }),
  
  advanceDay: () => {
    const { 
      day, currentSeason, buildingInProgress, trainsInProgress, 
      resources, stats
    } = get();
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
        
        // Track total money earned for stats
        if (resource === 'money') {
          stats.totalMoneyEarned += amount;
        }
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
    
    // Update stats
    const updatedStats = {
      ...stats,
      totalBuildingsConstructed: stats.totalBuildingsConstructed + completedBuildings.length,
      totalTrainsBuilt: stats.totalTrainsBuilt + completedTrains.length,
      totalDaysPlayed: stats.totalDaysPlayed + 1
    };
    
    // Set the new game state
    set({
      day: newDay,
      currentSeason: newSeason,
      resources: newResources,
      cities: updatedCitiesWithUnlocks,
      buildingInProgress: remainingBuildingProgress,
      trainsInProgress: remainingTrainProgress,
      trains: newTrains,
      notifications: [...get().notifications, ...newNotifications].slice(-10), // Keep only the 10 most recent
      stats: updatedStats
    });
    
    // Check for quest progress and achievements
    get().checkQuestProgress();
    get().checkAchievements();
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
    const { resources, cities, railConnections, stats } = get();
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
    const updatedStats = {
      ...stats,
      totalRailConnectionsBuilt: stats.totalRailConnectionsBuilt + 1
    };
    
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
      ].slice(-10),
      stats: updatedStats
    });
    
    // Check for first connection achievement
    if (railConnections.length === 0) {
      // Find and trigger the first railway story event
      const firstRailwayEvent = storyEvents.find(event => event.id === 'first_railway');
      if (firstRailwayEvent && !get().viewedStoryEvents.includes(firstRailwayEvent.id)) {
        const pendingStoryEvents = [...get().pendingStoryEvents, firstRailwayEvent.id];
        set({ pendingStoryEvents });
      }
    }
    
    // Check for quest progress and achievements
    get().checkQuestProgress();
    get().checkAchievements();
    
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
  
  initializeGame: () => {
    // Initialize quests
    get().initializeQuests();
    
    // Add the game introduction story event
    const introEvent = storyEvents.find(event => event.id === 'game_introduction');
    if (introEvent) {
      set({ 
        pendingStoryEvents: [introEvent.id] 
      });
    }
  },
  
  advanceToNextEra: () => {
    const { currentEra, resources } = get();
    const currentIndex = eras.findIndex(era => era.id === currentEra.id);
    
    if (currentIndex >= eras.length - 1) {
      // Already at the last era
      return false;
    }
    
    const nextEra = eras[currentIndex + 1];
    const requirements = nextEra.unlockRequirements;
    
    // Check requirements
    if (requirements) {
      // Check resources
      for (const [resource, amount] of Object.entries(requirements)) {
        if (resource === 'cities') {
          // Count unlocked cities
          const unlockedCities = get().cities.filter(city => city.unlocked);
          if (unlockedCities.length < amount) {
            set({
              notifications: [
                ...get().notifications,
                {
                  id: Date.now(),
                  message: `Need ${amount} unlocked cities to advance to ${nextEra.name}`,
                  type: 'error'
                }
              ].slice(-10)
            });
            return false;
          }
        } else if ((resources[resource] || 0) < amount) {
          set({
            notifications: [
              ...get().notifications,
              {
                id: Date.now(),
                message: `Need ${amount} ${resource} to advance to ${nextEra.name}`,
                type: 'error'
              }
            ].slice(-10)
          });
          return false;
        }
      }
    }
    
    // Advance to next era
    set({
      currentEra: nextEra,
      playerPoints: get().playerPoints + nextEra.pointValue,
      notifications: [
        ...get().notifications,
        {
          id: Date.now(),
          message: `Advanced to ${nextEra.name}! +${nextEra.pointValue} points`,
          type: 'success'
        }
      ].slice(-10)
    });
    
    // Add era advancement story event if exists
    const eraEvent = storyEvents.find(
      event => event.trigger.type === 'reach_era' && event.trigger.era === nextEra.id
    );
    
    if (eraEvent && !get().viewedStoryEvents.includes(eraEvent.id)) {
      const pendingStoryEvents = [...get().pendingStoryEvents, eraEvent.id];
      set({ pendingStoryEvents });
    }
    
    // Check for quest progress and achievements
    get().checkQuestProgress();
    get().checkAchievements();
    
    return true;
  },
  
  resetGame: () => {
    set(initialState);
    get().initializeGame();
  }
}));