import { type NextRequest, NextResponse } from "next/server"
import puppeteer from "puppeteer"
import { generateReportHtml } from "@/lib/server/pdf-template"

// Update maxDuration to be within Vercel's allowed range (1-60 seconds)
export const maxDuration = 60 // Maximum allowed value of 60 seconds

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { report, chart, chartWheelSvg, options } = data

    if (!report || !chart) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 })
    }

    // Generate HTML for the report
    const html = generateReportHtml(report, chart, chartWheelSvg, options)

    // Get Chrome executable path from environment variable
    const chromePath = process.env.CHROME_VALUE || "/usr/bin/google-chrome"

    console.log(`Using Chrome executable at: ${chromePath}`)

    // Launch a headless browser with optimized settings and specified Chrome path
    const browser = await puppeteer.launch({
      headless: "new", // Use new headless mode for better performance
      executablePath: chromePath, // Use the specified Chrome path
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-software-rasterizer",
      ],
      defaultViewport: {
        width: 1200,
        height: 1600,
      },
    })

    try {
      // Create a new page
      const page = await browser.newPage()

      // Set timeout for rendering - reduce from 60s to 30s to ensure we stay within maxDuration
      await page.setDefaultNavigationTimeout(30000)

      // Set the HTML content with proper waiting strategy - reduce timeout
      await page.setContent(html, {
        waitUntil: "networkidle0",
        timeout: 30000,
      })

      // Generate PDF with optimized settings
      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "20mm",
          right: "20mm",
          bottom: "20mm",
          left: "20mm",
        },
        preferCSSPageSize: true,
        displayHeaderFooter: false,
      })

      // Return the PDF as a response
      return new NextResponse(pdf, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${encodeURIComponent(report.title)}.pdf"`,
          "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        },
      })
    } finally {
      // Ensure browser closes even if there's an error during PDF generation
      await browser.close()
    }
  } catch (error) {
    console.error("Error generating PDF:", error)

    // Return a user-friendly error
    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        message: "An error occurred while generating your PDF. Please try again later.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
