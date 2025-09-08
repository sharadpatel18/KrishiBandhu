export interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

export interface Scheme {
  id: number
  name: string
  description: string
  amount: string
  eligibility: string
}

export interface MarketPrice {
  id: number
  crop: string
  price: number
  change: number
  market: string
}

export type Language = "en" | "ml" | "hi"

export interface WeatherData {
  temperature: number
  humidity: number
  rainfall: number
  windSpeed: number
  condition: string
}

export interface CropHealth {
  overall: number
  diseases: number
  pests: number
  nutrition: number
}
