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
      <button
        onClick={onToggle}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors animate-pulse"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-full sm:w-96 h-full sm:h-[600px] max-h-[80vh] sm:max-h-[600px] bg-white sm:rounded-lg shadow-2xl border border-gray-200 flex flex-col">
      {/* Mobile overlay background */}
      <div
        className="fixed inset-0 bg-black/50 sm:hidden -z-10"
        onClick={onToggle}
      />
      
      {/* Header */}
      <div className="bg-green-600 text-white p-4 sm:rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-green-100">
            <Bot className="w-7 h-7 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold">{t('chatbot.title')}</h3>
            <p className="text-sm text-green-100">{t('chatbot.status')}</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="text-white hover:text-green-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-green-600 text-white ml-auto'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === 'bot' && (
                  <Bot className="w-4 h-4 mt-1 text-green-600" />
                )}
                {message.sender === 'user' && (
                  <User className="w-4 h-4 mt-1 text-white" />
                )}
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-line">
                    {message.sender === 'bot' && message.textKey
                      ? t(message.textKey)
                      : message.text}
                  </p>
                  {message.suggestions && (
                    <div className="mt-3 space-y-1">
                      {message.suggestions.map((suggestion, index) => {
                        const displayText = message.suggestionKeys?.[index]
                          ? t(message.suggestionKeys[index])
                          : suggestion
                        return (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(displayText)}
                            className="block w-full text-left p-2 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                          >
                            {displayText}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-green-600" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
  )
}