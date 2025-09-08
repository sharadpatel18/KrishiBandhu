"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import StatsCard from "@/components/ui/StatsCard"
import {
  MessageCircle,
  Leaf,
  Sun,
  Award,
  Users,
  MapPin,
  Shield,
  Camera,
  Mic,
  Cloud,
  Zap,
  ArrowUp,
  CheckCircle,
} from "lucide-react"
import type { Language, WeatherData, CropHealth } from "@/lib/types"
import { translations } from "@/lib/translations"

interface HomePageProps {
  language: Language
  setActiveTab: (tab: "home" | "chat" | "schemes" | "prices") => void
  weatherData: WeatherData
  cropHealth: CropHealth
}

export default function HomePage({ language, setActiveTab, weatherData, cropHealth }: HomePageProps) {
  const t = translations[language]

  return (
    <div className="flex-1 bg-background min-h-screen overflow-y-auto">
      <div className="bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-4 bg-secondary rounded-full mb-8 animate-bounce">
              <Leaf className="h-16 w-16 text-secondary-foreground" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-primary-foreground animate-fade-in-up leading-tight">
              {t.appName}
            </h1>
            <p
              className="text-xl md:text-2xl text-primary-foreground/90 mb-12 animate-fade-in-up max-w-4xl mx-auto leading-relaxed"
              style={{ animationDelay: "0.2s" }}
            >
              {t.appSubtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <Badge
                className="bg-secondary text-secondary-foreground border-0 text-lg px-8 py-3 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <Users className="h-5 w-5 mr-2" />
                50,000+ Active Farmers
              </Badge>
              <Badge
                className="bg-secondary text-secondary-foreground border-0 text-lg px-8 py-3 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <MapPin className="h-5 w-5 mr-2" />
                Kerala, India
              </Badge>
              <Badge
                className="bg-secondary text-secondary-foreground border-0 text-lg px-8 py-3 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <Shield className="h-5 w-5 mr-2" />
                98.5% Accuracy
              </Badge>
            </div>
            <Button
              onClick={() => setActiveTab("chat")}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-xl px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: "1s" }}
            >
              Start AI Consultation
              <MessageCircle className="h-6 w-6 ml-3" />
            </Button>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in-up">{t.home.title}</h2>
            <p
              className="text-xl md:text-2xl text-muted-foreground animate-fade-in-up max-w-3xl mx-auto"
              style={{ animationDelay: "0.2s" }}
            >
              {t.home.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatsCard
              icon={MessageCircle}
              value="1,247"
              label={t.home.stats.consultations}
              sublabel={
                <div className="flex items-center">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  +12% from yesterday
                </div>
              }
              iconColor="text-primary"
              valueColor="text-primary"
            />

            <StatsCard
              icon={Leaf}
              value={`${cropHealth.overall}%`}
              label={t.home.stats.cropHealth}
              sublabel={
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Excellent condition
                </div>
              }
              iconColor="text-accent"
              valueColor="text-accent"
              delay="0.1s"
            />

            <StatsCard
              icon={Sun}
              value={`${weatherData.temperature}°C`}
              label={t.home.stats.temperature}
              sublabel={
                <div className="flex items-center">
                  <Cloud className="h-4 w-4 mr-1" />
                  {weatherData.condition}
                </div>
              }
              iconColor="text-chart-4"
              valueColor="text-chart-4"
              delay="0.2s"
            />

            <StatsCard
              icon={Award}
              value="24"
              label={t.home.stats.schemes}
              sublabel={
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  Available now
                </div>
              }
              iconColor="text-destructive"
              valueColor="text-destructive"
              delay="0.3s"
            />
          </div>
        </div>
      </div>

      <div className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">{t.home.aiTitle}</h2>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">{t.home.aiDescription}</p>
              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-6">
                  <div className="bg-primary p-3 rounded-full">
                    <Camera className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-medium">{t.home.features.photoDetection}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="bg-accent p-3 rounded-full">
                    <Mic className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <span className="text-lg font-medium">{t.home.features.voiceQueries}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="bg-chart-4 p-3 rounded-full">
                    <Cloud className="h-6 w-6 text-chart-4-foreground" />
                  </div>
                  <span className="text-lg font-medium">{t.home.features.weatherRecommendations}</span>
                </div>
              </div>
              <Button
                onClick={() => setActiveTab("chat")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Try AI Assistant
                <Zap className="h-6 w-6 ml-3" />
              </Button>
            </div>

            <Card className="border-0 shadow-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader className="bg-secondary text-secondary-foreground rounded-t-lg p-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Leaf className="h-6 w-6" />
                  Live AI Consultation
                  <Badge className="bg-primary text-primary-foreground border-0 animate-pulse">Live</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-96">
                <div className="h-full flex flex-col">
                  <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary p-2 rounded-full">
                        <Leaf className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="bg-card border border-gray-200 rounded-2xl p-4 max-w-[80%]">
                        <p className="text-sm">{t.chat.initialMessage}</p>
                        <p className="text-xs text-muted-foreground mt-2">04:04 pm</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2 items-center">
                      <div className="flex-1 bg-muted rounded-full px-4 py-2">
                        <span className="text-muted-foreground text-sm">{t.chat.placeholder}</span>
                      </div>
                      <Button size="sm" className="rounded-full">
                        <Mic className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
