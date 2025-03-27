// City data - Xi'an to Changchun along the railway
export const cities = [
  {
    id: 'xian',
    name: 'Xi\'an',
    description: 'Ancient capital with rich cultural heritage, known for the Terracotta Army.',
    unlocked: true,
    position: { x: 10, y: 80 },
    specialResources: ['cultural_relics', 'tourism'],
    baseProduction: { money: 5, culture: 10, food: 5 },
    buildingSlots: 4,
    climate: 'temperate',
    storyBackground: 'Once the glorious capital of ancient China, Xi\'an stands as a testament to China\'s imperial past. The city walls have witnessed dynasties rise and fall, while the terracotta warriors silently guard Emperor Qin\'s tomb for eternity.',
    pointValue: 200
  },
  {
    id: 'luoyang',
    name: 'Luoyang',
    description: 'Historic city with numerous Buddhist temples and peony gardens.',
    unlocked: false,
    position: { x: 20, y: 70 },
    specialResources: ['religious_sites', 'flowers'],
    baseProduction: { money: 4, culture: 8, food: 6 },
    buildingSlots: 3,
    climate: 'temperate',
    storyBackground: 'Known as the "City of Peonies", Luoyang\'s ancient streets echo with the chants from a thousand Buddhist temples. For centuries, it served as the eastern capital of numerous dynasties, cultivating a unique cultural blend of religion and imperial tradition.',
    pointValue: 250
  },
  {
    id: 'zhengzhou',
    name: 'Zhengzhou',
    description: 'Major transportation hub and capital of Henan Province.',
    unlocked: false,
    position: { x: 30, y: 65 },
    specialResources: ['transportation', 'wheat'],
    baseProduction: { money: 6, industry: 5, food: 7 },
    buildingSlots: 4,
    climate: 'temperate',
    storyBackground: 'Standing at the crossroads of China, Zhengzhou emerged from humble origins to become a vital artery of transportation. The Yellow River\'s floods shaped both the land and the resilient character of its people, who transformed hardship into prosperity.',
    pointValue: 300
  },
  {
    id: 'jinan',
    name: 'Jinan',
    description: 'Known as the "City of Springs" with beautiful natural water sources.',
    unlocked: false,
    position: { x: 45, y: 55 },
    specialResources: ['springs', 'textiles'],
    baseProduction: { money: 5, industry: 6, food: 6 },
    buildingSlots: 3,
    climate: 'temperate',
    storyBackground: 'The "City of Springs" holds secrets beneath its soil - crystal clear waters that burst forth in seventy-two magnificent springs. Legend says each spring has its own spirit, blessing those who respect the harmony between mankind and nature.',
    pointValue: 350
  },
  {
    id: 'tianjin',
    name: 'Tianjin',
    description: 'Major coastal city with a rich history of international trade.',
    unlocked: false,
    position: { x: 55, y: 45 },
    specialResources: ['shipping', 'seafood'],
    baseProduction: { money: 8, industry: 7, food: 5 },
    buildingSlots: 5,
    climate: 'coastal',
    storyBackground: 'Where the Grand Canal meets the sea, Tianjin became China\'s window to the world. European concessions left a legacy of architectural wonders, while the city\'s merchants built fortunes connecting East and West through both goods and ideas.',
    pointValue: 400
  },
  {
    id: 'beijing',
    name: 'Beijing',
    description: 'The capital city with iconic landmarks like the Forbidden City and Great Wall.',
    unlocked: false,
    position: { x: 60, y: 40 },
    specialResources: ['government', 'technology'],
    baseProduction: { money: 10, culture: 12, industry: 9 },
    buildingSlots: 6,
    climate: 'temperate',
    storyBackground: 'The seat of emperors and modern leaders alike, Beijing embodies the soul of China. The Forbidden City stands as a crimson monument to imperial might, while ancient hutongs whisper stories of ordinary lives that shaped the nation\'s destiny.',
    pointValue: 600
  },
  {
    id: 'shenyang',
    name: 'Shenyang',
    description: 'Industrial center with a strong manufacturing base.',
    unlocked: false,
    position: { x: 75, y: 25 },
    specialResources: ['manufacturing', 'steel'],
    baseProduction: { money: 7, industry: 10, food: 4 },
    buildingSlots: 5,
    climate: 'cold',
    storyBackground: 'The birthplace of the Qing Dynasty transformed into a furnace of industry, where steel and ambition forge the nation\'s future. Beneath its industrial facade, the Manchu legacy continues in traditions preserved through centuries of change.',
    pointValue: 800
  },
  {
    id: 'changchun',
    name: 'Changchun',
    description: 'Known for automobile manufacturing and as the capital of Jilin Province.',
    unlocked: false,
    position: { x: 85, y: 15 },
    specialResources: ['automobiles', 'education'],
    baseProduction: { money: 8, industry: 11, food: 5 },
    buildingSlots: 5,
    climate: 'cold',
    storyBackground: 'From the last emperor\'s puppet capital to China\'s automotive heartland, Changchun represents reinvention through adversity. Snow blankets the city for half the year, but the warmth of innovation never ceases in this northern frontier.',
    pointValue: 1000
  }
];

// Building types
export const buildings = [
  {
    id: 'farm',
    name: 'Farm',
    description: 'Produces food for your population.',
    cost: { money: 50 },
    production: { food: 8 },
    maintenance: { money: 2 },
    requirements: { era: 'ancient' },
    buildTime: 1,
    image: 'farm'
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    description: 'Generates income and boosts local economy.',
    cost: { money: 80 },
    production: { money: 10 },
    maintenance: { money: 3 },
    requirements: { era: 'ancient' },
    buildTime: 2,
    image: 'marketplace'
  },
  {
    id: 'coal_mine',
    name: 'Coal Mine',
    description: 'Extracts coal for industry and trains.',
    cost: { money: 150 },
    production: { coal: 12, industry: 3 },
    maintenance: { money: 8 },
    requirements: { era: 'industrial' },
    buildTime: 3,
    image: 'coal_mine'
  },
  {
    id: 'factory',
    name: 'Factory',
    description: 'Produces industrial goods.',
    cost: { money: 200, coal: 10 },
    production: { industry: 15, money: 5 },
    maintenance: { money: 10, coal: 2 },
    requirements: { era: 'industrial' },
    buildTime: 4,
    image: 'factory'
  },
  {
    id: 'temple',
    name: 'Temple',
    description: 'Increases cultural output and citizen happiness.',
    cost: { money: 100 },
    production: { culture: 10, happiness: 5 },
    maintenance: { money: 4 },
    requirements: { era: 'ancient' },
    buildTime: 2,
    image: 'temple'
  },
  {
    id: 'modern_farm',
    name: 'Modern Farm',
    description: 'Advanced farming techniques for increased food production.',
    cost: { money: 250, industry: 15 },
    production: { food: 20 },
    maintenance: { money: 7 },
    requirements: { era: 'modern', buildings: ['farm'] },
    buildTime: 3,
    image: 'modern_farm'
  },
  {
    id: 'power_plant',
    name: 'Power Plant',
    description: 'Produces electricity for modern buildings and trains.',
    cost: { money: 350, industry: 25 },
    production: { power: 30, industry: 5 },
    maintenance: { money: 15, coal: 5 },
    requirements: { era: 'modern' },
    buildTime: 5,
    image: 'power_plant'
  },
  {
    id: 'university',
    name: 'University',
    description: 'Advances research and improves technology.',
    cost: { money: 300, culture: 20 },
    production: { research: 15, culture: 5 },
    maintenance: { money: 12 },
    requirements: { era: 'industrial' },
    buildTime: 4,
    image: 'university'
  }
];

// Train types
export const trains = [
  {
    id: 'steam_locomotive',
    name: 'Steam Locomotive',
    description: 'Early train powered by coal and steam.',
    cost: { money: 200, industry: 10 },
    speed: 1,
    capacity: { passengers: 30, freight: 40 },
    maintenance: { money: 10, coal: 5 },
    requirements: { era: 'industrial' },
    buildTime: 3,
    image: 'steam_locomotive'
  },
  {
    id: 'diesel_locomotive',
    name: 'Diesel Locomotive',
    description: 'More efficient train with diesel engines.',
    cost: { money: 400, industry: 25 },
    speed: 2,
    capacity: { passengers: 50, freight: 70 },
    maintenance: { money: 15, oil: 4 },
    requirements: { era: 'modern' },
    buildTime: 4,
    image: 'diesel_locomotive'
  },
  {
    id: 'electric_train',
    name: 'Electric Train',
    description: 'Clean and fast train powered by electricity.',
    cost: { money: 600, industry: 40 },
    speed: 3,
    capacity: { passengers: 80, freight: 60 },
    maintenance: { money: 20, power: 8 },
    requirements: { era: 'modern', buildings: ['power_plant'] },
    buildTime: 5,
    image: 'electric_train'
  },
  {
    id: 'high_speed_train',
    name: 'High-Speed Train',
    description: 'Ultra-fast modern train for passenger transport.',
    cost: { money: 1000, industry: 70, research: 30 },
    speed: 5,
    capacity: { passengers: 120, freight: 30 },
    maintenance: { money: 30, power: 15 },
    requirements: { era: 'information', buildings: ['power_plant', 'university'] },
    buildTime: 6,
    image: 'high_speed_train'
  }
];

// Game eras
export const eras = [
  {
    id: 'ancient',
    name: 'Ancient Era',
    description: 'The beginning of railway development with simple technologies.',
    unlockRequirements: null,
    storyText: 'As the first imperial railways connect the ancient cities, a new era dawns for China. The emperor\'s mandate brings iron tracks across landscapes previously traversed only by foot and hoof.',
    pointValue: 100
  },
  {
    id: 'industrial',
    name: 'Industrial Era',
    description: 'Steam power revolutionizes transportation and industry.',
    unlockRequirements: { cities: 2, money: 500 },
    storyText: 'Black smoke billows across the countryside as steam power transforms the nation. Foreign technologies merge with Chinese ingenuity, creating unstoppable momentum toward industrialization.',
    pointValue: 250
  },
  {
    id: 'modern',
    name: 'Modern Era',
    description: 'Advanced technology creates faster and more efficient railways.',
    unlockRequirements: { cities: 4, money: 2000, industry: 500 },
    storyText: 'The old ways give way to the new as electricity illuminates stations that once flickered by lantern light. The railway becomes more than transportation—it becomes the backbone of a nation finding its modern identity.',
    pointValue: 500
  },
  {
    id: 'information',
    name: 'Information Era',
    description: 'High-speed rail and digital systems transform transportation.',
    unlockRequirements: { cities: 6, money: 5000, research: 1000 },
    storyText: 'At speeds once thought impossible, bullet trains shrink the vast distances of China. Digital networks connect not just cities but minds, ushering in a new age where information flows as freely as passengers along the gleaming tracks.',
    pointValue: 1000
  }
];

// Seasons affecting gameplay
export const seasons = [
  {
    id: 'spring',
    name: 'Spring',
    description: 'Planting season with occasional rain.',
    effects: {
      agriculture: 1.2,
      construction: 1.0,
      tourism: 1.1,
      train_speed: 1.0
    },
    visualEffects: {
      background: 'spring_bg',
      color_filter: 'rgba(76, 175, 80, 0.1)'
    },
    duration: 3, // in-game days
    storyText: 'Cherry blossoms drift across the railway tracks as farmers return to their fields. Spring rains nourish the earth, promising abundance if managed wisely.'
  },
  {
    id: 'summer',
    name: 'Summer',
    description: 'Hot weather increases energy consumption and tourism.',
    effects: {
      agriculture: 1.0,
      construction: 0.9,
      tourism: 1.3,
      train_speed: 1.0
    },
    visualEffects: {
      background: 'summer_bg',
      color_filter: 'rgba(255, 235, 59, 0.1)'
    },
    duration: 3,
    storyText: 'Heat ripples above the iron rails as tourists flock to scenic destinations. In the shade of station eaves, travelers exchange stories while waiting for the next departure.'
  },
  {
    id: 'autumn',
    name: 'Autumn',
    description: 'Harvest season is optimal for construction.',
    effects: {
      agriculture: 1.4,
      construction: 1.2,
      tourism: 1.0,
      train_speed: 1.0
    },
    visualEffects: {
      background: 'autumn_bg',
      color_filter: 'rgba(230, 81, 0, 0.1)'
    },
    duration: 3,
    storyText: 'Golden fields surround the railway as the harvest reaches its peak. Workers rush to complete construction projects before winter\'s arrival, creating a buzz of activity throughout the network.'
  },
  {
    id: 'winter',
    name: 'Winter',
    description: 'Snow affects railway operations.',
    effects: {
      agriculture: 0.6,
      construction: 0.8,
      tourism: 0.7,
      train_speed: 0.8
    },
    visualEffects: {
      background: 'winter_bg',
      color_filter: 'rgba(176, 190, 197, 0.2)'
    },
    duration: 3,
    storyText: 'Snow blankets the landscape, transforming the railway into threads of black against pristine white. Engineers battle the elements to keep the trains running, their breath forming clouds in the frigid air.'
  }
];

// Quests and objectives for player progression
export const quests = [
  {
    id: 'establish_xian',
    title: 'Imperial Beginnings',
    description: 'Develop Xi\'an as your starting point for the railway network.',
    objectives: [
      { type: 'build_building', target: 'farm', count: 1, cityId: 'xian' },
      { type: 'build_building', target: 'marketplace', count: 1, cityId: 'xian' }
    ],
    rewards: { 
      points: 200, 
      resources: { money: 100, food: 50 },
      unlocks: []
    },
    requiredQuestIds: [],
    storyText: 'The ancient city of Xi\'an has been chosen as the starting point for your ambitious railway project. The emperor\'s court believes connecting the old capital to the rest of China will bring prosperity and unity to the realm.',
    image: 'xian_quest'
  },
  {
    id: 'expand_to_luoyang',
    title: 'Eastern Connection',
    description: 'Build your first railway connection to Luoyang and develop the city.',
    objectives: [
      { type: 'connect_cities', sourceId: 'xian', targetId: 'luoyang' },
      { type: 'build_building', target: 'temple', count: 1, cityId: 'luoyang' }
    ],
    rewards: { 
      points: 250, 
      resources: { money: 150, culture: 50 },
      unlocks: []
    },
    requiredQuestIds: ['establish_xian'],
    storyText: 'The local officials in Luoyang have petitioned for a railway connection to Xi\'an. They believe linking these two ancient capitals will revive historical trade routes and bring prosperity to both cities.',
    image: 'luoyang_quest'
  },
  {
    id: 'first_train',
    title: 'Iron Horse',
    description: 'Build your first train to begin transportation between cities.',
    objectives: [
      { type: 'build_train', target: 'steam_locomotive', count: 1 }
    ],
    rewards: { 
      points: 300, 
      resources: { industry: 100 },
      unlocks: []
    },
    requiredQuestIds: ['expand_to_luoyang'],
    storyText: 'The concept of the "iron horse" has captured the imagination of the people. Many are skeptical that such a machine can move without animals to pull it, but you\'re determined to prove them wrong.',
    image: 'first_train_quest'
  },
  {
    id: 'industrial_revolution',
    title: 'Industrial Revolution',
    description: 'Embrace industrial technology to advance your railway empire.',
    objectives: [
      { type: 'reach_era', target: 'industrial' },
      { type: 'build_building', target: 'coal_mine', count: 1 },
      { type: 'build_building', target: 'factory', count: 1 }
    ],
    rewards: { 
      points: 400, 
      resources: { money: 300, industry: 200, coal: 100 },
      unlocks: ['diesel_locomotive']
    },
    requiredQuestIds: ['first_train'],
    storyText: 'Foreign technologies are transforming China\'s ancient landscape. Some traditionalists resist, but the emperor has declared that China must modernize to prevent further humiliation by outside powers.',
    image: 'industrial_quest'
  },
  {
    id: 'capital_connection',
    title: 'The Dragon\'s Spine',
    description: 'Connect Xi\'an to Beijing, forming the central backbone of your railway network.',
    objectives: [
      { type: 'connect_cities', sourceId: 'zhengzhou', targetId: 'jinan' },
      { type: 'connect_cities', sourceId: 'jinan', targetId: 'tianjin' },
      { type: 'connect_cities', sourceId: 'tianjin', targetId: 'beijing' }
    ],
    rewards: { 
      points: 600, 
      resources: { money: 500, culture: 200, industry: 300 },
      unlocks: []
    },
    requiredQuestIds: ['industrial_revolution'],
    storyText: 'The emperor has decreed that the capital must be connected to the ancient imperial seat. This central railway line will be known as the Dragon\'s Spine, uniting north and south under imperial authority.',
    image: 'beijing_quest'
  },
  {
    id: 'modern_china',
    title: 'Modern China',
    description: 'Lead China into the modern era with advanced railway technology.',
    objectives: [
      { type: 'reach_era', target: 'modern' },
      { type: 'build_building', target: 'power_plant', count: 1 },
      { type: 'build_train', target: 'electric_train', count: 1 }
    ],
    rewards: { 
      points: 700, 
      resources: { money: 600, research: 300, power: 200 },
      unlocks: []
    },
    requiredQuestIds: ['capital_connection'],
    storyText: 'A new China emerges from centuries of tradition, looking to forge its own path to modernity. Electricity transforms cities once lit only by flame, and the railway becomes a symbol of this national transformation.',
    image: 'modern_china_quest'
  },
  {
    id: 'northern_frontier',
    title: 'Northern Frontier',
    description: 'Extend your railway network to the northern cities of Shenyang and Changchun.',
    objectives: [
      { type: 'connect_cities', sourceId: 'beijing', targetId: 'shenyang' },
      { type: 'connect_cities', sourceId: 'shenyang', targetId: 'changchun' },
      { type: 'build_building', target: 'university', count: 1, cityId: 'changchun' }
    ],
    rewards: { 
      points: 800, 
      resources: { money: 800, industry: 500, research: 400 },
      unlocks: []
    },
    requiredQuestIds: ['modern_china'],
    storyText: 'The harsh northern territories hold both challenge and promise. Military strategists believe railway connections to Manchuria are essential for national security, while economists eye the region\'s industrial potential.',
    image: 'northern_quest'
  },
  {
    id: 'information_age',
    title: 'Information Age',
    description: 'Lead China into the future with high-speed rail and information technology.',
    objectives: [
      { type: 'reach_era', target: 'information' },
      { type: 'build_train', target: 'high_speed_train', count: 1 }
    ],
    rewards: { 
      points: 1000, 
      resources: { money: 1000, research: 800, culture: 500 },
      unlocks: []
    },
    requiredQuestIds: ['northern_frontier'],
    storyText: 'The world has transformed beyond recognition from when you first laid rails in Xi\'an. Now, bullet trains connecting China\'s major cities symbolize the nation\'s spectacular rise to prominence on the world stage.',
    image: 'information_age_quest'
  }
];

// Game achievements
export const achievements = [
  {
    id: 'first_connection',
    title: 'First Steps',
    description: 'Build your first railway connection between two cities.',
    rewardPoints: 100,
    hidden: false,
    icon: 'achievement_railway'
  },
  {
    id: 'industrial_pioneer',
    title: 'Industrial Pioneer',
    description: 'Reach the Industrial Era.',
    rewardPoints: 200,
    hidden: false,
    icon: 'achievement_industry'
  },
  {
    id: 'city_developer',
    title: 'City Planner',
    description: 'Build all available building types in a single city.',
    rewardPoints: 300,
    hidden: false,
    icon: 'achievement_buildings'
  },
  {
    id: 'train_collector',
    title: 'Train Enthusiast',
    description: 'Build at least one of each train type.',
    rewardPoints: 400,
    hidden: false,
    icon: 'achievement_trains'
  },
  {
    id: 'economic_powerhouse',
    title: 'Economic Powerhouse',
    description: 'Accumulate 10,000 money.',
    rewardPoints: 500,
    hidden: false,
    icon: 'achievement_money'
  },
  {
    id: 'master_networker',
    title: 'Master Networker',
    description: 'Connect all cities with railway lines.',
    rewardPoints: 800,
    hidden: false,
    icon: 'achievement_network'
  },
  {
    id: 'future_visionary',
    title: 'Future Visionary',
    description: 'Reach the Information Era.',
    rewardPoints: 1000,
    hidden: false,
    icon: 'achievement_future'
  }
];

// Historical characters that appear in the game
export const characters = [
  {
    id: 'emperor',
    name: 'Emperor Guangxu',
    role: 'The Reform-Minded Emperor',
    description: 'A progressive young emperor who believes in modernizing China through railway development and western technologies.',
    image: 'emperor_guangxu',
    dialogues: [
      {
        id: 'welcome',
        text: 'The future of our great civilization depends on embracing new ways while honoring our traditions. Build this railway network, and you build the new China!'
      },
      {
        id: 'industrial_era',
        text: 'These foreign machines may seem strange, but they will strengthen our empire. We must master their technologies before others use them against us.'
      },
      {
        id: 'capital_connection',
        text: 'You have connected our ancient and modern capitals! This is a momentous achievement for the empire. Continue your excellent work.'
      }
    ]
  },
  {
    id: 'merchant',
    name: 'Wu Tingfang',
    role: 'Merchant Guild Leader',
    description: 'A wealthy merchant who sees the commercial potential of railways and supports modernization efforts.',
    image: 'merchant_wu',
    dialogues: [
      {
        id: 'welcome',
        text: 'These railways will bring prosperity to all who embrace them! My guild will support your efforts, as long as you remember who your friends are when success comes.'
      },
      {
        id: 'marketplace_built',
        text: 'Excellent! With each marketplace constructed, we strengthen the commercial backbone of our nation. Trade is the lifeblood of progress.'
      },
      {
        id: 'economic_milestone',
        text: 'Your treasury grows impressively! Perhaps you have the soul of a merchant beneath that railway engineer\'s exterior.'
      }
    ]
  },
  {
    id: 'engineer',
    name: 'Li Zhenshu',
    role: 'Chief Railway Engineer',
    description: 'A brilliant engineer who studied in Europe and returned to help build China\'s railway system.',
    image: 'engineer_li',
    dialogues: [
      {
        id: 'welcome',
        text: 'These western technologies can be adapted to our needs. I studied their methods for years, but it will take Chinese ingenuity to make them work on our soil and terrain.'
      },
      {
        id: 'first_train',
        text: 'The steam locomotive is just the beginning! With each advancement, we learn more about what is possible. Soon we will be teaching the foreigners about railway engineering.'
      },
      {
        id: 'modern_era',
        text: 'Electricity changes everything! Our modern electric trains will transform transportation in ways the first railway builders could never imagine.'
      }
    ]
  },
  {
    id: 'scholar',
    name: 'Zhang Meiling',
    role: 'Imperial Historian',
    description: 'A traditionalist scholar who documents the cultural impact of modernization with mixed feelings.',
    image: 'scholar_zhang',
    dialogues: [
      {
        id: 'welcome',
        text: 'I document these changes for future generations, though I wonder if we are losing something precious even as we gain something new. Will the railway bring wisdom as quickly as it brings goods?'
      },
      {
        id: 'temple_built',
        text: 'I am pleased to see you have not forgotten our spiritual heritage amid all this metal and steam. The temples remind us who we truly are as a people.'
      },
      {
        id: 'university_built',
        text: 'Knowledge must bridge the old and new worlds. These universities will train minds that understand both traditional wisdom and modern science—a necessity for China\'s future.'
      }
    ]
  }
];

// Story events that trigger at specific game milestones
export const storyEvents = [
  {
    id: 'game_introduction',
    title: 'The Emperor\'s Mandate',
    description: 'You have been summoned to the Imperial Palace and given an extraordinary task.',
    trigger: { type: 'game_start' },
    content: `The year is 1876. The Qing Dynasty still rules China, but foreign powers circle like vultures, exploiting the empire's weaknesses. 

Emperor Guangxu, young and reform-minded, has summoned you to the Forbidden City. Despite your humble origins, your reputation as an engineering genius has reached the imperial court.

"The foreigners have their railways," the Emperor tells you, his voice quiet but commanding. "And now China must have its own. You will build a great railway network, beginning at Xi'an, our ancient capital, and extending to Changchun in the north."

This is more than an infrastructure project—it is a battle for China's future. The railway will be the dragon's spine, connecting the imperial heartland and strengthening the nation against outside threats.

With a scroll bearing the imperial seal, you depart the palace. The task ahead is monumental, but failure is not an option. China's destiny runs on the rails you will build.`,
    image: 'story_introduction',
    choices: [
      {
        text: 'I will not fail the Emperor or China',
        outcome: 'Your determination is noted by the imperial court. You receive an additional 100 money to begin your railway project.'
      }
    ]
  },
  {
    id: 'first_railway',
    title: 'The Iron Dragon Awakens',
    description: 'Your first railway connection is complete, marking a historic moment.',
    trigger: { type: 'first_connection' },
    content: `A crowd has gathered to witness history. Your first railway connection stands complete, the iron rails gleaming in the sunlight.

The steam locomotive arrives at the station, a mechanical beast billowing smoke. Children hide behind their parents, while elders mutter about disturbed feng shui and angry earth spirits.

Yet when the train comes to a stop and passengers disembark, amazement replaces fear. What would have been a journey of days has been completed in hours.

A local official reads a proclamation: "Let it be known that on this day, the province has entered a new age. The Dragon's Path of Iron now connects our cities, as the Emperor in his wisdom has ordained."

That night, firecrackers burst in celebration, and even the skeptics must admit that a new era has begun. Your name is spoken with respect—the railway builder who is transforming China one rail at a time.`,
    image: 'story_first_railway',
    choices: [
      {
        text: 'This is just the beginning of our great work',
        outcome: 'Your vision inspires those around you. Construction speed increases temporarily for your next project.'
      }
    ]
  },
  {
    id: 'industrial_era_event',
    title: 'Smoke and Progress',
    description: 'The industrial revolution transforms the landscape and society.',
    trigger: { type: 'reach_era', era: 'industrial' },
    content: `Factories rise alongside ancient temples, their chimneys reaching toward heaven like new-age pagodas. The rhythm of China has changed—now measured not just by seasons and imperial decrees, but by the clock and the factory whistle.

Foreign advisors have arrived to assist with industrial development, bringing expertise but also arrogance. The imperial court debates the wisdom of allowing such influence, even as they recognize its necessity.

In teahouses and markets, people speak of "self-strengthening"—adopting foreign technology while maintaining Chinese essence. But can the two truly be separated?

Your railways have become the symbol of this transformation. For better or worse, you are changing the face of China, one steam-powered step at a time.

As you oversee the construction of another factory, you notice a group of workers learning to read technical manuals. "We must understand the foreigner's knowledge," one tells you, "but use it in our own way."`,
    image: 'story_industrial_era',
    choices: [
      {
        text: 'Embrace industrial progress fully',
        outcome: 'Your commitment to industrialization increases production efficiency by 10% but decreases happiness by 5%.'
      },
      {
        text: 'Balance tradition with new technologies',
        outcome: 'Your balanced approach increases happiness by 5% but slightly slows industrial production.'
      }
    ]
  },
  {
    id: 'beijing_connection',
    title: 'The Dragon's Spine is Complete',
    description: 'The railway connecting Xi'an to Beijing marks a triumph of engineering and imperial will.',
    trigger: { type: 'complete_quest', questId: 'capital_connection' },
    content: `Flags and banners line the newly completed railway from Xi'an to Beijing. The Emperor himself has arrived to commemorate this historical achievement—the ancient and modern capitals now joined by the iron dragon's path.

"This railway is more than a means of transportation," the Emperor announces to the assembled dignitaries. "It is the physical manifestation of China's unity and determination to forge its own future."

Foreign ambassadors observe with mixed expressions—admiration for the technical achievement, concern for what a modernizing China might mean for their nations' interests in the region.

As the ceremonial golden spike is driven into the final rail tie, you feel the weight of history. Dynasties have risen and fallen, but few have witnessed such rapid transformation as China is now experiencing.

The inaugural train journey from Beijing to Xi'an will carry imperial officials, foreign dignitaries, and common citizens selected by lottery—a symbolic unification of old and new, elite and common, brought together by your vision made real.`,
    image: 'story_beijing_connection',
    choices: [
      {
        text: 'This achievement belongs to all of China',
        outcome: 'Your humility earns you respect. Happiness increases in all connected cities.'
      },
      {
        text: 'We must continue expanding northward',
        outcome: 'Your ambition impresses the imperial court. You receive resources to help with northern expansion.'
      }
    ]
  }
];

// Player ranks based on points
export const playerRanks = [
  {
    id: 'novice',
    title: 'Railway Apprentice',
    minPoints: 0,
    description: 'You are taking your first steps in railway development.',
    perks: ['Basic building options', 'Limited to steam locomotives']
  },
  {
    id: 'engineer',
    title: 'Railway Engineer',
    minPoints: 1000,
    description: 'You have proven your technical expertise in railway construction.',
    perks: ['10% faster construction', 'Access to improved train designs']
  },
  {
    id: 'manager',
    title: 'Network Manager',
    minPoints: 3000,
    description: 'You oversee a growing railway network with increasing efficiency.',
    perks: ['15% resource production boost', '10% reduced maintenance costs']
  },
  {
    id: 'director',
    title: 'Railway Director',
    minPoints: 6000,
    description: 'Your railway system has become crucial to China\'s development.',
    perks: ['20% faster train movement', 'Advanced building options']
  },
  {
    id: 'magnate',
    title: 'Railway Magnate',
    minPoints: 10000,
    description: 'You are a legendary figure in China\'s industrial transformation.',
    perks: ['25% overall efficiency boost', 'Special imperial funding options']
  }
];

// Image placeholders - these would be replaced with actual image paths
export const imageAssets = {
  buildings: {
    farm: 'data-image-request="Traditional Chinese farm with workers planting rice"',
    marketplace: 'data-image-request="Traditional Chinese marketplace with vendors and shoppers"',
    coal_mine: 'data-image-request="Industrial era Chinese coal mine with workers"',
    factory: 'data-image-request="Early Chinese factory with smoke stacks"',
    temple: 'data-image-request="Ancient Chinese temple with ornate roof"',
    modern_farm: 'data-image-request="Modern Chinese agricultural farm with machinery"',
    power_plant: 'data-image-request="Early Chinese power plant with workers"',
    university: 'data-image-request="Traditional Chinese university or academy building"'
  },
  trains: {
    steam_locomotive: 'data-image-request="Historic Chinese steam locomotive"',
    diesel_locomotive: 'data-image-request="Vintage Chinese diesel locomotive"',
    electric_train: 'data-image-request="Early Chinese electric train"',
    high_speed_train: 'data-image-request="Modern Chinese high-speed bullet train"'
  },
  quests: {
    xian_quest: 'data-image-request="Ancient city of Xi\'an with city walls and pagoda"',
    luoyang_quest: 'data-image-request="Historic Luoyang city with Buddhist temples"',
    first_train_quest: 'data-image-request="First Chinese steam train with passengers"',
    industrial_quest: 'data-image-request="Industrial revolution in China with factories and railways"',
    beijing_quest: 'data-image-request="Beijing with Forbidden City and railway"',
    modern_china_quest: 'data-image-request="Modern Chinese city with electricity and trains"',
    northern_quest: 'data-image-request="Snowy northern Chinese landscape with railway"',
    information_age_quest: 'data-image-request="Futuristic Chinese high-speed rail network"'
  },
  characters: {
    emperor_guangxu: 'data-image-request="Portrait of young Chinese Emperor in imperial robes"',
    merchant_wu: 'data-image-request="Wealthy Chinese merchant in traditional clothing"',
    engineer_li: 'data-image-request="Chinese railway engineer with western education"',
    scholar_zhang: 'data-image-request="Female Chinese imperial historian with scrolls"'
  },
  story: {
    story_introduction: 'data-image-request="Imperial Chinese palace meeting with emperor giving mandate"',
    story_first_railway: 'data-image-request="Historic first railway connecting Chinese cities with celebration"',
    story_industrial_era: 'data-image-request="Chinese industrial revolution with factories next to temples"',
    story_beijing_connection: 'data-image-request="Grand ceremony for Beijing railway completion with imperial officials"'
  },
  achievements: {
    achievement_railway: 'data-image-request="Simple icon of connected railway tracks"',
    achievement_industry: 'data-image-request="Simple icon of factory with smoke stack"',
    achievement_buildings: 'data-image-request="Simple icon of multiple building silhouettes"',
    achievement_trains: 'data-image-request="Simple icon of various train types"',
    achievement_money: 'data-image-request="Simple icon of Chinese money or coins"',
    achievement_network: 'data-image-request="Simple icon of complete railway network"',
    achievement_future: 'data-image-request="Simple icon of futuristic bullet train"'
  }
};