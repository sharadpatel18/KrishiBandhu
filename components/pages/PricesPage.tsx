"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, IndianRupee, Clock } from "lucide-react"
import type { Language, MarketPrice } from "@/lib/types"
import { translations } from "@/lib/translations"

interface PricesPageProps {
  language: Language
  marketPrices: MarketPrice[]
}

export default function PricesPage({ language, marketPrices }: PricesPageProps) {
  const t = translations[language]

  return (
    <div className="flex-1 bg-background min-h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{t.prices.title}</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">{t.prices.subtitle}</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-secondary text-secondary-foreground p-6">
            <CardTitle className="text-2xl flex items-center justify-between">
              <span className="flex items-center gap-3">
                <IndianRupee className="h-8 w-8" />
                Live Market Rates
              </span>
              <Badge className="bg-primary text-primary-foreground border-0 animate-pulse text-base px-4 py-2">
                <Clock className="h-4 w-4 mr-2" />
                Live
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-6 font-semibold text-base">Crop</th>
                    <th className="text-left p-6 font-semibold text-base">Price (₹/quintal)</th>
                    <th className="text-left p-6 font-semibold text-base">Change</th>
                    <th className="text-left p-6 font-semibold text-base">Market</th>
                  </tr>
                </thead>
                <tbody>
                  {(marketPrices || []).map((price, index) => (
                    <tr
                      key={price.id}
                      className="border-b border-gray-200 hover:bg-muted/30 transition-colors animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="p-6 font-medium text-base">{price.crop}</td>
                      <td className="p-6 text-2xl font-bold text-primary">₹{price.price.toLocaleString()}</td>
                      <td className="p-6">
                        <div
                          className={`flex items-center gap-2 ${price.change >= 0 ? "text-accent" : "text-destructive"}`}
                        >
                          {price.change >= 0 ? (
                            <TrendingUp className="h-5 w-5" />
                          ) : (
                            <TrendingDown className="h-5 w-5" />
                          )}
                          <span className="font-semibold text-base">
                            {price.change >= 0 ? "+" : ""}
                            {price.change}%
                          </span>
                        </div>
                      </td>
                      <td className="p-6 text-muted-foreground text-base">{price.market}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
