'use client'

import { useState, useRef, useEffect } from 'react'
import { useLocale } from '@/hooks/useLocale'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  suggestions?: string[]
}

interface ChatbotProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Chatbot({ isOpen, onToggle }: ChatbotProps) {
  const { t } = useLocale()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Ciao! Sono l\'assistente virtuale di Lunex. Come posso aiutarti oggi con i nostri servizi di pulizia?',
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        'Voglio un preventivo',
        'Orari di servizio',
        'Tipi di pulizia',
        'Prenota un appuntamento'
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

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()
    
    let response = ''
    let suggestions: string[] = []

    if (lowerMessage.includes('preventivo') || lowerMessage.includes('prezzo') || lowerMessage.includes('costo')) {
      response = 'Perfetto! I nostri prezzi dipendono dal tipo di servizio:\n\n• Pulizia domestica: €15-25/ora\n• Pulizia uffici: €20-30/ora\n• Pulizia post-ristrutturazione: €30-50/ora\n• Pulizia ville di lusso: €25-40/ora\n\nVuoi un preventivo personalizzato?'
      suggestions = ['Sì, voglio un preventivo', 'Servizi disponibili', 'Come prenotare']
    } else if (lowerMessage.includes('orari') || lowerMessage.includes('quando')) {
      response = 'I nostri orari di servizio sono:\n\n• Lunedì-Venerdì: 8:00-18:00\n• Sabato: 9:00-17:00\n• Domenica: Solo emergenze\n\nSiamo disponibili anche per servizi fuori orario su richiesta!'
      suggestions = ['Prenota ora', 'Servizio emergenza', 'Contatti']
    } else if (lowerMessage.includes('pulizia') || lowerMessage.includes('servizi') || lowerMessage.includes('tipo')) {
      response = 'Offriamo diversi tipi di pulizia professionale:\n\n• 🏢 Pulizia uffici\n• 🏠 Pulizia domestica\n• 🔨 Pulizia post-ristrutturazione\n• ✨ Pulizia ville di lusso\n• 🧽 Pulizia profonda\n• 🔄 Pulizia di mantenimento\n\nQuale ti interessa di più?'
      suggestions = ['Pulizia uffici', 'Pulizia domestica', 'Pulizia post-ristrutturazione', 'Preventivo']
    } else if (lowerMessage.includes('prenota') || lowerMessage.includes('appuntamento')) {
      response = 'Ottimo! Per prenotare un appuntamento hai diverse opzioni:\n\n1. 📱 Compila il form di prenotazione online\n2. 📞 Chiama il +39 327 779 1867\n3. 📧 Email: info@lunex-cleaning.com\n\nPreferisci prenotare online?'
      suggestions = ['Prenota online', 'Chiama ora', 'Invia email']
    } else if (lowerMessage.includes('dove') || lowerMessage.includes('zona') || lowerMessage.includes('romano')) {
      response = 'Operiamo principalmente in:\n\n• Romano di Lombardia\n• Bergamo e provincia\n• Zone limitrofe\n\nPer zone più distanti, contattaci per verificare la disponibilità!'
      suggestions = ['Verifica disponibilità', 'Contatti', 'Preventivo']
    } else if (lowerMessage.includes('emergenza') || lowerMessage.includes('urgente')) {
      response = 'Per emergenze di pulizia siamo disponibili 24/7!\n\n📞 Numero emergenze: +39 327 779 1867\n\nTariffe emergenza: +50% sul prezzo base\nTempo di intervento: 2-4 ore'
      suggestions = ['Chiama emergenza', 'Preventivo normale', 'Orari standard']
    } else if (lowerMessage.includes('ciao') || lowerMessage.includes('salve') || lowerMessage.includes('buongiorno')) {
      response = 'Ciao! Benvenuto in Lunex Professional Cleaning! 👋\n\nSono qui per aiutarti con informazioni sui nostri servizi di pulizia professionale. Cosa posso fare per te?'
      suggestions = ['Voglio un preventivo', 'Servizi disponibili', 'Come prenotare', 'Contatti']
    } else if (lowerMessage.includes('grazie') || lowerMessage.includes('perfetto') || lowerMessage.includes('bene')) {
      response = 'Prego! Sono qui per aiutarti! 😊\n\nSe hai altre domande o vuoi procedere con la prenotazione, fammi sapere!'
      suggestions = ['Prenota ora', 'Altre domande', 'Contatti']
    } else {
      response = 'Capisco la tua richiesta! Per informazioni più specifiche, ti suggerisco di:\n\n• Contattare il nostro team al +39 327 779 1867\n• Visitare la sezione servizi del sito\n• Compilare il form di contatto\n\nCosa preferisci fare?'
      suggestions = ['Chiama ora', 'Vedi servizi', 'Contatta via email', 'Preventivo']
    }

    return {
      id: Date.now().toString(),
      text: response,
      sender: 'bot',
      timestamp: new Date(),
      suggestions
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
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors animate-pulse"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">Assistente Lunex</h3>
            <p className="text-sm text-blue-100">Online ora</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="text-white hover:text-blue-100 transition-colors"
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
                  ? 'bg-blue-600 text-white ml-auto'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === 'bot' && (
                  <Bot className="w-4 h-4 mt-1 text-blue-600" />
                )}
                {message.sender === 'user' && (
                  <User className="w-4 h-4 mt-1 text-white" />
                )}
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  {message.suggestions && (
                    <div className="mt-3 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left p-2 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-blue-600" />
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
            placeholder="Scrivi un messaggio..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim()}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        {/* Quick actions */}
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => handleSuggestionClick('Voglio un preventivo')}
            className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
          >
            💰 Preventivo
          </button>
          <button
            onClick={() => handleSuggestionClick('Prenota un appuntamento')}
            className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full hover:bg-green-100 transition-colors"
          >
            📅 Prenota
          </button>
          <button
            onClick={() => handleSuggestionClick('Servizi disponibili')}
            className="text-xs bg-purple-50 text-purple-600 px-3 py-1 rounded-full hover:bg-purple-100 transition-colors"
          >
            🧽 Servizi
          </button>
        </div>
      </div>
    </div>
  )
}