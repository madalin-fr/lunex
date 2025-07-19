'use client'

import { useState, useRef, useEffect } from 'react'
import { useLocale } from '@/hooks/useLocale'
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User
} from 'lucide-react'

interface Message {
  id: string
  text: string
  textKey?: string  // For bot messages, store the translation key
  sender: 'user' | 'bot'
  timestamp: Date
  suggestions?: string[]
  suggestionKeys?: string[]  // Store suggestion keys for bot messages
}

interface ChatbotProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Chatbot({ isOpen, onToggle }: ChatbotProps) {
  const { t, locale } = useLocale()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '',  // Will be filled by translation
      textKey: 'chatbot.welcome',
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [],  // Will be filled by translation
      suggestionKeys: [
        'chatbot.suggestions.quote',
        'chatbot.suggestions.hours',
        'chatbot.suggestions.services',
        'chatbot.suggestions.booking'
      ]
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Update all messages when locale changes
  useEffect(() => {
    setMessages(prevMessages =>
      prevMessages.map(msg => {
        if (msg.sender === 'bot' && msg.textKey) {
          return {
            ...msg,
            text: t(msg.textKey),
            suggestions: msg.suggestionKeys?.map(key => t(key)) || []
          }
        }
        return msg
      })
    )
  }, [locale, t])

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()
    
    let responseKey = 'default'
    
    // Detect keywords for both English and Italian
    if (lowerMessage.includes('preventivo') || lowerMessage.includes('prezzo') || lowerMessage.includes('costo') ||
        lowerMessage.includes('quote') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      responseKey = 'quote'
    } else if (lowerMessage.includes('orari') || lowerMessage.includes('quando') ||
               lowerMessage.includes('hours') || lowerMessage.includes('when')) {
      responseKey = 'hours'
    } else if (lowerMessage.includes('pulizia') || lowerMessage.includes('servizi') || lowerMessage.includes('tipo') ||
               lowerMessage.includes('clean') || lowerMessage.includes('service') || lowerMessage.includes('type')) {
      responseKey = 'services'
    } else if (lowerMessage.includes('prenota') || lowerMessage.includes('appuntamento') ||
               lowerMessage.includes('book') || lowerMessage.includes('appointment')) {
      responseKey = 'booking'
    } else if (lowerMessage.includes('dove') || lowerMessage.includes('zona') || lowerMessage.includes('romano') ||
               lowerMessage.includes('where') || lowerMessage.includes('area') || lowerMessage.includes('location')) {
      responseKey = 'location'
    } else if (lowerMessage.includes('emergenza') || lowerMessage.includes('urgente') ||
               lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
      responseKey = 'emergency'
    } else if (lowerMessage.includes('ciao') || lowerMessage.includes('salve') || lowerMessage.includes('buongiorno') ||
               lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('good morning')) {
      responseKey = 'greeting'
    } else if (lowerMessage.includes('grazie') || lowerMessage.includes('perfetto') || lowerMessage.includes('bene') ||
               lowerMessage.includes('thank') || lowerMessage.includes('perfect') || lowerMessage.includes('good')) {
      responseKey = 'thanks'
    }

    const suggestionKeys = [
      `chatbot.responses.${responseKey}.suggestions.0`,
      `chatbot.responses.${responseKey}.suggestions.1`,
      `chatbot.responses.${responseKey}.suggestions.2`,
      `chatbot.responses.${responseKey}.suggestions.3`
    ]

    return {
      id: Date.now().toString(),
      text: t(`chatbot.responses.${responseKey}.text`),
      textKey: `chatbot.responses.${responseKey}.text`,
      sender: 'bot',
      timestamp: new Date(),
      suggestions: suggestionKeys.map(key => t(key)).filter(s => s && !s.includes(`chatbot.responses.${responseKey}.suggestions`)),
      suggestionKeys: suggestionKeys.filter(key => {
        const translated = t(key)
        return translated && !translated.includes(`chatbot.responses.${responseKey}.suggestions`)
      })
    }
  }

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim()
    if (!text) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(text)
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50">
        {/* Attractive floating button with emotions */}
        <button
          onClick={onToggle}
          className="relative group"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-md opacity-75 group-hover:opacity-100 animate-pulse transition-opacity"></div>
          
          {/* Main button */}
          <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 text-white p-5 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:rotate-3">
            <MessageCircle className="w-8 h-8" />
            
            {/* Animated hearts floating up */}
            <div className="absolute -top-2 -right-1 text-red-500 animate-bounce">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            
            {/* Sparkle effect */}
            <div className="absolute -bottom-1 -left-1 text-yellow-300 animate-spin">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2l2.5 5.5L18 8l-4 4.5L15 18l-5-3-5 3 1-5.5L2 8l5.5-.5L10 2z" />
              </svg>
            </div>
          </div>
          
          {/* Notification dot */}
          <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
        </button>
        
        {/* Floating text bubble */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
            {t('chatbot.needHelp')}
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Mobile overlay background - darken the website but preserve navbar */}
      <div
        className="fixed top-16 left-0 right-0 bottom-0 bg-black/60 sm:hidden z-40"
        onClick={onToggle}
      />
      
      {/* Chatbot container with higher z-index to stay on top */}
      <div className="fixed top-20 left-[7.5%] right-[7.5%] bottom-[10%] sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-auto sm:w-96 h-auto sm:h-[600px] sm:max-h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 sm:rounded-t-lg">
        <div className="flex items-center justify-between">
          {/* Avatar and info in horizontal layout */}
          <div className="flex items-center gap-3">
            {/* Compact Animated Avatar */}
            <div className="relative w-12 h-12">
              {/* Outer glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-lg opacity-60 animate-pulse"></div>
              
              {/* Middle ring */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-green-50 rounded-full shadow-2xl border-2 border-white/30 animate-[spin_20s_linear_infinite]">
                <div className="absolute inset-1 bg-gradient-to-tr from-green-100 to-white rounded-full"></div>
              </div>
              
              {/* Inner avatar container */}
              <div className="absolute inset-1.5 bg-white rounded-full shadow-inner flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                {/* Animated bot icon with emotion */}
                <div className="relative">
                  <Bot className="w-6 h-6 text-green-600 animate-[bounce_2s_ease-in-out_infinite]" />
                  {/* Heart decoration for emotional touch */}
                  <div className="absolute -top-1 -right-1 text-red-500 animate-pulse">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {/* Sparkles for attractiveness */}
                  <div className="absolute -bottom-1 -left-1 text-yellow-400 animate-[spin_3s_linear_infinite]">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2l2.5 5.5L18 8l-4 4.5L15 18l-5-3-5 3 1-5.5L2 8l5.5-.5L10 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              
            </div>
            
            {/* Title and status */}
            <div className="text-left">
              <h3 className="font-bold text-lg leading-tight">{t('chatbot.title')}</h3>
              <p className="text-xs text-green-100 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                {t('chatbot.status')}
              </p>
            </div>
          </div>
          
          {/* Close button */}
          <button
            onClick={onToggle}
            className="text-white/80 hover:text-white transition-all transform hover:scale-110"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] ${
                message.sender === 'user'
                  ? 'ml-auto'
                  : ''
              }`}
            >
              <div className={`p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <div className="flex items-start space-x-3">
                  {message.sender === 'bot' && (
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center shadow-md transform hover:scale-110 transition-transform">
                        <Bot className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  )}
                  {message.sender === 'user' && (
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-line">
                      {message.sender === 'bot' && message.textKey
                        ? t(message.textKey)
                        : message.text}
                    </p>
                  </div>
                </div>
              </div>
              {message.suggestions && (
                <div className="mt-2 space-y-2">
                  {message.suggestions.map((suggestion, index) => {
                    const displayText = message.suggestionKeys?.[index]
                      ? t(message.suggestionKeys[index])
                      : suggestion
                    const colors = [
                      'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700 hover:from-green-100 hover:to-emerald-100 hover:border-green-300',
                      'bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200 text-blue-700 hover:from-blue-100 hover:to-sky-100 hover:border-blue-300',
                      'bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200 text-purple-700 hover:from-purple-100 hover:to-violet-100 hover:border-purple-300',
                      'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 text-amber-700 hover:from-amber-100 hover:to-yellow-100 hover:border-amber-300'
                    ]
                    return (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(displayText)}
                        className={`block w-full text-left p-3 text-sm rounded-lg border-2 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md ${colors[index % colors.length]}`}
                      >
                        {displayText}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    <Bot className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 text-yellow-400 animate-spin">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2l2.5 5.5L18 8l-4 4.5L15 18l-5-3-5 3 1-5.5L2 8l5.5-.5L10 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('chatbot.placeholder')}
            className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-600 text-black bg-white"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim()}
            className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        {/* Quick actions */}
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => handleSuggestionClick(t('chatbot.suggestions.quote'))}
            className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full hover:bg-green-100 transition-colors"
          >
            {t('chatbot.quickActions.quote')}
          </button>
          <button
            onClick={() => handleSuggestionClick(t('chatbot.suggestions.booking'))}
            className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full hover:bg-emerald-100 transition-colors"
          >
            {t('chatbot.quickActions.book')}
          </button>
          <button
            onClick={() => handleSuggestionClick(t('chatbot.suggestions.services'))}
            className="text-xs bg-teal-50 text-teal-600 px-3 py-1 rounded-full hover:bg-teal-100 transition-colors"
          >
            {t('chatbot.quickActions.services')}
          </button>
        </div>
      </div>
    </div>
    </>
  )
}