import { type NextRequest, NextResponse } from "next/server"
import { calculateNatalChart, calculateSynastryChart } from "@/lib/astrological-calculations"
import { generateNatalChartReport } from "@/lib/report-generators/natal-chart-report"
import { generateKarmicBlueprintReport } from "@/lib/report-generators/karmic-blueprint-report"
import { generateSoulContractReport } from "@/lib/report-generators/soul-contract-report"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, birthData, reportType, partnerName, partnerBirthData } = data

    if (!name || !birthData || !reportType) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 })
    }

    // Calculate the natal chart
    const natalChart = await calculateNatalChart(birthData)

    // Generate the appropriate report based on type
    let report
    switch (reportType) {
      case "natal":
        report = generateNatalChartReport(natalChart, name)
        break
      case "karmic":
        report = generateKarmicBlueprintReport(natalChart, name)
        break
      case "soul-contract":
        report = generateSoulContractReport(natalChart, name)
        break
      case "love":
        // For synastry reports, we need both charts
        if (!partnerName || !partnerBirthData) {
          return NextResponse.json({ error: "Partner data required for compatibility report" }, { status: 400 })
        }
        const partnerChart = await calculateNatalChart(partnerBirthData)
        const synastryAspects = await calculateSynastryChart(natalChart, partnerChart)
        // In a real implementation, we would generate a compatibility report here
        report = { title: "Love & Compatibility Report", introduction: "Sample introduction", sections: [] }
        break
      // Additional report types would be handled here
      default:
        return NextResponse.json({ error: "Invalid report type" }, { status: 400 })
    }

    return NextResponse.json({ report })
  } catch (error) {
    console.error("Error generating report:", error)
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 })
  }
}
