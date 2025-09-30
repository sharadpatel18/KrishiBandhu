"use client"

import { useState } from "react"
import ChatPage from "@/components/pages/ChatPage"
import type { Message } from "@/lib/types"

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isListening, setIsListening] = useState(false)

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")

    try {
      alert("Sending message...")
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputText }),
      })

      const data = await res.json()

      if (data.text) {
        const botMessage: Message = {
          id: Date.now().toString(),
          text: data.text,
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      }
    } catch (err) {
      console.error("Error sending message:", err)
    }
  }

  const handleVoiceInput = () => {
    setIsListening((prev) => !prev)
    // you can add voice-to-text later
  }

  return (
    <ChatPage
      language="en"
      messages={messages}
      inputText={inputText}
      setInputText={setInputText}
      isListening={isListening}
      handleSendMessage={handleSendMessage}
      handleVoiceInput={handleVoiceInput}
    />
  )
}
