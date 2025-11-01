'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from '@/hooks/useLocale'
import { useFunctionalFeatures, useExternalServices } from '@/contexts/CookieConsentContext'
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Settings
} from 'lucide-react'
import { CookieCustomizationModal } from '../cookies/CookieCustomizationModal'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  suggestions?: string[]
  isAI?: boolean  // Track if message is from AI
  error?: boolean  // Track if message has error
}

interface ChatResponse {
  success: boolean
  response?: string
  suggestions?: string[]
  conversationId?: string
  error?: string
  fallbackResponse?: string
}

interface ChatbotProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Chatbot({ isOpen, onToggle }: ChatbotProps) {
  const { t, locale } = useLocale()
  const router = useRouter()
  const { canStoreChatHistory } = useFunctionalFeatures()
  const { canUseAI } = useExternalServices()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<Array<{role: 'user' | 'model', parts: [{text: string}]}>>([])
  const [showCookieSettings, setShowCookieSettings] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [initialized, setInitialized] = useState(false)
  const messageCounter = useRef(0)

  // Function to generate unique message IDs
  const generateUniqueId = () => {
    const timestamp = Date.now()
    const counter = messageCounter.current++
    return `${timestamp}-${counter}`
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize welcome message when component mounts
  useEffect(() => {
    if (!initialized) {
      const welcomeMessage: Message = {
        id: '1',
        text: t('chatbot.welcome'),
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          t('chatbot.suggestions.quote'),
          t('chatbot.suggestions.hours'),
          t('chatbot.suggestions.services'),
          t('chatbot.suggestions.booking')
        ],
        isAI: false
      }
      setMessages([welcomeMessage])
      setInitialized(true)
    }
  }, [initialized, t])

  // Update welcome message when locale changes
  useEffect(() => {
    if (initialized) {
      setMessages(prev => prev.map(msg => {
        if (msg.id === '1' && msg.sender === 'bot') {
          return {
            ...msg,
            text: t('chatbot.welcome'),
            suggestions: [
              t('chatbot.suggestions.quote'),
              t('chatbot.suggestions.hours'),
              t('chatbot.suggestions.services'),
              t('chatbot.suggestions.booking')
            ]
          }
        }
        return msg
      }))
    }
  }, [locale, t, initialized])

  const getAIResponse = async (userMessage: string): Promise<Message> => {
    // Check if external services (including AI) are allowed
    if (!canUseAI) {
      const consentMessage = locale === 'it'
        ? 'Per utilizzare l\'assistente AI intelligente, è necessario accettare i servizi esterni nelle impostazioni dei cookie. Nel frattempo, ecco alcune informazioni di base sui nostri servizi:'
        : 'To use our intelligent AI assistant, you need to accept external services in your cookie settings. Meanwhile, here\'s some basic information about our services:'
      
      const basicInfo = locale === 'it'
        ? `
Lunex Professional Cleaning Services offre:

• Pulizia uffici
• Pulizia domestica
• Pulizia post-ristrutturazione
• Pulizia ville
• Pulizia profonda
• Pulizia di mantenimento

Orari: Lun-Ven 8:00-18:00, Sab 8:00-12:00
Telefono: +39 327 779 1867
Email: infocleaninglunex@gmail.com
Zona: Romano di Lombardia, BG e dintorni

Per un preventivo personalizzato, contattaci direttamente!`
        : `
Lunex Professional Cleaning Services offers:

• Office cleaning
• Domestic cleaning
• Post-renovation cleaning
• Villa cleaning
• Deep cleaning
• Maintenance cleaning

Hours: Mon-Fri 8:00 AM-6:00 PM, Sat 8:00 AM-12:00 PM
Phone: +39 327 779 1867
Email: infocleaninglunex@gmail.com
Area: Romano di Lombardia, BG and surroundings

Contact us directly for a personalized quote!`

      return {
        id: generateUniqueId(),
        text: consentMessage + '\n' + basicInfo,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: canUseAI
          ? [
              t('chatbot.suggestions.quote'),
              t('chatbot.suggestions.services'),
              t('chatbot.suggestions.booking')
            ]
          : [
              t('chatbot.suggestions.contact'),
              t('chatbot.suggestions.cookieSettings')
            ],
        isAI: false
      }
    }

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory,
          locale: locale
        }),
      })

      const data: ChatResponse = await response.json()

      if (data.success && data.response) {
        // Update conversation history only if functional cookies allowed
        if (canStoreChatHistory) {
          setConversationHistory(prev => [
            ...prev,
            { role: 'user', parts: [{ text: userMessage }] },
            { role: 'model', parts: [{ text: data.response! }] }
          ])
        }

        return {
          id: generateUniqueId(),
          text: data.response,
          sender: 'bot',
          timestamp: new Date(),
          suggestions: data.suggestions || [],
          isAI: true
        }
      } else {
        // Handle API error with fallback
        return {
          id: generateUniqueId(),
          text: data.fallbackResponse || t('chatbot.responses.default.text'),
          sender: 'bot',
          timestamp: new Date(),
          suggestions: [
            t('chatbot.suggestions.quote'),
            t('chatbot.suggestions.services'),
            t('chatbot.suggestions.booking')
          ],
          isAI: false,
          error: true
        }
      }
    } catch (error) {
      console.error('Error getting AI response:', error)
      
      // Fallback response
      const fallbackText = locale === 'it'
        ? 'Mi dispiace, al momento non riesco a elaborare la tua richiesta. Ti prego di contattarci direttamente al +39 327 779 1867.'
        : 'I apologize, but I\'m currently unable to process your request. Please contact us directly at +39 327 779 1867.'

      return {
        id: generateUniqueId(),
        text: fallbackText,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          t('chatbot.suggestions.quote'),
          t('chatbot.suggestions.services'),
          t('chatbot.suggestions.booking')
        ],
        isAI: false,
        error: true
      }
    }
  }

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim()
    if (!text) return

    // Add user message
    const userMessage: Message = {
      id: generateUniqueId(),
      text,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Get AI response
    try {
      const botResponse = await getAIResponse(text)
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Error in handleSendMessage:', error)
      // Add fallback message
      const fallbackMessage: Message = {
        id: generateUniqueId(),
        text: locale === 'it'
          ? 'Mi dispiace, si è verificato un errore. Riprova o contattaci direttamente.'
          : 'Sorry, an error occurred. Please try again or contact us directly.',
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [],
        error: true,
        isAI: false
      }
      setMessages(prev => [...prev, fallbackMessage])
    } finally {
      setIsTyping(false)
    }
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
      {showCookieSettings && (
        <CookieCustomizationModal
          isOpen={showCookieSettings}
          onClose={() => setShowCookieSettings(false)}
        />
      )}

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
                      {message.text}
                    </p>
                    {message.error && (
                      <p className="text-xs text-red-500 mt-1">
                        {locale === 'it' ? 'Errore nella risposta' : 'Response error'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {message.suggestions && message.suggestions.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.suggestions.map((suggestion, index) => {
                    const displayText = suggestion
                    const colors = [
                      'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700 hover:from-green-100 hover:to-emerald-100 hover:border-green-300',
                      'bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200 text-blue-700 hover:from-blue-100 hover:to-sky-100 hover:border-blue-300',
                      'bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200 text-purple-700 hover:from-purple-100 hover:to-violet-100 hover:border-purple-300',
                      'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 text-amber-700 hover:from-amber-100 hover:to-yellow-100 hover:border-amber-300'
                    ]
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          if (displayText === t('chatbot.suggestions.cookieSettings')) {
                            setShowCookieSettings(true)
                          } else if (displayText === t('chatbot.suggestions.contact')) {
                            router.push('/contact')
                            onToggle()
                          } else {
                            handleSuggestionClick(displayText)
                          }
                        }}
                        className={`block w-full text-left p-3 text-sm rounded-lg border-2 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md ${colors[index % colors.length]}`}
                      >
                        <div className="flex items-center gap-2">
                          {displayText === t('chatbot.suggestions.cookieSettings') && <Settings className="w-4 h-4" />}
                          <span>{displayText}</span>
                        </div>
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
        {canUseAI && (
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
        )}
      </div>
    </div>
    </>
  )
}