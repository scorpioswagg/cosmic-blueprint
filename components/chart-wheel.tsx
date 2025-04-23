"use client"

import { useEffect, useRef } from "react"
import type { NatalChart } from "@/lib/astrological-calculations"

interface ChartWheelProps {
  chart: NatalChart
  size?: number
}

export function ChartWheel({ chart, size = 500 }: ChartWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Set dimensions
    canvas.width = size
    canvas.height = size
    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.45

    // Draw outer circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = "#6b46c1"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw zodiac wheel
    drawZodiacWheel(ctx, centerX, centerY, radius)

    // Draw house cusps
    drawHouseCusps(ctx, centerX, centerY, radius, chart.houses)

    // Draw planets
    drawPlanets(ctx, centerX, centerY, radius, chart)

    // Draw aspects
    drawAspects(ctx, centerX, centerY, radius * 0.7, chart.aspects)
  }, [chart, size])

  // Helper function to draw the zodiac wheel
  const drawZodiacWheel = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
    const zodiacSigns = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"]

    // Draw zodiac segments
    for (let i = 0; i < 12; i++) {
      const startAngle = (i * 30 * Math.PI) / 180
      const endAngle = ((i + 1) * 30 * Math.PI) / 180

      // Draw segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = i % 2 === 0 ? "rgba(107, 70, 193, 0.1)" : "rgba(107, 70, 193, 0.05)"
      ctx.fill()
      ctx.stroke()

      // Draw zodiac symbol
      const symbolAngle = startAngle + (15 * Math.PI) / 180
      const symbolX = centerX + radius * 0.85 * Math.cos(symbolAngle)
      const symbolY = centerY + radius * 0.85 * Math.sin(symbolAngle)

      ctx.font = "20px Arial"
      ctx.fillStyle = "#6b46c1"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(zodiacSigns[i], symbolX, symbolY)
    }
  }

  // Helper function to draw house cusps
  const drawHouseCusps = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    houses: any[],
  ) => {
    // In a real implementation, we would calculate the exact angles
    // For demonstration purposes, we'll use simplified logic
    for (let i = 0; i < 12; i++) {
      const house = houses[i]
      const signIndex = getSignIndex(house.sign)
      const degree = house.degree

      // Calculate angle in radians
      const baseAngle = ((signIndex * 30 + degree) * Math.PI) / 180

      // Draw house cusp line
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + radius * Math.cos(baseAngle), centerY + radius * Math.sin(baseAngle))
      ctx.strokeStyle = "#4a5568"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw house number
      const numberX = centerX + radius * 0.3 * Math.cos(baseAngle)
      const numberY = centerY + radius * 0.3 * Math.sin(baseAngle)

      ctx.font = "12px Arial"
      ctx.fillStyle = "#4a5568"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText((i + 1).toString(), numberX, numberY)
    }
  }

  // Helper function to draw planets
  const drawPlanets = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    chart: NatalChart,
  ) => {
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
      // In a real implementation, we would use a more sophisticated algorithm
      const distance = radius * (0.5 + (index % 5) * 0.05)
      const x = centerX + distance * Math.cos(angle)
      const y = centerY + distance * Math.sin(angle)

      // Draw planet symbol
      ctx.font = "16px Arial"
      ctx.fillStyle = planet.body.retrograde ? "#e53e3e" : "#2b6cb0"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(planet.symbol, x, y)

      // Draw small circle around planet
      ctx.beginPath()
      ctx.arc(x, y, 12, 0, 2 * Math.PI)
      ctx.strokeStyle = planet.body.retrograde ? "#e53e3e" : "#2b6cb0"
      ctx.lineWidth = 1
      ctx.stroke()
    })
  }

  // Helper function to draw aspects
  const drawAspects = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    aspects: any[],
  ) => {
    // In a real implementation, we would calculate the exact positions of planets
    // For demonstration purposes, we'll use simplified logic
    aspects.forEach((aspect) => {
      // Draw aspect line
      ctx.beginPath()
      ctx.moveTo(centerX - radius * 0.5, centerY - radius * 0.3)
      ctx.lineTo(centerX + radius * 0.3, centerY + radius * 0.4)

      // Set line style based on aspect type
      switch (aspect.type) {
        case "Conjunction":
          ctx.strokeStyle = "#2b6cb0"
          ctx.lineWidth = 1
          break
        case "Opposition":
          ctx.strokeStyle = "#e53e3e"
          ctx.lineWidth = 1
          break
        case "Trine":
          ctx.strokeStyle = "#38a169"
          ctx.lineWidth = 1
          break
        case "Square":
          ctx.strokeStyle = "#e53e3e"
          ctx.lineWidth = 1
          break
        case "Sextile":
          ctx.strokeStyle = "#38a169"
          ctx.lineWidth = 1
          break
        default:
          ctx.strokeStyle = "#718096"
          ctx.lineWidth = 0.5
      }

      ctx.stroke()
    })
  }

  // Helper function to get sign index
  const getSignIndex = (sign: string) => {
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

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} width={size} height={size} className="max-w-full h-auto" />
    </div>
  )
}
