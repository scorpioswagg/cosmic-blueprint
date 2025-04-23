import Link from "next/link"
import {
  User,
  Heart,
  Briefcase,
  Sparkles,
  Calendar,
  SatelliteIcon as Saturn,
  Flame,
  Globe,
  LigatureIcon as Bandage,
  Moon,
  Sunrise,
  Brain,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const reportTypes = [
  {
    title: "Natal Chart Report",
    description: "Comprehensive psychological profile based on your birth chart",
    icon: <User className="h-10 w-10 text-purple-500" />,
    href: "/create-report?type=natal",
  },
  {
    title: "Karmic Blueprint",
    description: "Explore your soul's journey and karmic patterns",
    icon: <Moon className="h-10 w-10 text-indigo-500" />,
    href: "/create-report?type=karmic",
  },
  {
    title: "Soul Contract & Past Life",
    description: "Uncover your soul contracts and past life influences",
    icon: <Sparkles className="h-10 w-10 text-blue-500" />,
    href: "/create-report?type=soul-contract",
  },
  {
    title: "Love & Compatibility",
    description: "Synastry and composite chart analysis for relationships",
    icon: <Heart className="h-10 w-10 text-pink-500" />,
    href: "/create-report?type=love",
  },
  {
    title: "Career & Vocation",
    description: "Discover your professional path and talents",
    icon: <Briefcase className="h-10 w-10 text-emerald-500" />,
    href: "/create-report?type=career",
  },
  {
    title: "Spiritual Awakening",
    description: "Guidance for your spiritual journey and life purpose",
    icon: <Sunrise className="h-10 w-10 text-amber-500" />,
    href: "/create-report?type=spiritual",
  },
  {
    title: "Transits & Progressions",
    description: "Forecast of upcoming astrological influences",
    icon: <Calendar className="h-10 w-10 text-cyan-500" />,
    href: "/create-report?type=transits",
  },
  {
    title: "Saturn Return Guide",
    description: "Navigate your Saturn Return with wisdom",
    icon: <Saturn className="h-10 w-10 text-slate-500" />,
    href: "/create-report?type=saturn",
  },
  {
    title: "Twin Flame / Soulmate",
    description: "Identify and understand your deepest soul connections",
    icon: <Flame className="h-10 w-10 text-red-500" />,
    href: "/create-report?type=twin-flame",
  },
  {
    title: "Astrocartography",
    description: "Location-based analysis for optimal places to live",
    icon: <Globe className="h-10 w-10 text-green-500" />,
    href: "/create-report?type=astrocartography",
  },
  {
    title: "Chiron Healing",
    description: "Heal childhood wounds through Chiron's placement",
    icon: <Bandage className="h-10 w-10 text-orange-500" />,
    href: "/create-report?type=chiron",
  },
  {
    title: "Shadow Self Analysis",
    description: "Explore your unconscious patterns and shadow aspects",
    icon: <Brain className="h-10 w-10 text-violet-500" />,
    href: "/create-report?type=shadow",
  },
]

export function ReportTypes() {
  return (
    <section className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Comprehensive Astrological Reports
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Choose from our extensive collection of in-depth reports, each offering unique insights into different aspects
          of your cosmic blueprint.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12">
        {reportTypes.map((report) => (
          <Card key={report.title} className="flex flex-col h-full transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
              {report.icon}
              <CardTitle>{report.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <CardDescription className="text-base">{report.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={report.href}>Select</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
