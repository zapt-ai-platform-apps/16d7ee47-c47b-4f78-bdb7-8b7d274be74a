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
    climate: 'temperate'
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
    climate: 'temperate'
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
    climate: 'temperate'
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
    climate: 'temperate'
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
    climate: 'coastal'
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
    climate: 'temperate'
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
    climate: 'cold'
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
    climate: 'cold'
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
    buildTime: 1
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    description: 'Generates income and boosts local economy.',
    cost: { money: 80 },
    production: { money: 10 },
    maintenance: { money: 3 },
    requirements: { era: 'ancient' },
    buildTime: 2
  },
  {
    id: 'coal_mine',
    name: 'Coal Mine',
    description: 'Extracts coal for industry and trains.',
    cost: { money: 150 },
    production: { coal: 12, industry: 3 },
    maintenance: { money: 8 },
    requirements: { era: 'industrial' },
    buildTime: 3
  },
  {
    id: 'factory',
    name: 'Factory',
    description: 'Produces industrial goods.',
    cost: { money: 200, coal: 10 },
    production: { industry: 15, money: 5 },
    maintenance: { money: 10, coal: 2 },
    requirements: { era: 'industrial' },
    buildTime: 4
  },
  {
    id: 'temple',
    name: 'Temple',
    description: 'Increases cultural output and citizen happiness.',
    cost: { money: 100 },
    production: { culture: 10, happiness: 5 },
    maintenance: { money: 4 },
    requirements: { era: 'ancient' },
    buildTime: 2
  },
  {
    id: 'modern_farm',
    name: 'Modern Farm',
    description: 'Advanced farming techniques for increased food production.',
    cost: { money: 250, industry: 15 },
    production: { food: 20 },
    maintenance: { money: 7 },
    requirements: { era: 'modern', buildings: ['farm'] },
    buildTime: 3
  },
  {
    id: 'power_plant',
    name: 'Power Plant',
    description: 'Produces electricity for modern buildings and trains.',
    cost: { money: 350, industry: 25 },
    production: { power: 30, industry: 5 },
    maintenance: { money: 15, coal: 5 },
    requirements: { era: 'modern' },
    buildTime: 5
  },
  {
    id: 'university',
    name: 'University',
    description: 'Advances research and improves technology.',
    cost: { money: 300, culture: 20 },
    production: { research: 15, culture: 5 },
    maintenance: { money: 12 },
    requirements: { era: 'industrial' },
    buildTime: 4
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
    buildTime: 3
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
    buildTime: 4
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
    buildTime: 5
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
    buildTime: 6
  }
];

// Game eras
export const eras = [
  {
    id: 'ancient',
    name: 'Ancient Era',
    description: 'The beginning of railway development with simple technologies.',
    unlockRequirements: null
  },
  {
    id: 'industrial',
    name: 'Industrial Era',
    description: 'Steam power revolutionizes transportation and industry.',
    unlockRequirements: { cities: 2, money: 500 }
  },
  {
    id: 'modern',
    name: 'Modern Era',
    description: 'Advanced technology creates faster and more efficient railways.',
    unlockRequirements: { cities: 4, money: 2000, industry: 500 }
  },
  {
    id: 'information',
    name: 'Information Era',
    description: 'High-speed rail and digital systems transform transportation.',
    unlockRequirements: { cities: 6, money: 5000, research: 1000 }
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
    duration: 3 // in-game days
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
    duration: 3
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
    duration: 3
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
    duration: 3
  }
];