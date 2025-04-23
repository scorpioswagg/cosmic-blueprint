import { Clock, FileText, Sparkles, Layers, Compass, Lightbulb } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <Clock className="h-10 w-10 text-purple-500" />,
      title: "Precise Calculations",
      description: "Accurate to the minute with time zone and DST adjustments for precise astrological readings.",
    },
    {
      icon: <FileText className="h-10 w-10 text-indigo-500" />,
      title: "30+ Page Reports",
      description: "Comprehensive analysis with detailed interpretations of all chart elements.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-blue-500" />,
      title: "Esoteric Insights",
      description: "Deep metaphysical interpretations including karmic patterns and soul contracts.",
    },
    {
      icon: <Layers className="h-10 w-10 text-cyan-500" />,
      title: "Multiple Chart Types",
      description: "Natal, progressed, transit, synastry, and composite charts for complete analysis.",
    },
    {
      icon: <Compass className="h-10 w-10 text-emerald-500" />,
      title: "Tropical Zodiac System",
      description: "Using the traditional Western astrological system with Placidus houses.",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-amber-500" />,
      title: "Psychological Integration",
      description: "Jungian archetypes and shadow work integrated with astrological wisdom.",
    },
  ]

  return (
    <section className="container py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Advanced Astrological Features</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Our reports combine traditional wisdom with modern psychological insights for a complete cosmic analysis.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
        {features.map((feature) => (
          <div key={feature.title} className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-background p-4 shadow-md">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
