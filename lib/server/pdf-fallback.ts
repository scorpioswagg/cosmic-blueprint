import { jsPDF } from "jspdf"
import type { ReportType, PdfOptions } from "@/lib/pdf-generator"
import type { NatalChart } from "@/lib/astrological-calculations"

// Fallback PDF generation using client-side jsPDF
// This is used if the server-side Puppeteer PDF generation fails
export async function generateFallbackPdf(
  report: ReportType,
  chart: NatalChart,
  options: PdfOptions = {},
): Promise<Blob> {
  const { userName = "User", birthDate = "", birthTime = "", birthPlace = "" } = options

  // Create a new PDF document
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // Add cosmic-themed header
  pdf.setFillColor(89, 65, 169)
  pdf.rect(0, 0, 210, 30, "F")

  // Add title
  pdf.setTextColor(255, 255, 255)
  pdf.setFont("helvetica", "bold")
  pdf.setFontSize(20)
  pdf.text(report.title, 105, 15, { align: "center" })

  // Add user info if available
  pdf.setTextColor(50, 50, 50)
  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(12)
  pdf.text(`Name: ${userName}`, 20, 40)

  if (birthDate) {
    pdf.text(`Birth Date: ${birthDate}`, 20, 48)
  }

  if (birthTime) {
    pdf.text(`Birth Time: ${birthTime}`, 20, 56)
  }

  if (birthPlace) {
    pdf.text(`Birth Place: ${birthPlace}`, 20, 64)
  }

  // Add introduction
  pdf.setTextColor(50, 50, 50)
  pdf.setFontSize(14)
  pdf.setFont("helvetica", "bold")
  pdf.text("Introduction", 20, 80)

  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(10)

  // Split introduction text to fit page width
  const introLines = pdf.splitTextToSize(report.introduction, 170)
  pdf.text(introLines, 20, 90)

  // Add report sections
  let yPosition = 120
  let pageNum = 1

  report.sections.forEach((section, index) => {
    // Check if we need a new page
    if (yPosition > 270) {
      pdf.addPage()
      pageNum++
      yPosition = 20
    }

    // Add section title
    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(14)
    pdf.setTextColor(89, 65, 169)
    pdf.text(section.title, 20, yPosition)
    yPosition += 10

    // Add section content
    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(10)
    pdf.setTextColor(50, 50, 50)

    // Split content text to fit page width
    const contentLines = pdf.splitTextToSize(section.content.substring(0, 1000) + "...", 170)

    // Check if content will fit on current page
    if (yPosition + contentLines.length * 5 > 280) {
      pdf.addPage()
      pageNum++
      yPosition = 20
    }

    pdf.text(contentLines, 20, yPosition)
    yPosition += contentLines.length * 5 + 15
  })

  // Add footer to each page
  const pageCount = pdf.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i)
    pdf.setFont("helvetica", "italic")
    pdf.setFontSize(8)
    pdf.setTextColor(150, 150, 150)
    pdf.text(`Cosmic Blueprint - ${new Date().toLocaleDateString()} - Page ${i} of ${pageCount}`, 105, 290, {
      align: "center",
    })
  }

  // Get the PDF as a blob
  return pdf.output("blob")
}
