import type React from "react"
import type { Metadata } from "next"
import { Mona_Sans as FontSans, Content as FontHeading } from "next/font/google"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import "@/app/globals.css"
import { Toaster } from "@/components/ui/toaster"
import Analytics from "@/app/analytics"
import { Suspense } from "react"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = FontHeading({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "Cosmic Blueprint | Advanced Astrological Reports",
  description:
    "Discover your cosmic blueprint with detailed astrological reports covering natal charts, karmic patterns, soul contracts, and more.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, fontHeading.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Suspense>
            {children}
            <Toaster />
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
