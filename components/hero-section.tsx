import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-background/80">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Discover Your Cosmic Blueprint
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Unlock the profound wisdom of your astrological chart with our in-depth, personalized reports. Explore your
            natal chart, karmic patterns, soul contracts, and life purpose.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/create-report">
                Create Your Report <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
