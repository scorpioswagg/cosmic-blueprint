"use client"

import { useState, useEffect } from "react"
import { ChartWheel } from "@/components/chart-wheel"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { calculateNatalChart, type BirthData, type NatalChart } from "@/lib/astrological-calculations"

export default function ChartPreviewPage() {
  const [chart, setChart] = useState<NatalChart | null>(null)
  const [loading, setLoading] = useState(false)

  // For demonstration purposes, we'll use a sample birth data
  const sampleBirthData: BirthData = {
    date: new Date("1990-06-15T12:30:00"),
    time: "12:30",
    place: "New York, USA",
  }

  useEffect(() => {
    const loadChart = async () => {
      setLoading(true)
      try {
        const calculatedChart = await calculateNatalChart(sampleBirthData)
        setChart(calculatedChart)
      } catch (error) {
        console.error("Error calculating chart:", error)
      } finally {
        setLoading(false)
      }
    }

    loadChart()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-heading text-3xl text-center mb-8">Chart Preview</h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : chart ? (
            <Tabs defaultValue="wheel" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="wheel">Chart Wheel</TabsTrigger>
                <TabsTrigger value="planets">Planets</TabsTrigger>
                <TabsTrigger value="aspects">Aspects</TabsTrigger>
              </TabsList>

              <TabsContent value="wheel" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Natal Chart Wheel</CardTitle>
                    <CardDescription>Visual representation of planetary positions at birth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartWheel chart={chart} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="planets" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Planetary Positions</CardTitle>
                    <CardDescription>Detailed positions of celestial bodies in your chart</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Personal Planets</h3>
                        <PlanetInfo planet={chart.sun} />
                        <PlanetInfo planet={chart.moon} />
                        <PlanetInfo planet={chart.mercury} />
                        <PlanetInfo planet={chart.venus} />
                        <PlanetInfo planet={chart.mars} />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Social & Outer Planets</h3>
                        <PlanetInfo planet={chart.jupiter} />
                        <PlanetInfo planet={chart.saturn} />
                        <PlanetInfo planet={chart.uranus} />
                        <PlanetInfo planet={chart.neptune} />
                        <PlanetInfo planet={chart.pluto} />
                      </div>
                    </div>
                    <div className="mt-8 space-y-4">
                      <h3 className="text-lg font-semibold">Other Points</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <PlanetInfo planet={chart.chiron} />
                        <PlanetInfo planet={chart.northNode} />
                        <PlanetInfo planet={chart.southNode} />
                        <PlanetInfo planet={chart.ascendant} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="aspects" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Aspect Table</CardTitle>
                    <CardDescription>Angular relationships between planets in your chart</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="border p-2 text-left">Planet A</th>
                            <th className="border p-2 text-left">Planet B</th>
                            <th className="border p-2 text-left">Aspect</th>
                            <th className="border p-2 text-left">Orb</th>
                            <th className="border p-2 text-left">Applying</th>
                          </tr>
                        </thead>
                        <tbody>
                          {chart.aspects.map((aspect, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                              <td className="border p-2">{aspect.bodyA}</td>
                              <td className="border p-2">{aspect.bodyB}</td>
                              <td className="border p-2">{aspect.type}</td>
                              <td className="border p-2">{aspect.orb}°</td>
                              <td className="border p-2">{aspect.applying ? "Yes" : "No"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Failed to load chart data</p>
              <Button>Try Again</Button>
            </div>
          )}

          <div className="mt-8 text-center">
            <Button asChild size="lg">
              <a href="/create-report">Create Full Report</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function PlanetInfo({ planet }: { planet: any }) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md">
      <div>
        <span className="font-medium">{planet.name}</span>
        <span className="text-muted-foreground ml-2">
          {planet.sign} {planet.degree}° {planet.minute}'
        </span>
      </div>
      <div className="flex items-center">
        <span className="text-sm mr-2">House {planet.house}</span>
        {planet.retrograde && (
          <span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full">
            Rx
          </span>
        )}
      </div>
    </div>
  )
}
