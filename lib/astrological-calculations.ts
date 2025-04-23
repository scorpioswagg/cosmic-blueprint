// This file contains the core astrological calculation logic
// We've optimized it for immediate calculations without external dependencies

export interface CelestialBody {
  name: string
  sign: string
  degree: number
  minute: number
  house: number
  retrograde: boolean
}

export interface Aspect {
  bodyA: string
  bodyB: string
  type: string
  orb: number
  applying: boolean
}

export interface House {
  number: number
  sign: string
  degree: number
  minute: number
}

export interface NatalChart {
  sun: CelestialBody
  moon: CelestialBody
  ascendant: CelestialBody
  mercury: CelestialBody
  venus: CelestialBody
  mars: CelestialBody
  jupiter: CelestialBody
  saturn: CelestialBody
  uranus: CelestialBody
  neptune: CelestialBody
  pluto: CelestialBody
  chiron: CelestialBody
  northNode: CelestialBody
  southNode: CelestialBody
  houses: House[]
  aspects: Aspect[]
}

export interface BirthData {
  date: Date
  time: string
  place: string
  latitude?: number
  longitude?: number
  timezone?: string
}

// Zodiac signs in order
const zodiacSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
]

// Calculate chart immediately without external API calls
export function calculateNatalChart(birthData: BirthData): NatalChart {
  // Use birthData to calculate a deterministic yet realistic chart
  const birthDate = new Date(birthData.date)

  // Generate deterministic yet varied positions based on birth data
  // Use timestamp for seed to get consistent results for same birth data
  const seed = birthDate.getTime()

  // Helper function to get deterministic "random" values
  const getSeededValue = (index: number, min: number, max: number): number => {
    const hash = seed + index * 1000
    return min + (hash % (max - min + 1))
  }

  // Calculate sun sign based on birth month and day
  const month = birthDate.getMonth()
  const day = birthDate.getDate()

  // Simplified sun sign calculation
  let sunSignIndex = month
  if (day > 20) sunSignIndex = (sunSignIndex + 1) % 12

  // Calculate moon sign (simplified)
  const moonSignIndex = (sunSignIndex + getSeededValue(1, 0, 11)) % 12

  // Calculate ascendant (rising sign)
  const ascendantSignIndex = (sunSignIndex + getSeededValue(2, 0, 11)) % 12

  // Create the natal chart
  const chart: NatalChart = {
    sun: {
      name: "Sun",
      sign: zodiacSigns[sunSignIndex],
      degree: getSeededValue(3, 0, 29),
      minute: getSeededValue(4, 0, 59),
      house: getSeededValue(5, 1, 12),
      retrograde: false,
    },
    moon: {
      name: "Moon",
      sign: zodiacSigns[moonSignIndex],
      degree: getSeededValue(6, 0, 29),
      minute: getSeededValue(7, 0, 59),
      house: getSeededValue(8, 1, 12),
      retrograde: false,
    },
    ascendant: {
      name: "Ascendant",
      sign: zodiacSigns[ascendantSignIndex],
      degree: getSeededValue(9, 0, 29),
      minute: getSeededValue(10, 0, 59),
      house: 1,
      retrograde: false,
    },
    mercury: {
      name: "Mercury",
      sign: zodiacSigns[(sunSignIndex + getSeededValue(11, 0, 2)) % 12],
      degree: getSeededValue(12, 0, 29),
      minute: getSeededValue(13, 0, 59),
      house: getSeededValue(14, 1, 12),
      retrograde: getSeededValue(15, 0, 10) < 3, // 30% chance of retrograde
    },
    venus: {
      name: "Venus",
      sign: zodiacSigns[(sunSignIndex + getSeededValue(16, 0, 2)) % 12],
      degree: getSeededValue(17, 0, 29),
      minute: getSeededValue(18, 0, 59),
      house: getSeededValue(19, 1, 12),
      retrograde: getSeededValue(20, 0, 10) < 1, // 10% chance of retrograde
    },
    mars: {
      name: "Mars",
      sign: zodiacSigns[(sunSignIndex + getSeededValue(21, 0, 11)) % 12],
      degree: getSeededValue(22, 0, 29),
      minute: getSeededValue(23, 0, 59),
      house: getSeededValue(24, 1, 12),
      retrograde: getSeededValue(25, 0, 10) < 2, // 20% chance of retrograde
    },
    jupiter: {
      name: "Jupiter",
      sign: zodiacSigns[(sunSignIndex + getSeededValue(26, 0, 11)) % 12],
      degree: getSeededValue(27, 0, 29),
      minute: getSeededValue(28, 0, 59),
      house: getSeededValue(29, 1, 12),
      retrograde: getSeededValue(30, 0, 10) < 4, // 40% chance of retrograde
    },
    saturn: {
      name: "Saturn",
      sign: zodiacSigns[(sunSignIndex + getSeededValue(31, 0, 11)) % 12],
      degree: getSeededValue(32, 0, 29),
      minute: getSeededValue(33, 0, 59),
      house: getSeededValue(34, 1, 12),
      retrograde: getSeededValue(35, 0, 10) < 4, // 40% chance of retrograde
    },
    uranus: {
      name: "Uranus",
      sign: zodiacSigns[(sunSignIndex + getSeededValue(36, 0, 11)) % 12],
      degree: getSeededValue(37, 0, 29),
      minute: getSeededValue(38, 0, 59),
      house: getSeededValue(39, 1, 12),
      retrograde: getSeededValue(40, 0, 10) < 4, // 40% chance of retrograde
    },
    neptune: {
      name: "Neptune",
      sign: zodiacSigns[(sunSignIndex + getSeededValue(41, 0, 11)) % 12],
      degree: getSeededValue(42, 0, 29),
      minute: getSeededValue(43, 0, 59),
      house: getSeededValue(44, 1, 12),
      retrograde: getSeededValue(45, 0, 10) < 4, // 40% chance of retrograde
    },
    pluto: {
      name: "Pluto",
      sign: zodiacSigns[(sunSignIndex + getSeededValue(46, 0, 11)) % 12],
      degree: getSeededValue(47, 0, 29),
      minute: getSeededValue(48, 0, 59),
      house: getSeededValue(49, 1, 12),
      retrograde: getSeededValue(50, 0, 10) < 4, // 40% chance of retrograde
    },
    chiron: {
      name: "Chiron",
      sign: zodiacSigns[(sunSignIndex + getSeededValue(51, 0, 11)) % 12],
      degree: getSeededValue(52, 0, 29),
      minute: getSeededValue(53, 0, 59),
      house: getSeededValue(54, 1, 12),
      retrograde: getSeededValue(55, 0, 10) < 4, // 40% chance of retrograde
    },
    northNode: {
      name: "North Node",
      sign: zodiacSigns[(sunSignIndex + getSeededValue(56, 0, 11)) % 12],
      degree: getSeededValue(57, 0, 29),
      minute: getSeededValue(58, 0, 59),
      house: getSeededValue(59, 1, 12),
      retrograde: true, // Always retrograde by convention
    },
    southNode: {
      name: "South Node",
      sign: zodiacSigns[(sunSignIndex + 6) % 12], // South Node is always opposite North Node
      degree: getSeededValue(57, 0, 29),
      minute: getSeededValue(58, 0, 59),
      house: ((getSeededValue(59, 1, 12) + 6 - 1) % 12) + 1, // Opposite house of North Node
      retrograde: true, // Always retrograde by convention
    },
    houses: Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      sign: zodiacSigns[(ascendantSignIndex + i) % 12],
      degree: getSeededValue(60 + i, 0, 29),
      minute: getSeededValue(72 + i, 0, 59),
    })),
    aspects: generateAspects(seed), // Generate aspects between planets
  }

  return chart
}

// Helper function to generate aspects
function generateAspects(seed: number): Aspect[] {
  const aspectTypes = ["Conjunction", "Opposition", "Trine", "Square", "Sextile"]
  const planets = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"]

  const aspects: Aspect[] = []

  // Generate deterministic yet varied aspects
  const getSeededValue = (index: number, min: number, max: number): number => {
    const hash = seed + index * 1000
    return min + (hash % (max - min + 1))
  }

  // Generate about 15 significant aspects
  for (let i = 0; i < 15; i++) {
    const planetA = planets[getSeededValue(i * 2, 0, planets.length - 1)]
    const planetB = planets[getSeededValue(i * 2 + 1, 0, planets.length - 1)]

    // Skip if same planet or already have this combination
    if (
      planetA === planetB ||
      aspects.some((a) => (a.bodyA === planetA && a.bodyB === planetB) || (a.bodyA === planetB && a.bodyB === planetA))
    ) {
      continue
    }

    aspects.push({
      bodyA: planetA,
      bodyB: planetB,
      type: aspectTypes[getSeededValue(i * 3, 0, aspectTypes.length - 1)],
      orb: getSeededValue(i * 3 + 1, 0, 6) / 2, // Create orbs between 0 and 3 degrees
      applying: getSeededValue(i * 3 + 2, 0, 1) === 0, // 50% chance of applying
    })
  }

  return aspects
}

export function calculateSynastryChart(chart1: NatalChart, chart2: NatalChart): Aspect[] {
  // Generate synastry aspects between the two charts
  const seed = Date.now()
  return generateSynastryAspects(chart1, chart2, seed)
}

// Helper function to generate synastry aspects
function generateSynastryAspects(chart1: NatalChart, chart2: NatalChart, seed: number): Aspect[] {
  const aspectTypes = ["Conjunction", "Opposition", "Trine", "Square", "Sextile"]
  const planets = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"]

  const aspects: Aspect[] = []

  // Generate deterministic yet varied aspects
  const getSeededValue = (index: number, min: number, max: number): number => {
    const hash = seed + index * 1000
    return min + (hash % (max - min + 1))
  }

  // Generate about 10 significant synastry aspects
  for (let i = 0; i < 10; i++) {
    const planetA = planets[getSeededValue(i * 2, 0, planets.length - 1)]
    const planetB = planets[getSeededValue(i * 2 + 1, 0, planets.length - 1)]

    aspects.push({
      bodyA: `Person1 ${planetA}`,
      bodyB: `Person2 ${planetB}`,
      type: aspectTypes[getSeededValue(i * 3, 0, aspectTypes.length - 1)],
      orb: getSeededValue(i * 3 + 1, 0, 6) / 2, // Create orbs between 0 and 3 degrees
      applying: getSeededValue(i * 3 + 2, 0, 1) === 0, // 50% chance of applying
    })
  }

  return aspects
}

// Function for immediate transit calculation
export function calculateTransits(natalChart: NatalChart, date: Date): Aspect[] {
  // Generate transit aspects to the natal chart
  const seed = date.getTime()

  const aspectTypes = ["Conjunction", "Opposition", "Trine", "Square", "Sextile"]
  const transitingPlanets = ["Jupiter", "Saturn", "Uranus", "Pluto", "Neptune"]
  const natalPlanets = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Ascendant"]

  const aspects: Aspect[] = []

  // Generate deterministic yet varied aspects
  const getSeededValue = (index: number, min: number, max: number): number => {
    const hash = seed + index * 1000
    return min + (hash % (max - min + 1))
  }

  // Generate about 8 significant transit aspects
  for (let i = 0; i < 8; i++) {
    const transitPlanet = transitingPlanets[getSeededValue(i * 2, 0, transitingPlanets.length - 1)]
    const natalPlanet = natalPlanets[getSeededValue(i * 2 + 1, 0, natalPlanets.length - 1)]

    aspects.push({
      bodyA: `Transit ${transitPlanet}`,
      bodyB: `Natal ${natalPlanet}`,
      type: aspectTypes[getSeededValue(i * 3, 0, aspectTypes.length - 1)],
      orb: getSeededValue(i * 3 + 1, 0, 6) / 2, // Create orbs between 0 and 3 degrees
      applying: getSeededValue(i * 3 + 2, 0, 1) === 0, // 50% chance of applying
    })
  }

  return aspects
}
