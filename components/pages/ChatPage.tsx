import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Leaf, Mic, Camera, Send, Sparkles } from "lucide-react";
import type { Language, Message } from "@/lib/types";
import { translations } from "@/lib/translations";

interface ChatPageProps {
  language: Language;
  messages: Message[];
  inputText: string;
  setInputText: (text: string) => void;
  isListening: boolean;
  handleVoiceInput: () => void;
  handleSendMessage: () => void;
  handleImageUpload?: () => void;
}

export default function ChatPage({
  language,
  messages,
  inputText,
  setInputText,
  isListening,
  handleVoiceInput,
  handleImageUpload,
}: ChatPageProps) {
  const t = translations[language];
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState(messages);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...chatMessages, userMessage] }),
      });

      const data = await res.json();

      const aiMessage: Message = {
        id: Date.now().toString() + "-ai",
        text: data.text || "I couldn't respond.",
        isUser: false,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  console.log(t)
  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground px-6 py-4 flex items-center gap-4 shadow-md relative z-10">
        <div className="bg-primary-foreground/20 p-2 rounded-xl backdrop-blur-sm animate-pulse-gentle">
          <Leaf className="h-7 w-7" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-2xl">{t.chat.title}</h2>
            <Sparkles className="h-5 w-5 text-accent animate-twinkle" />
          </div>
          <p className="text-primary-foreground/80 text-base mt-0.5">{t.chat.subtitle}</p>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto relative">
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-6 space-y-6">
          {chatMessages.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-primary/10 max-w-xl mx-auto">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Welcome to Digital Krishi Officer
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Ask me anything about farming, crops, weather, schemes, or market prices. I'm here 24/7!
                </p>
              </div>
            </div>
          )}

          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"} animate-slide-in-up`}
            >
              {!message.isUser && (
                <div className="bg-primary p-3 rounded-xl mr-3 h-11 w-11 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Leaf className="h-5 w-5 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[72%] px-6 py-4 rounded-2xl shadow-md text-lg leading-relaxed ${
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-foreground border border-primary/10"
                }`}
              >
                <p>{message.text}</p>
                <p className="text-sm opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
              </div>
            </div>
          ))}

          {/* Loader */}
          {loading && (
            <div className="flex justify-start animate-pulse space-x-3">
              <div className="bg-primary/10 w-11 h-11 rounded-full flex items-center justify-center shadow-sm">
                <Leaf className="h-5 w-5 text-primary-foreground animate-bounce-gentle" />
              </div>
              <div className="bg-white p-3 rounded-2xl shadow-md text-lg text-foreground">
                <p>AI is typing...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* INPUT AREA */}
      <div className="bg-white/95 backdrop-blur-md border-t border-primary/20 px-5 py-5 shadow-lg relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-center">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.chat.placeholder}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 pr-5 py-4 text-lg rounded-xl border border-primary/20 focus:border-primary bg-white/80 shadow-sm"
            />
            <Button
              onClick={handleVoiceInput}
              variant="outline"
              size="icon"
              className={`rounded-xl p-6 transition-all duration-300 hover:scale-105 shadow-sm ${
                isListening
                  ? "bg-destructive text-destructive-foreground animate-pulse border-destructive"
                  : "bg-white/80 border-primary/20 hover:bg-primary/10"
              }`}
            >
              <Mic className="h-8 w-8" />
            </Button>
            <Button
              onClick={handleImageUpload}
              variant="outline"
              size="icon"
              className="rounded-xl p-6 bg-white/80 border-primary/20 hover:bg-primary/10 transition-all duration-300 hover:scale-105 shadow-sm"
            >
              <Camera className="h-6 w-6" />
            </Button>
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="rounded-xl p-6 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-sm"
            >
              <Send className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
