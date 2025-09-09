"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Calendar, IndianRupee } from "lucide-react"
import type { Language } from "@/lib/types"
import { translations } from "@/lib/translations"

interface SchemesPageProps {
  language: Language
}

export default function SchemesPage({ language }: SchemesPageProps) {
  const t = translations[language]

  return (
    <div className="flex-1 bg-background min-h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t.schemes.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            {t.schemes.subtitle}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(t.schemes?.schemes || []).map((scheme, index) => (
            <Card
              key={index}
              className="border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-xl p-5">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {scheme.name}
                </CardTitle>
              </CardHeader>

              {/* Content */}
              <CardContent className="flex-1 p-6 flex flex-col justify-between">
                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                  {scheme.description}
                </p>

                {/* Info grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-start">
                    <div className="flex items-center gap-2 text-primary font-semibold text-lg">
                      <IndianRupee className="h-5 w-5" />
                      {scheme.amount}
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      Support
                    </span>
                  </div>

                  <div className="bg-accent/10 rounded-lg p-4 flex flex-col items-start">
                    <div className="flex items-center gap-2 text-accent-foreground font-semibold text-sm">
                      <Calendar className="h-5 w-5" />
                      {scheme.eligibility}
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      Eligibility
                    </span>
                  </div>
                </div>

                {/* Button */}
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-3">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
