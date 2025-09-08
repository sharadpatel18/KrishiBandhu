"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, Leaf, MessageCircle, Shield, TrendingUp } from "lucide-react"
import type { Language } from "@/lib/types"
import { translations } from "@/lib/translations"

interface HeaderProps {
  language: Language
  setLanguage: (lang: Language) => void
  activeTab: "home" | "chat" | "schemes" | "prices"
  setActiveTab: (tab: "home" | "chat" | "schemes" | "prices") => void
}

export default function Header({ language, setLanguage, activeTab, setActiveTab }: HeaderProps) {
  const t = translations[language]

  return (
    <div className="bg-card border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "home"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Leaf className="h-4 w-4 inline mr-2" />
              {t.tabs.home}
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "chat"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <MessageCircle className="h-4 w-4 inline mr-2" />
              {t.tabs.chat}
            </button>
            <button
              onClick={() => setActiveTab("schemes")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "schemes"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Shield className="h-4 w-4 inline mr-2" />
              {t.tabs.schemes}
            </button>
            <button
              onClick={() => setActiveTab("prices")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "prices"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <TrendingUp className="h-4 w-4 inline mr-2" />
              {t.tabs.prices}
            </button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Globe className="h-4 w-4" />
                {language === "en" ? "English" : language === "ml" ? "മലയാളം" : "हिंदी"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("ml")}>മലയാളം</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("hi")}>हिंदी</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
