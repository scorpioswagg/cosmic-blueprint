import { BirthDataForm } from "@/components/birth-data-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CreateReportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-3xl text-center mb-8">Create Your Astrological Report</h1>
          <BirthDataForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
