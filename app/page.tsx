"use client"

import { useState, useEffect } from "react"
import Header from "@/components/layout/Header"
import HomePage from "@/components/pages/HomePage"
import ChatPage from "@/components/pages/ChatPage"
import SchemesPage from "@/components/pages/SchemesPage"
import PricesPage from "@/components/pages/PricesPage"
import type { Language, Message, MarketPrice, WeatherData, CropHealth } from "@/lib/types"
import { translations } from "@/lib/translations"

export default function DigitalKrishiOfficer() {
  const [language, setLanguage] = useState<Language>("en")
  const [activeTab, setActiveTab] = useState<"home" | "chat" | "schemes" | "prices">("home")
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isListening, setIsListening] = useState(false)

  const [weatherData] = useState<WeatherData>({
    temperature: 28,
    humidity: 75,
    rainfall: 12,
    windSpeed: 8,
    condition: "Partly Cloudy",
  })

  const [cropHealth] = useState<CropHealth>({
    overall: 85,
    diseases: 2,
    pests: 1,
    nutrition: 92,
  })

  const [marketPrices] = useState<MarketPrice[]>([
    { id: 1, crop: "Rice", price: 2850, change: 2.5, market: "Kochi Mandi" },
    { id: 2, crop: "Wheat", price: 2150, change: -1.2, market: "Delhi Mandi" },
    { id: 3, crop: "Coconut", price: 12, change: 5.8, market: "Kerala Mandi" },
    { id: 4, crop: "Pepper", price: 45000, change: 3.2, market: "Kochi Spice Market" },
    { id: 5, crop: "Cardamom", price: 125000, change: -2.1, market: "Kumily Market" },
  ])

  const t = translations[language]

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputText,
        isUser: true,
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
      setInputText("")

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          text: "Thank you for your question! I'm analyzing your farming query and will provide you with the best agricultural advice based on current conditions and best practices.",
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiResponse])
      }, 1000)
    }
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice input logic would go here
  }

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 1,
        text: t.chat.initialMessage,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [language, t.chat.initialMessage, messages.length])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header language={language} setLanguage={setLanguage} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "home" && (
        <HomePage language={language} setActiveTab={setActiveTab} weatherData={weatherData} cropHealth={cropHealth} />
      )}

      {activeTab === "chat" && (
        <ChatPage
          language={language}
          messages={messages}
          inputText={inputText}
          setInputText={setInputText}
          isListening={isListening}
          handleSendMessage={handleSendMessage}
          handleVoiceInput={handleVoiceInput}
        />
      )}

      {activeTab === "schemes" && <SchemesPage language={language} />}

      {activeTab === "prices" && <PricesPage language={language} marketPrices={marketPrices} />}
    </div>
  )
}
