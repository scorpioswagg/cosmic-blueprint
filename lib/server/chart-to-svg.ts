import type { NatalChart } from "@/lib/astrological-calculations"

export function generateChartWheelSvg(chart: NatalChart, size = 500): string {
  const centerX = size / 2
  const centerY = size / 2
  const radius = size * 0.45

  // SVG header
  let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`

  // Background circle
  svg += `<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="white" stroke="#6b46c1" stroke-width="2" />`

  // Draw zodiac wheel
  svg += drawZodiacWheelSvg(centerX, centerY, radius)

  // Draw house cusps
  svg += drawHouseCuspsSvg(centerX, centerY, radius, chart.houses)

  // Draw planets
  svg += drawPlanetsSvg(centerX, centerY, radius, chart)

  // Draw aspects
  svg += drawAspectsSvg(centerX, centerY, radius * 0.7, chart.aspects)

  // Close SVG
  svg += "</svg>"

  return svg
}

// Helper function to draw the zodiac wheel
function drawZodiacWheelSvg(centerX: number, centerY: number, radius: number): string {
  const zodiacSigns = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"]
  let svg = ""

  // Draw zodiac segments
  for (let i = 0; i < 12; i++) {
    const startAngle = (i * 30 * Math.PI) / 180
    const endAngle = ((i + 1) * 30 * Math.PI) / 180

    // Calculate points for the segment path
    const x1 = centerX + radius * Math.cos(startAngle)
    const y1 = centerY + radius * Math.sin(startAngle)
    const x2 = centerX + radius * Math.cos(endAngle)
    const y2 = centerY + radius * Math.sin(endAngle)

    // Draw segment
    const largeArcFlag = 0 // 0 for arcs less than 180 degrees
    svg += `<path d="M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z" 
            fill="${i % 2 === 0 ? "rgba(107, 70, 193, 0.1)" : "rgba(107, 70, 193, 0.05)"}" 
            stroke="#6b46c1" stroke-width="1" />`

    // Draw zodiac symbol
    const symbolAngle = startAngle + (15 * Math.PI) / 180
    const symbolX = centerX + radius * 0.85 * Math.cos(symbolAngle)
    const symbolY = centerY + radius * 0.85 * Math.sin(symbolAngle)

    svg += `<text x="${symbolX}" y="${symbolY}" font-size="20" fill="#6b46c1" 
            text-anchor="middle" dominant-baseline="middle">${zodiacSigns[i]}</text>`
  }

  return svg
}

// Helper function to draw house cusps
function drawHouseCuspsSvg(centerX: number, centerY: number, radius: number, houses: any[]): string {
  let svg = ""

  // In a real implementation, we would calculate the exact angles
  // For demonstration purposes, we'll use simplified logic
  for (let i = 0; i < 12; i++) {
    const house = houses[i]
    const signIndex = getSignIndex(house.sign)
    const degree = house.degree

    // Calculate angle in radians
    const baseAngle = ((signIndex * 30 + degree) * Math.PI) / 180

    // Calculate end point of the line
    const endX = centerX + radius * Math.cos(baseAngle)
    const endY = centerY + radius * Math.sin(baseAngle)

    // Draw house cusp line
    svg += `<line x1="${centerX}" y1="${centerY}" x2="${endX}" y2="${endY}" 
            stroke="#4a5568" stroke-width="1" />`

    // Calculate position for house number
    const numberX = centerX + radius * 0.3 * Math.cos(baseAngle)
    const numberY = centerY + radius * 0.3 * Math.sin(baseAngle)

    // Draw house number
    svg += `<text x="${numberX}" y="${numberY}" font-size="12" fill="#4a5568" 
            text-anchor="middle" dominant-baseline="middle">${i + 1}</text>`
  }

  return svg
}

// Helper function to draw planets
function drawPlanetsSvg(centerX: number, centerY: number, radius: number, chart: NatalChart): string {
  let svg = ""

  const planets = [
    { symbol: "☉", body: chart.sun },
    { symbol: "☽", body: chart.moon },
    { symbol: "☿", body: chart.mercury },
    { symbol: "♀", body: chart.venus },
    { symbol: "♂", body: chart.mars },
    { symbol: "♃", body: chart.jupiter },
    { symbol: "♄", body: chart.saturn },
    { symbol: "♅", body: chart.uranus },
    { symbol: "♆", body: chart.neptune },
    { symbol: "♇", body: chart.pluto },
    { symbol: "⚷", body: chart.chiron },
    { symbol: "☊", body: chart.northNode },
    { symbol: "☋", body: chart.southNode },
    { symbol: "Asc", body: chart.ascendant },
  ]

  planets.forEach((planet, index) => {
    const signIndex = getSignIndex(planet.body.sign)
    const degree = planet.body.degree + planet.body.minute / 60

    // Calculate angle in radians
    const angle = ((signIndex * 30 + degree) * Math.PI) / 180

    // Calculate position
    // We'll place planets at different distances from center to avoid overlap
    const distance = radius * (0.5 + (index % 5) * 0.05)
    const x = centerX + distance * Math.cos(angle)
    const y = centerY + distance * Math.sin(angle)

    // Draw circle around planet
    svg += `<circle cx="${x}" cy="${y}" r="12" fill="none" 
            stroke="${planet.body.retrograde ? "#e53e3e" : "#2b6cb0"}" stroke-width="1" />`

    // Draw planet symbol
    svg += `<text x="${x}" y="${y}" font-size="16" 
            fill="${planet.body.retrograde ? "#e53e3e" : "#2b6cb0"}" 
            text-anchor="middle" dominant-baseline="middle">${planet.symbol}</text>`
  })

  return svg
}

// Helper function to draw aspects
function drawAspectsSvg(centerX: number, centerY: number, radius: number, aspects: any[]): string {
  let svg = ""

  // In a real implementation, we would calculate the exact positions of planets
  // For demonstration purposes, we'll use simplified logic
  aspects.forEach((aspect) => {
    // Set line style based on aspect type
    let strokeStyle
    let strokeWidth

    switch (aspect.type) {
      case "Conjunction":
        strokeStyle = "#2b6cb0"
        strokeWidth = 1
        break
      case "Opposition":
        strokeStyle = "#e53e3e"
        strokeWidth = 1
        break
      case "Trine":
        strokeStyle = "#38a169"
        strokeWidth = 1
        break
      case "Square":
        strokeStyle = "#e53e3e"
        strokeWidth = 1
        break
      case "Sextile":
        strokeStyle = "#38a169"
        strokeWidth = 1
        break
      default:
        strokeStyle = "#718096"
        strokeWidth = 0.5
    }

    // Draw aspect line (simplified for demonstration)
    svg += `<line x1="${centerX - radius * 0.5}" y1="${centerY - radius * 0.3}" 
            x2="${centerX + radius * 0.3}" y2="${centerY + radius * 0.4}" 
            stroke="${strokeStyle}" stroke-width="${strokeWidth}" />`
  })

  return svg
}

// Helper function to get sign index
function getSignIndex(sign: string): number {
  const signs = [
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
  return signs.indexOf(sign)
}
