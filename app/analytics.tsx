"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"
import { useEffect } from "react"

export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views when path or search params change
  useEffect(() => {
    if (pathname && window.gtag) {
      window.gtag("config", "G-MEASUREMENT_ID", {
        page_path: pathname + searchParams.toString(),
      })
    }
  }, [pathname, searchParams])

  return (
    <>
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID" />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MEASUREMENT_ID', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
