"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ChevronDown, ChevronUp } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChartWheel } from "@/components/chart-wheel"
import { PdfDownloadButton } from "@/components/pdf-download-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { calculateNatalChart, type BirthData, type NatalChart } from "@/lib/astrological-calculations"
import { generateNatalChartReport } from "@/lib/report-generators/natal-chart-report"
import { generateKarmicBlueprintReport } from "@/lib/report-generators/karmic-blueprint-report"
import { generateSoulContractReport } from "@/lib/report-generators/soul-contract-report"
import { toast } from "@/hooks/use-toast"

export default function ReportPreviewPage() {
  const searchParams = useSearchParams()
  const reportType = searchParams.get("type") || "natal"
  const name = searchParams.get("name") || "User"

  const [chart, setChart] = useState<NatalChart | null>(null)
  const [report, setReport] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [includeChartWheel, setIncludeChartWheel] = useState(true)
  const [colorTheme, setColorTheme] = useState<"light" | "dark" | "cosmic">("cosmic")

  const chartWheelRef = useRef<HTMLDivElement>(null)

  // Get userData from sessionStorage or use fallback
  const getUserData = () => {
    if (typeof window === "undefined") return null

    try {
      const reportData = sessionStorage.getItem("reportData")
      if (reportData) {
        return JSON.parse(reportData).userData
      }
    } catch (e) {
      console.error("Error parsing user data from session storage", e)
    }

    // Fallback birth data if nothing in session storage
    return {
      birthDate: "1990-06-15",
      birthTime: "12:30",
      birthPlace: "New York, USA",
    }
  }

  useEffect(() => {
    const loadChartAndReport = async () => {
      setLoading(true)

      try {
        const userData = getUserData()

        // Prepare birth data from user input or fallback
        const birthData: BirthData = {
          date: new Date(userData?.birthDate || "1990-06-15"),
          time: userData?.birthTime || "12:30",
          place: userData?.birthPlace || "New York, USA",
        }

        // Calculate the chart immediately
        const calculatedChart = calculateNatalChart(birthData)
        setChart(calculatedChart)

        // Generate the appropriate report based on type
        let generatedReport
        switch (reportType) {
          case "natal":
            generatedReport = generateNatalChartReport(calculatedChart, name)
            break
          case "karmic":
            generatedReport = generateKarmicBlueprintReport(calculatedChart, name)
            break
          case "soul-contract":
            generatedReport = generateSoulContractReport(calculatedChart, name)
            break
          default:
            generatedReport = generateNatalChartReport(calculatedChart, name)
        }

        setReport(generatedReport)

        // Initialize all sections as collapsed except introduction
        const initialExpandedState: Record<string, boolean> = { introduction: true }
        generatedReport.sections.forEach((section: any, index: number) => {
          initialExpandedState[`section-${index}`] = index === 0
        })
        setExpandedSections(initialExpandedState)

        toast({
          title: "Report Generated Successfully",
          description: `Your ${reportType.replace("-", " ")} report is ready to view.`,
        })
      } catch (error) {
        console.error("Error loading chart and report:", error)
        toast({
          variant: "destructive",
          title: "Error Generating Report",
          description: "There was a problem generating your report. Please try again.",
        })
      } finally {
        setLoading(false)
      }
    }

    loadChartAndReport()
  }, [reportType, name])

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  // Get user data for the PDF options
  const userData = getUserData()

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg">Generating your cosmic blueprint...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!chart || !report) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container py-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error Loading Report</h1>
            <p className="text-muted-foreground mb-6">
              We couldn't load your astrological report. Please try again later.
            </p>
            <Button asChild>
              <a href="/create-report">Return to Report Creation</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h1 className="font-heading text-3xl">{report.title}</h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <PdfDownloadButton
                report={report}
                chart={chart}
                chartWheelRef={chartWheelRef}
                options={{
                  includeChartWheel,
                  colorTheme,
                  userName: name,
                  birthDate: userData?.birthDate ? new Date(userData.birthDate).toLocaleDateString() : undefined,
                  birthTime: userData?.birthTime,
                  birthPlace: userData?.birthPlace,
                }}
              />
            </div>
          </div>

          {/* PDF Options */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">PDF Options</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch id="include-chart" checked={includeChartWheel} onCheckedChange={setIncludeChartWheel} />
                  <Label htmlFor="include-chart">Include Chart Wheel</Label>
                </div>

                <div className="space-y-2">
                  <Label>PDF Theme</Label>
                  <RadioGroup
                    value={colorTheme}
                    onValueChange={(value) => setColorTheme(value as "light" | "dark" | "cosmic")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="theme-light" />
                      <Label htmlFor="theme-light">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="theme-dark" />
                      <Label htmlFor="theme-dark">Dark</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cosmic" id="theme-cosmic" />
                      <Label htmlFor="theme-cosmic">Cosmic</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart Wheel */}
          <div ref={chartWheelRef} className="mb-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-center mb-4">Natal Chart Wheel</h2>
                <ChartWheel chart={chart} />
              </CardContent>
            </Card>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("introduction")}
              >
                <h2 className="text-xl font-semibold">Introduction</h2>
                {expandedSections["introduction"] ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              {expandedSections["introduction"] && (
                <div className="mt-4 whitespace-pre-line text-muted-foreground">{report.introduction}</div>
              )}
            </CardContent>
          </Card>

          {/* Report Sections */}
          {report.sections.map((section: any, index: number) => (
            <Card key={index} className="mb-4">
              <CardContent className="p-6">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection(`section-${index}`)}
                >
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                  {expandedSections[`section-${index}`] ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                {expandedSections[`section-${index}`] && (
                  <div className="mt-4 whitespace-pre-line text-muted-foreground">{section.content}</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
