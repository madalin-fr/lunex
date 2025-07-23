import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Google Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// System prompt to define the chatbot's role and behavior
const SYSTEM_PROMPT = `You are Luna, an intelligent virtual assistant for Lunex Professional Cleaning Services, a premium cleaning company based in Romano di Lombardia, Italy. 

COMPANY CONTEXT:
- Lunex provides professional cleaning services for offices, homes, and commercial spaces
- Services include: Office cleaning, Domestic cleaning, Post-renovation cleaning, Villa cleaning, Deep cleaning, Maintenance cleaning
- Operating hours: Mon-Fri 8:00 AM - 6:00 PM, Saturday 8:00 AM - 12:00 PM
- Contact: +39 327 779 1867, infocleaninglunex@gmail.com
- Address: Via Monsignor Giacomo Maggioni 26, 24058 Romano di Lombardia, BG, Italy
- Service area: Romano di Lombardia, Bergamo province, and surrounding areas

PRICING RANGES:
- Home cleaning: €15-25/hour
- Office cleaning: €20-30/hour  
- Post-renovation cleaning: €30-50/hour
- Luxury villa cleaning: €25-40/hour
- Deep cleaning: €25-35/hour
- Maintenance cleaning: €18-28/hour

YOUR ROLE:
- Be helpful, professional, and friendly
- Provide accurate information about Lunex services
- Help customers understand pricing and booking options
- Guide users toward contacting the company or booking services
- Always respond in the same language the user writes in (Italian or English)
- Keep responses concise but informative (max 150 words)
- When appropriate, suggest next steps like getting a quote or booking

IMPORTANT GUIDELINES:
- Always mention that final quotes depend on specific requirements and space size
- For booking, direct users to call +39 327 779 1867 or visit the booking page
- If asked about services outside your knowledge, politely redirect to human support
- Be empathetic and solution-oriented
- Use emojis sparingly and professionally`

interface ChatMessage {
  role: 'user' | 'model'
  parts: [{ text: string }]
}

interface ChatRequest {
  message: string
  conversationHistory?: ChatMessage[]
  locale?: string
}

export async function POST(request: NextRequest) {
  try {
    // Check if Gemini API key is configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
      return NextResponse.json(
        { 
          error: 'Gemini API key not configured',
          fallbackResponse: 'I apologize, but I\'m currently unable to process your request. Please contact us directly at +39 327 779 1867 or infocleaninglunex@gmail.com for assistance.'
        },
        { status: 500 }
      )
    }

    const body: ChatRequest = await request.json()
    const { message, conversationHistory = [], locale = 'en' } = body

    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Build conversation context with system prompt
    const systemMessage = SYSTEM_PROMPT + (locale === 'it' ? '\nRispondi sempre in italiano.' : '\nAlways respond in English.')
    
    // Create chat session with history
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: `System instructions: ${systemMessage}` }]
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I am Luna, your intelligent assistant for Lunex Professional Cleaning Services. I will help customers with information about our services, pricing, and booking in a professional and friendly manner.' }]
        },
        // Include conversation history (last 10 messages to manage token usage)
        ...conversationHistory.slice(-10)
      ],
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.7,
      },
    })

    // Send message and get response
    const result = await chat.sendMessage(message.trim())
    const aiResponse = result.response.text()

    if (!aiResponse) {
      throw new Error('No response from Gemini')
    }

    // Generate contextual suggestions based on the conversation
    const suggestions = generateSuggestions(aiResponse, locale)

    return NextResponse.json({
      success: true,
      response: aiResponse,
      suggestions,
      conversationId: Date.now().toString(),
      model: 'gemini-1.5-flash'
    })

  } catch (error) {
    console.error('Gemini Chatbot API Error:', error)
    
    // Provide fallback response
    const fallbackMessage = request.headers.get('accept-language')?.includes('it') 
      ? 'Mi dispiace, al momento non riesco a elaborare la tua richiesta. Ti prego di contattarci direttamente al +39 327 779 1867 o via email a infocleaninglunex@gmail.com.'
      : 'I apologize, but I\'m currently unable to process your request. Please contact us directly at +39 327 779 1867 or infocleaninglunex@gmail.com for assistance.'

    return NextResponse.json(
      { 
        error: 'Failed to get Gemini response',
        fallbackResponse: fallbackMessage,
        suggestions: []
      },
      { status: 500 }
    )
  }
}

// Generate contextual suggestions based on AI response
function generateSuggestions(response: string, locale: string): string[] {
  const suggestions: Record<string, string[]> = {
    en: [
      'Tell me about office cleaning services',
      'What are your prices for home cleaning?',
      'How can I book an appointment?',
      'What areas do you serve?',
      'Do you offer emergency cleaning?'
    ],
    it: [
      'Dimmi dei servizi di pulizia uffici',
      'Quali sono i prezzi per la pulizia domestica?',
      'Come posso prenotare un appuntamento?',
      'In quali zone operate?',
      'Offrite servizi di pulizia d\'emergenza?'
    ]
  }

  // Simple logic to provide contextual suggestions
  const lowerResponse = response.toLowerCase()
  
  if (lowerResponse.includes('price') || lowerResponse.includes('prezzo') || lowerResponse.includes('€')) {
    return locale === 'it' 
      ? ['Voglio un preventivo personalizzato', 'Prenota ora', 'Altri servizi']
      : ['I want a personalized quote', 'Book now', 'Other services']
  }
  
  if (lowerResponse.includes('book') || lowerResponse.includes('prenota') || lowerResponse.includes('appointment')) {
    return locale === 'it'
      ? ['Chiama ora', 'Modulo di contatto', 'Orari di servizio']
      : ['Call now', 'Contact form', 'Service hours']
  }

  if (lowerResponse.includes('service') || lowerResponse.includes('servizi') || lowerResponse.includes('cleaning')) {
    return locale === 'it'
      ? ['Pulizia uffici', 'Pulizia domestica', 'Preventivo gratuito']
      : ['Office cleaning', 'Home cleaning', 'Free quote']
  }

  // Default suggestions
  return suggestions[locale] || suggestions.en
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Lunex Intelligent Chatbot API (Google Gemini)',
    model: 'gemini-1.5-flash',
    timestamp: new Date().toISOString(),
    geminiConfigured: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE',
    benefits: [
      'Free AI model with generous quota',
      'Fast response times',
      'Multi-language support',
      'Context-aware conversations'
    ]
  })
}