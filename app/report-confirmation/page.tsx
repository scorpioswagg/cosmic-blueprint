import Link from "next/link"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ReportConfirmationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-12 flex items-center justify-center">
        <div className="mx-auto max-w-md text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="font-heading text-3xl mb-4">Report Request Confirmed</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for requesting your astrological report. We have calculated your cosmic blueprint based on the
            precise coordinates of your birth data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/report-preview">View Your Report</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
