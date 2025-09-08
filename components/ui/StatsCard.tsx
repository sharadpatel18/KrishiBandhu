"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

export interface StatsCardProps {
  icon: LucideIcon
  value: string | number
  label: string
  sublabel: string
  iconColor: string
  valueColor: string
  delay?: string
}

interface InternalStatsCardProps {
  icon: LucideIcon
  value: string | number
  label: string
  sublabel: string
  iconColor: string
  valueColor: string
  delay: string
}

export default function StatsCard({
  icon: Icon,
  value,
  label,
  sublabel,
  iconColor,
  valueColor,
  delay = "0s",
}: InternalStatsCardProps) {
  return (
    <Card
      className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up group"
      style={{ animationDelay: delay }}
    >
      <CardContent className="p-8 text-center">
        <div
          className={`${iconColor}/10 p-4 rounded-full w-20 h-20 mx-auto mb-6 group-hover:${iconColor}/20 transition-colors`}
        >
          <Icon className={`h-12 w-12 ${iconColor} mx-auto mt-2`} />
        </div>
        <div className={`text-4xl font-bold ${valueColor} mb-2`}>{value}</div>
        <div className="text-muted-foreground mb-2">{label}</div>
        <div className={`text-sm ${valueColor} flex items-center justify-center`}>{sublabel}</div>
      </CardContent>
    </Card>
  )
}
