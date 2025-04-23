import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah J.",
      avatar: "SJ",
      role: "Spiritual Coach",
      content:
        "The Natal Chart Report provided insights I've never seen in other readings. The depth of analysis around my North Node and Saturn placement was truly enlightening.",
    },
    {
      name: "Michael T.",
      avatar: "MT",
      role: "Life Coach",
      content:
        "The Karmic Blueprint report helped me understand patterns I've been repeating for years. I now have clarity on my soul's journey and purpose in this lifetime.",
    },
    {
      name: "Elena R.",
      avatar: "ER",
      role: "Therapist",
      content:
        "As a therapist, I was impressed by the psychological depth of the Shadow Self Analysis. It perfectly complemented my work with clients on their unconscious patterns.",
    },
    {
      name: "David K.",
      avatar: "DK",
      role: "Business Consultant",
      content:
        "The Career & Vocation Blueprint gave me confidence to pursue a path I'd been considering for years. The insights about my 10th house placements were spot on.",
    },
  ]

  return (
    <section className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">What Our Clients Say</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Discover how our astrological reports have transformed lives and provided profound insights.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.name} className="h-full">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">"{testimonial.content}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
