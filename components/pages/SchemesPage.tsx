"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Calendar } from "lucide-react"
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{t.schemes.title}</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">{t.schemes.subtitle}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(t.schemes?.schemes || []).map((scheme, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="bg-gradient-secondary text-secondary-foreground rounded-t-lg p-6">
                <CardTitle className="text-xl flex items-center gap-3">
                  <Shield className="h-6 w-6" />
                  {scheme.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-8 leading-relaxed text-base">{scheme.description}</p>
                <div className="space-y-6">
                  <div className="bg-primary/10 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-primary">{scheme.amount}</div>
                    <div className="text-sm text-muted-foreground mt-1">Financial Support</div>
                  </div>
                  <div className="flex items-center gap-3 text-base text-muted-foreground">
                    <Calendar className="h-5 w-5" />
                    <span>Eligibility: {scheme.eligibility}</span>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base">
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
