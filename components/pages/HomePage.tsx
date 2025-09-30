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
  Languages,
} from "lucide-react"
import type { Language, WeatherData, CropHealth } from "@/lib/types"
import { translations } from "@/lib/translations"
import { Sprout, Wheat, Tractor } from "lucide-react"
import test from "node:test"

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
      {/* 🌱 HERO */}
      <div className="bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/patterns/leaves.svg')] bg-repeat"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center">
            {/* Logo Badge */}
            <div className="inline-flex items-center justify-center p-6 bg-secondary rounded-full mb-8 shadow-lg animate-bounce">
              <Leaf className="h-16 w-16 text-secondary-foreground" />
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground animate-fade-in-up leading-tight">
              {t.appName}
            </h1>
            <p
              className="text-xl md:text-2xl text-primary-foreground/90 mb-12 animate-fade-in-up max-w-4xl mx-auto leading-relaxed"
              style={{ animationDelay: "0.2s" }}
            >
              {t.appSubtitle}
            </p>

            {/* Hero Badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <Badge className="bg-secondary/90 text-secondary-foreground text-lg px-8 py-3 rounded-full shadow">
                <Users className="h-5 w-5 mr-2" />
                50,000+ Active Farmers
              </Badge>
              <Badge className="bg-accent/90 text-accent-foreground text-lg px-8 py-3 rounded-full shadow">
                <MapPin className="h-5 w-5 mr-2" />
                Kerala, India
              </Badge>
              <Badge className="bg-chart-4/90 text-chart-4-foreground text-lg px-8 py-3 rounded-full shadow">
                <Shield className="h-5 w-5 mr-2" />
                98.5% Accuracy
              </Badge>
            </div>

            {/* CTAs */}
            <div className="flex justify-center gap-6">
              <Button
                onClick={() => setActiveTab("chat")}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-xl px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start AI Consultation
                <MessageCircle className="h-6 w-6 ml-3" />
              </Button>
              <Button
                variant="outline"
                className="text-xl px-10 py-6 rounded-full border-2 shadow-sm hover:shadow-md transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 📊 STATS */}
      <div className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{t.home.title}</h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">{t.home.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatsCard
              icon={MessageCircle}
              value="1,247"
              label={t.home.stats.consultations}
              sublabel={
                <div className="flex items-center text-sm text-muted-foreground">
                  <ArrowUp className="h-4 w-4 mr-1" /> +12% from yesterday
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
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {cropHealth.overall > 80 ? "Excellent" : cropHealth.overall > 60 ? "Good" : "Needs Attention"}
                </div>
              }
              iconColor="text-accent"
              valueColor="text-accent"
            />

            <StatsCard
              icon={Sun}
              value={`${weatherData.temperature}°C`}
              label={t.home.stats.temperature}
              sublabel={
                <div className="text-sm text-muted-foreground">
                  <Cloud className="h-4 w-4 mr-1 inline" />
                  {weatherData.condition}, Humidity {weatherData.humidity}%
                </div>
              }
              iconColor="text-chart-4"
              valueColor="text-chart-4"
            />

            <StatsCard
              icon={Award}
              value="24"
              label={t.home.stats.schemes}
              sublabel={
                <div className="flex items-center text-sm text-muted-foreground">
                  <Award className="h-4 w-4 mr-1" /> Available Now
                </div>
              }
              iconColor="text-destructive"
              valueColor="text-destructive"
            />
          </div>
        </div>
      </div>

      <div className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t.home.farmersSection.heading}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            {t.home.farmersSection.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Farmer Card 1 */}
            {
              t.home.farmersSection.testimonials.map((testimonial, index) => (
                <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform hover:scale-[1.02]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Tractor className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-base leading-relaxed">
                   {testimonial.text}
                  </p>
                </Card>
              ))
            }
          </div>
        </div>
      </div>

      {/* 🤖 AI FEATURES */}
      <div className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">{t.home.aiTitle}</h2>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">{t.home.aiDescription}</p>
              <div className="space-y-6 mb-12">
                {[
                  { icon: Camera, text: t.home.features.photoDetection, color: "bg-primary text-primary-foreground" },
                  { icon: Mic, text: t.home.features.voiceQueries, color: "bg-accent text-accent-foreground" },
                  { icon: Cloud, text: t.home.features.weatherRecommendations, color: "bg-chart-4 text-chart-4-foreground" },
                  { icon: Languages, text: "Multilingual Support", color: "bg-secondary text-secondary-foreground" },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-6">
                    <div className={`${feature.color} p-3 rounded-full`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <span className="text-lg font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => setActiveTab("chat")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Try AI Assistant
                <Zap className="h-6 w-6 ml-3" />
              </Button>
            </div>

            {/* Chat Preview */}
            <Card className="border-0 shadow-2xl overflow-hidden rounded-xl">
              {/* Header */}
              <CardHeader className="bg-secondary text-secondary-foreground rounded-t-xl p-5">
                <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                  <Leaf className="h-5 w-5" />
                  Live AI Consultation
                  <Badge className="bg-primary text-primary-foreground border-0 animate-pulse">Live</Badge>
                </CardTitle>
              </CardHeader>

              {/* Chat Content */}
              <CardContent className="p-0 flex flex-col h-96">
                <div className="flex-1 p-5 space-y-4 overflow-y-auto">
                  {/* AI Message */}
                  <div className="flex items-start gap-3">
                    <div className="bg-primary p-2 rounded-full shrink-0">
                      <Leaf className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="bg-card border rounded-xl px-4 py-3 max-w-[80%] shadow-sm">
                      <p className="text-sm">
                        Hello! I am your Digital Agriculture Officer. Do you have any questions about farming?
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">04:04 pm</p>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-muted px-4 py-3 rounded-xl max-w-[80%] shadow-sm">
                      <p className="text-sm">What crop should I plant this season?</p>
                      <p className="text-xs text-muted-foreground mt-2 text-right">04:05 pm</p>
                    </div>
                  </div>
                </div>

                {/* Input Bar */}
                <div className="flex items-center gap-3 border-t bg-muted/40 px-4 py-3 rounded-b-xl">
                  <input
                    type="text"
                    placeholder="Type your farming question..."
                    className="flex-1 px-4 py-2 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                  />
                  <Button size="icon" className="rounded-full">
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}
