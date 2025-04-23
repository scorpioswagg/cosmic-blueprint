"use client"

import type React from "react"

import { useState } from "react"
import { FileDown, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { generateChartWheelSvg } from "@/lib/server/chart-to-svg"
import type { ReportType, PdfOptions } from "@/lib/pdf-generator"
import type { NatalChart } from "@/lib/astrological-calculations"
import { generateFallbackPdf } from "@/lib/server/pdf-fallback"

interface PdfDownloadButtonProps {
  report: ReportType
  chart: NatalChart
  chartWheelRef: React.RefObject<HTMLDivElement>
  options?: PdfOptions
}

export function PdfDownloadButton({ report, chart, chartWheelRef, options = {} }: PdfDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [useFallback, setUseFallback] = useState(false)

  const handleDownload = async () => {
    if (isGenerating) return
    setIsGenerating(true)

    try {
      let pdfBlob: Blob

      // If we're using the fallback or if the server-side generation fails, use the client-side fallback
      if (useFallback) {
        toast({
          title: "Using simplified PDF generation",
          description: "We're using a simplified PDF generator for compatibility.",
        })
        pdfBlob = await generateFallbackPdf(report, chart, options)
      } else {
        try {
          // Generate SVG of the chart wheel for better quality in the PDF
          const chartWheelSvg = options.includeChartWheel ? generateChartWheelSvg(chart) : null

          // Call the server-side API to generate the PDF with proper error handling
          // Reduce timeout to 45 seconds to account for Vercel's 60-second limit
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 45000)

          const response = await fetch("/api/generate-pdf", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              report,
              chart,
              chartWheelSvg,
              options,
            }),
            signal: controller.signal,
          })

          clearTimeout(timeoutId)

          if (!response.ok) {
            // Try to get detailed error info
            const errorData = await response.json().catch(() => null)
            throw new Error(errorData?.message || "Failed to generate PDF")
          }

          // Get the PDF blob
          pdfBlob = await response.blob()
        } catch (error) {
          console.error("Server-side PDF generation failed, using fallback:", error)

          // Set the fallback flag for future attempts
          setUseFallback(true)

          // Show appropriate message based on error type
          if (error instanceof DOMException && error.name === "AbortError") {
            toast({
              title: "PDF Generation Timeout",
              description: "The server took too long to generate your PDF. Using simplified version instead.",
            })
          } else {
            toast({
              title: "Using simplified PDF generation",
              description: "We're using a simplified PDF generator due to a technical issue.",
            })
          }

          pdfBlob = await generateFallbackPdf(report, chart, options)
        }
      }

      // Create a download link
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${report.title.replace(/\s+/g, "-").toLowerCase()}.pdf`
      document.body.appendChild(link)
      link.click()

      // Clean up
      setTimeout(() => {
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }, 100)

      toast({
        title: "PDF Generated Successfully",
        description: "Your astrological report has been downloaded.",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)

      toast({
        variant: "destructive",
        title: "PDF Generation Failed",
        description:
          error instanceof Error ? error.message : "There was an error generating your PDF. Please try again.",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button onClick={handleDownload} disabled={isGenerating} className="w-full md:w-auto">
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <FileDown className="mr-2 h-4 w-4" />
          Download PDF Report
        </>
      )}
    </Button>
  )
}
