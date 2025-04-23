"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { format, parse, isValid } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { reportTypes } from "@/lib/report-types"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

// Simple form without react-hook-form to avoid the error
export function BirthDataForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialReportType = searchParams.get("type") || ""

  // Form state
  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined)
  const [birthDateInput, setBirthDateInput] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [birthPlace, setBirthPlace] = useState("")
  const [email, setEmail] = useState("")
  const [reportType, setReportType] = useState(initialReportType)
  const [additionalInfo, setAdditionalInfo] = useState("")

  // Partner data
  const [partnerName, setPartnerName] = useState("")
  const [partnerBirthDate, setPartnerBirthDate] = useState<Date | undefined>(undefined)
  const [partnerBirthDateInput, setPartnerBirthDateInput] = useState("")
  const [partnerBirthTime, setPartnerBirthTime] = useState("")
  const [partnerBirthPlace, setPartnerBirthPlace] = useState("")

  const [isPartnerDataRequired, setIsPartnerDataRequired] = useState(
    initialReportType === "love" || initialReportType === "twin-flame",
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Parse date input when it changes
  useEffect(() => {
    if (birthDateInput) {
      try {
        // Try to parse the date in YYYY-MM-DD format
        const parsedDate = parse(birthDateInput, "yyyy-MM-dd", new Date())
        if (isValid(parsedDate)) {
          setBirthDate(parsedDate)
        }
      } catch (error) {
        // If parsing fails, don't update the date
      }
    }
  }, [birthDateInput])

  // Parse partner date input when it changes
  useEffect(() => {
    if (partnerBirthDateInput) {
      try {
        const parsedDate = parse(partnerBirthDateInput, "yyyy-MM-dd", new Date())
        if (isValid(parsedDate)) {
          setPartnerBirthDate(parsedDate)
        }
      } catch (error) {
        // If parsing fails, don't update the date
      }
    }
  }, [partnerBirthDateInput])

  // Update text input when date is selected from calendar
  useEffect(() => {
    if (birthDate) {
      setBirthDateInput(format(birthDate, "yyyy-MM-dd"))
    }
  }, [birthDate])

  // Update partner text input when date is selected from calendar
  useEffect(() => {
    if (partnerBirthDate) {
      setPartnerBirthDateInput(format(partnerBirthDate, "yyyy-MM-dd"))
    }
  }, [partnerBirthDate])

  // Simple validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!name || name.length < 2) newErrors.name = "Name must be at least 2 characters."

    // Validate birth date
    if (!birthDateInput) {
      newErrors.birthDate = "Birth date is required."
    } else {
      try {
        const parsedDate = parse(birthDateInput, "yyyy-MM-dd", new Date())
        if (!isValid(parsedDate)) {
          newErrors.birthDate = "Please enter a valid date in YYYY-MM-DD format."
        } else if (parsedDate > new Date()) {
          newErrors.birthDate = "Birth date cannot be in the future."
        }
      } catch (error) {
        newErrors.birthDate = "Please enter a valid date in YYYY-MM-DD format."
      }
    }

    if (!birthTime || !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(birthTime)) {
      newErrors.birthTime = "Please enter a valid time in 24-hour format (HH:MM)."
    }
    if (!birthPlace || birthPlace.length < 2) newErrors.birthPlace = "Birth place is required."
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address."
    }
    if (!reportType) newErrors.reportType = "Please select a report type."

    if (isPartnerDataRequired) {
      if (!partnerName || partnerName.length < 2) newErrors.partnerName = "Partner's name is required."

      // Validate partner birth date if provided
      if (partnerBirthDateInput) {
        try {
          const parsedDate = parse(partnerBirthDateInput, "yyyy-MM-dd", new Date())
          if (!isValid(parsedDate)) {
            newErrors.partnerBirthDate = "Please enter a valid date in YYYY-MM-DD format."
          } else if (parsedDate > new Date()) {
            newErrors.partnerBirthDate = "Birth date cannot be in the future."
          }
        } catch (error) {
          newErrors.partnerBirthDate = "Please enter a valid date in YYYY-MM-DD format."
        }
      }

      if (partnerBirthTime && !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(partnerBirthTime)) {
        newErrors.partnerBirthTime = "Please enter a valid time in 24-hour format (HH:MM)."
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Store the form data in session storage
      sessionStorage.setItem(
        "reportData",
        JSON.stringify({
          userData: {
            name,
            email,
            birthDate: birthDateInput,
            birthTime,
            birthPlace,
            reportType,
            additionalInfo: additionalInfo || "",
            ...(isPartnerDataRequired && {
              partnerName,
              partnerBirthDate: partnerBirthDateInput || undefined,
              partnerBirthTime,
              partnerBirthPlace,
            }),
          },
          timestamp: new Date().toISOString(),
        }),
      )

      // Redirect to report preview page with query params
      router.push(`/report-preview?type=${reportType}&name=${encodeURIComponent(name)}`)
    } catch (error) {
      console.error("Error processing form:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem processing your information. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReportTypeChange = (value: string) => {
    setReportType(value)
    setIsPartnerDataRequired(value === "love" || value === "twin-flame")
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Birth Information</h2>

            {/* Name field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Full Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-sm font-medium text-destructive">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Birth Date field - Manual input */}
              <div className="space-y-2">
                <label
                  htmlFor="birthDate"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Birth Date (YYYY-MM-DD)
                </label>
                <div className="flex gap-2">
                  <Input
                    id="birthDate"
                    value={birthDateInput}
                    onChange={(e) => setBirthDateInput(e.target.value)}
                    placeholder="YYYY-MM-DD"
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon" className="px-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span className="sr-only">Open calendar</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={birthDate}
                        onSelect={setBirthDate}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <p className="text-sm text-muted-foreground">Enter date in YYYY-MM-DD format or use calendar</p>
                {errors.birthDate && <p className="text-sm font-medium text-destructive">{errors.birthDate}</p>}
              </div>

              {/* Birth Time field */}
              <div className="space-y-2">
                <label
                  htmlFor="birthTime"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Birth Time (24-hour format)
                </label>
                <div className="relative">
                  <Input
                    id="birthTime"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    placeholder="HH:MM"
                  />
                  <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">As accurate as possible for precise calculations</p>
                {errors.birthTime && <p className="text-sm font-medium text-destructive">{errors.birthTime}</p>}
              </div>
            </div>

            {/* Birth Place field */}
            <div className="space-y-2">
              <label
                htmlFor="birthPlace"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Birth Place
              </label>
              <Input
                id="birthPlace"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                placeholder="City, Country"
              />
              <p className="text-sm text-muted-foreground">Include city and country for accurate coordinates</p>
              {errors.birthPlace && <p className="text-sm font-medium text-destructive">{errors.birthPlace}</p>}
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
              <p className="text-sm text-muted-foreground">We'll send your report to this email address</p>
              {errors.email && <p className="text-sm font-medium text-destructive">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Report Details</h2>

            {/* Report Type field */}
            <div className="space-y-2">
              <label
                htmlFor="reportType"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Report Type
              </label>
              <Select value={reportType} onValueChange={handleReportTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Choose the type of astrological report you want to receive
              </p>
              {errors.reportType && <p className="text-sm font-medium text-destructive">{errors.reportType}</p>}
            </div>
          </div>

          {isPartnerDataRequired && (
            <div className="space-y-4 border-t pt-4">
              <h2 className="text-xl font-semibold">Partner Information</h2>

              {/* Partner Name field */}
              <div className="space-y-2">
                <label
                  htmlFor="partnerName"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Partner's Full Name
                </label>
                <Input
                  id="partnerName"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="Enter partner's full name"
                />
                {errors.partnerName && <p className="text-sm font-medium text-destructive">{errors.partnerName}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Partner Birth Date field - Manual input */}
                <div className="space-y-2">
                  <label
                    htmlFor="partnerBirthDate"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Partner's Birth Date (YYYY-MM-DD)
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="partnerBirthDate"
                      value={partnerBirthDateInput}
                      onChange={(e) => setPartnerBirthDateInput(e.target.value)}
                      placeholder="YYYY-MM-DD"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="icon" className="px-2">
                          <CalendarIcon className="h-4 w-4" />
                          <span className="sr-only">Open calendar</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                          mode="single"
                          selected={partnerBirthDate}
                          onSelect={setPartnerBirthDate}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <p className="text-sm text-muted-foreground">Enter date in YYYY-MM-DD format or use calendar</p>
                  {errors.partnerBirthDate && (
                    <p className="text-sm font-medium text-destructive">{errors.partnerBirthDate}</p>
                  )}
                </div>

                {/* Partner Birth Time field */}
                <div className="space-y-2">
                  <label
                    htmlFor="partnerBirthTime"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Partner's Birth Time (24-hour format)
                  </label>
                  <div className="relative">
                    <Input
                      id="partnerBirthTime"
                      value={partnerBirthTime}
                      onChange={(e) => setPartnerBirthTime(e.target.value)}
                      placeholder="HH:MM"
                    />
                    <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                  {errors.partnerBirthTime && (
                    <p className="text-sm font-medium text-destructive">{errors.partnerBirthTime}</p>
                  )}
                </div>
              </div>

              {/* Partner Birth Place field */}
              <div className="space-y-2">
                <label
                  htmlFor="partnerBirthPlace"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Partner's Birth Place
                </label>
                <Input
                  id="partnerBirthPlace"
                  value={partnerBirthPlace}
                  onChange={(e) => setPartnerBirthPlace(e.target.value)}
                  placeholder="City, Country"
                />
                {errors.partnerBirthPlace && (
                  <p className="text-sm font-medium text-destructive">{errors.partnerBirthPlace}</p>
                )}
              </div>
            </div>
          )}

          {/* Additional Info field */}
          <div className="space-y-2">
            <label
              htmlFor="additionalInfo"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Additional Information (Optional)
            </label>
            <Textarea
              id="additionalInfo"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Any specific areas of interest or questions you'd like addressed in your report"
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Generating Report..." : "Generate Report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
