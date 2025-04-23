import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { ReportTypes } from "@/components/report-types"
import { Testimonials } from "@/components/testimonials"
import { FeaturesSection } from "@/components/features-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ReportTypes />
        <FeaturesSection />
        <Testimonials />
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Begin Your Cosmic Journey</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Discover the profound insights hidden in your astrological blueprint and transform your understanding of
              yourself and your life path.
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link href="/create-report">Create Your Report</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
