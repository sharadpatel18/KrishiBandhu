"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Leaf, Mic, Camera, Send, Sparkles } from "lucide-react"
import type { Language, Message } from "@/lib/types"
import { translations } from "@/lib/translations"

interface ChatPageProps {
  language: Language
  messages: Message[]
  inputText: string
  setInputText: (text: string) => void
  isListening: boolean
  handleSendMessage: () => void
  handleVoiceInput: () => void
}

export default function ChatPage({
  language,
  messages,
  inputText,
  setInputText,
  isListening,
  handleSendMessage,
  handleVoiceInput,
}: ChatPageProps) {
  const t = translations[language]

  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-primary/8 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-accent/5 rounded-full animate-bounce-slow"></div>
      </div>

      <div className="bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground p-8 flex items-center gap-6 shadow-xl relative z-10">
        <div className="bg-primary-foreground/20 p-4 rounded-2xl backdrop-blur-sm animate-pulse-gentle">
          <Leaf className="h-10 w-10" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-2xl">{t.chat.title}</h2>
            <Sparkles className="h-6 w-6 text-accent animate-twinkle" />
          </div>
          <p className="text-primary-foreground/90 text-lg mt-1">{t.chat.subtitle}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-primary-foreground/80">Online & Ready</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto relative">
        {/* Light background with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white to-slate-50/60"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(34, 197, 94, 0.1) 2px, transparent 0),
                           radial-gradient(circle at 75px 75px, rgba(34, 197, 94, 0.05) 1px, transparent 0)`,
            backgroundSize: "100px 100px",
          }}
        ></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-10 space-y-8">
          {(!messages || messages.length === 0) && (
            <div className="text-center py-16 animate-fade-in">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-primary/10 max-w-2xl mx-auto">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
                  <Leaf className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Welcome to Digital Krishi Officer</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Ask me anything about farming, crops, weather, government schemes, or market prices. I'm here to help
                  you 24/7!
                </p>
                <div className="flex flex-wrap gap-3 justify-center mt-8">
                  {["Weather forecast", "Crop diseases", "Market prices", "Government schemes"].map(
                    (suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setInputText(suggestion)}
                        className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {suggestion}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}

          {(messages || []).map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"} animate-slide-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {!message.isUser && (
                <div className="bg-primary p-4 rounded-2xl mr-6 h-14 w-14 flex items-center justify-center flex-shrink-0 shadow-lg animate-bounce-gentle">
                  <Leaf className="h-7 w-7 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[75%] px-8 py-6 rounded-3xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${
                  message.isUser
                    ? "bg-primary text-primary-foreground animate-slide-in-right"
                    : "bg-white/90 text-foreground border border-primary/10 animate-slide-in-left"
                }`}
              >
                <p className="text-base leading-relaxed font-medium">{message.text}</p>
                <p className="text-sm opacity-70 mt-4 font-medium">{message.timestamp.toLocaleTimeString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-md border-t border-primary/20 p-8 shadow-2xl relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-6 items-center">
            <div className="flex-1 relative">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t.chat.placeholder}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="pr-6 py-8 text-lg rounded-2xl border-2 border-primary/20 focus:border-primary bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl focus:shadow-xl"
              />
            </div>
            <Button
              onClick={handleVoiceInput}
              variant="outline"
              size="lg"
              className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 shadow-lg ${
                isListening
                  ? "bg-destructive text-destructive-foreground animate-pulse border-destructive"
                  : "bg-white/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10"
              }`}
            >
              <Mic className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-2xl p-6 bg-white/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Camera className="h-6 w-6" />
            </Button>
            <Button
              onClick={handleSendMessage}
              size="lg"
              className="rounded-2xl px-8 py-6 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Send className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
