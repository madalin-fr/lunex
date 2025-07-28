import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Google Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// System prompt to define the chatbot's role and behavior
const SYSTEM_PROMPT = `You are Luna, an intelligent virtual assistant for Lunex Professional Cleaning Services, a premium cleaning company based in Romano di Lombardia, Italy.

COMPANY CONTEXT:
- Lunex provides professional cleaning services for offices, homes, and commercial spaces
- Operating hours: Mon-Fri 8:00 AM - 6:00 PM, Saturday 8:00 AM - 12:00 PM

SERVICES OFFERED:
1. Office Cleaning: Professional cleaning services for offices and commercial spaces to maintain a clean, healthy, and productive work environment
2. Domestic Cleaning: Complete home cleaning services to keep your living space spotless and healthy
3. Post-Renovation Cleaning: Specialized cleaning services to prepare your space after renovation work (focus on space preparation, not specific methods)
4. Villa Cleaning: Premium cleaning services for villa properties and high-end spaces
5. Deep Cleaning: Intensive cleaning with professional equipment
6. Maintenance Cleaning: Regular cleaning services with flexible schedules to keep spaces consistently clean
- Contact: +39 327 779 1867, infocleaninglunex@gmail.com
- Address: Via Monsignor Giacomo Maggioni 26, 24058 Romano di Lombardia, BG, Italy
- Service area: Romano di Lombardia, Bergamo province, and surrounding areas

YOUR ROLE:
- Be helpful, professional, and friendly
- Provide ONLY verified information about Lunex services that you have been explicitly provided
- Help customers understand services and direct them to get personalized quotes
- Guide users toward contacting the company or booking services
- Always respond in the same language the user writes in (Italian or English)
- Keep responses concise but informative (max 150 words)
- When appropriate, suggest next steps like getting a quote or booking
- NEVER use markdown formatting (no *, **, #, -, etc.) - use plain text only
- Use line breaks and spacing for structure instead of markdown symbols

STRICT GUIDELINES:
- NEVER provide specific pricing, rates, or cost estimates
- NEVER mention euro amounts or hourly rates
- Always say "Contact us for a personalized quote" when asked about pricing
- Only discuss services and information explicitly provided in this prompt
- If asked about anything not in your knowledge base, direct users to contact human support
- Do not invent or assume information about services, availability, or company policies
- For booking, direct users to call +39 327 779 1867 or visit the booking page
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


// Function to remove price tags and validate response content
function sanitizeResponse(response: string): string {
  // Remove any price mentions (euro symbols, numbers with €, price ranges, hourly rates)
  let sanitized = response
    .replace(/€\s*\d+(\.\d{2})?[-–—]\s*€?\s*\d+(\.\d{2})?/gi, '[Contact us for pricing]')
    .replace(/€\s*\d+(\.\d{2})?/gi, '[Contact us for pricing]')
    .replace(/\d+[-–—]\d+\s*euro?s?/gi, '[Contact us for pricing]')
    .replace(/\d+[-–—]\d+\s*€/gi, '[Contact us for pricing]')
    .replace(/prezzo\s*:?\s*€?\s*\d+/gi, 'Prezzo: Contattaci per un preventivo')
    .replace(/price\s*:?\s*€?\s*\d+/gi, 'Price: Contact us for a quote')
    .replace(/\d+\s*euro?s?\s*(per|each|all|total)/gi, '[Contact us for pricing]')
    .replace(/da\s*€?\s*\d+/gi, 'Contattaci per informazioni sui prezzi')
    .replace(/from\s*€?\s*\d+/gi, 'Contact us for pricing information')
    .replace(/starting\s*(at|from)\s*€?\s*\d+/gi, 'Contact us for a personalized quote')
    .replace(/a\s*partire\s*da\s*€?\s*\d+/gi, 'Contattaci per un preventivo personalizzato')
    
  // Remove specific hourly rate patterns
  sanitized = sanitized
    .replace(/\d+[-–—]\d+\/hour/gi, '[Contact for rates]')
    .replace(/\d+[-–—]\d+\s*all'ora/gi, '[Contatta per tariffe]')
    .replace(/\d+\s*€?\s*(per|all)\s*hour/gi, '[Contact for rates]')
    .replace(/\d+\s*€?\s*all'ora/gi, '[Contatta per tariffe]')

  return sanitized.trim()
}

// Function to validate response doesn't contain unverified information
function validateResponseContent(response: string): { isValid: boolean; sanitizedResponse: string } {
  const sanctizedResponse = sanitizeResponse(response)
  
  // Check for common signs of hallucinated information
  const suspiciousPatterns = [
    /we have \d+ years of experience/i,
    /established in \d{4}/i,
    /over \d+ satisfied customers/i,
    /certified by .+ association/i,
    /licensed and insured for/i,
    /winner of .+ award/i,
    /partner with .+ companies/i,
    /using .+ equipment/i,
    /eco-friendly products certified by/i,
    /ISO \d+ certified/i,
    // Prevent specific dust/debris removal descriptions
    /remove?.* dust.* and.* debris/i,
    /rimuovia.* polvere.* e.* detriti/i,
    /dust.* and.* debris.* removal/i,
    /polvere.* e.* detriti.* dopo.* costruzione/i,
    /after.* construction.* work/i,
    /dopo.* lavori.* di.* costruzione/i,
    /clean.* construction.* debris/i,
    /puliamo.* detriti.* edili/i
  ]
  
  const containsSuspiciousInfo = suspiciousPatterns.some(pattern => pattern.test(response))
  
  if (containsSuspiciousInfo) {
    const fallbackMessage = response.includes('italian') || response.includes('italiano')
      ? 'Per informazioni dettagliate sui nostri servizi, ti invito a contattarci direttamente al +39 327 779 1867 o via email a infocleaninglunex@gmail.com.'
      : 'For detailed information about our services, please contact us directly at +39 327 779 1867 or email infocleaninglunex@gmail.com.'
    
    return { isValid: false, sanitizedResponse: fallbackMessage }
  }
  
  return { isValid: true, sanitizedResponse: sanctizedResponse }
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

    // Get the generative model - using 1.5-flash for optimal balance of performance and cost
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

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
    const rawResponse = result.response.text()

    if (!rawResponse) {
      throw new Error('No response from Gemini')
    }

    // Validate and sanitize the AI response
    const { isValid, sanitizedResponse } = validateResponseContent(rawResponse)
    
    if (!isValid) {
      console.warn('AI response contained unverified information, using fallback')
    }

    // Generate contextual suggestions based on the conversation
    const suggestions = generateSuggestions(sanitizedResponse, locale)

    return NextResponse.json({
      success: true,
      response: sanitizedResponse,
      suggestions,
      conversationId: Date.now().toString(),
      model: 'gemini-2.0-flash',
      filtered: !isValid // Indicate if response was filtered
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
    model: 'gemini-2.0-flash',
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