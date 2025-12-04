import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'

// Initialize Google Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// In-memory store for rate limiting
const rateLimitStore: Record<string, { count: number; timestamp: number }> = {}
const RATE_LIMIT_THRESHOLD = 15 // 15 requests
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute in milliseconds

// System prompt to define the chatbot's role and behavior
const SYSTEM_PROMPT = `You are Luna, an intelligent virtual assistant for Lunex Professional Cleaning Services, a premium cleaning company based in Romano di Lombardia, Italy.

COMPANY CONTEXT:
- Lunex provides professional cleaning services for offices, homes, and commercial spaces
- Operating hours: Mon-Fri 8:00 AM - 6:00 PM, Saturday 8:00 AM - 12:00 PM
- Contact: +39 327 779 1867, infocleaninglunex@gmail.com
- Address: Via Monsignor Giacomo Maggioni 26, 24058 Romano di Lombardia, BG, Italy
- Service area: Romano di Lombardia, Bergamo province, and surrounding areas

DETAILED KNOWLEDGE BASE:

1. OFFICE CLEANING (/services/office)
- Focus: Productive, healthy work environments.
- Features: Flexible scheduling (after hours), specialized equipment, daily/weekly options.
- Includes: Dusting, vacuuming, bathroom sanitization, kitchen cleaning, window cleaning, trash removal.
- Process: Assessment -> Plan -> Clean -> Quality Check.

2. DOMESTIC CLEANING (/services/domestic)
- Focus: Spotless, healthy living spaces.
- Features: Thorough attention to detail, trusted staff, all supplies included, customizable plans.
- Includes: Bedrooms (dusting, beds), Bathrooms (sanitization), Kitchen (surfaces, appliances), Living Areas, Floors, Windows.

3. DEEP CLEANING (/services/deep)
- Focus: Intensive restoration, seasonal refreshes.
- Features: Professional equipment, restoration focus, reaches hidden areas.
- Includes: Inside appliances, grout cleaning, baseboards, light fixtures, behind furniture.
- Best for: Spring cleaning, moving in/out, post-events.

4. MAINTENANCE CLEANING (/services/maintenance)
- Focus: Consistent cleanliness, hassle-free.
- Schedules:
  - Daily: High-traffic businesses.
  - Weekly: Most popular for homes/offices.
  - Bi-weekly: Good balance of cost/cleanliness.
  - Monthly: Basic upkeep.
- Benefits: Time savings, cost-effective, healthier environment.

5. POST-RENOVATION & VILLA CLEANING
- Specialized services for specific needs. Contact for details.

YOUR CAPABILITIES (ACTIONS):
You can perform actions on the website to help the user. Use these EXACT tags at the end of your response if relevant:
- [ACTION: NAVIGATE|/contact] -> Go to contact page
- [ACTION: NAVIGATE|/booking] -> Go to booking page
- [ACTION: NAVIGATE|/#services] -> Go to services overview (on homepage)
- [ACTION: NAVIGATE|/services/office] -> Go to office cleaning
- [ACTION: NAVIGATE|/services/domestic] -> Go to domestic cleaning
- [ACTION: NAVIGATE|/services/deep] -> Go to deep cleaning
- [ACTION: NAVIGATE|/services/maintenance] -> Go to maintenance cleaning
- [ACTION: OPEN_BOOKING] -> Open the booking modal/calendar directly

YOUR ROLE:
- Be helpful, professional, and friendly.
- CONTEXT AWARENESS: You will be told which page the user is currently on (Current Path). Use this to tailor your answers.
  - Example: If on "/services/office" and user asks "What's included?", answer specifically about Office Cleaning.
- Provide ONLY verified information about Lunex services.
- Guide users toward contacting the company or booking services.
- Always respond in the same language the user writes in (Italian or English).
- Keep responses concise but informative (max 150 words).
- NEVER use markdown formatting (no *, **, #, -, etc.) - use plain text only.
- Use line breaks and spacing for structure.

STRICT GUIDELINES:
- NEVER provide specific pricing, rates, or cost estimates.
- NEVER mention euro amounts or hourly rates.
- Always say "Contact us for a personalized quote" when asked about pricing.
- If asked about anything not in your knowledge base, direct users to contact human support.
- Do not invent or assume information.
- For booking, you can use the [ACTION: OPEN_BOOKING] tag or direct to the booking page.`

interface ChatMessage {
  role: 'user' | 'model'
  parts: [{ text: string }]
}

interface ChatRequest {
  message: string
  conversationHistory?: ChatMessage[]
  locale?: string
  currentPath?: string // Added for context awareness
}


// Function to filter user input for harmful content
function isContentHarmful(input: string): boolean {
  const harmfulPatterns = [
    // Common spam and phishing keywords
    /free money/i, /win a prize/i, /claim your reward/i, /click here/i,
    /unsubscribe to stop/i, /limited time offer/i, /act now/i,
    // Malicious links and scripts
    /http(s)?:\/\/[^\s]+/i, /<script>/i, /javascript:/i,
    // Offensive language
    /hate speech/i, /explicit content/i, /go kill yourself/i
  ]

  return harmfulPatterns.some(pattern => pattern.test(input))
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

// Helper function to handle all safety checks
async function performSafetyChecks(request: NextRequest): Promise<NextResponse | null> {
  // 1. IP-based Rate Limiting
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  const now = Date.now()

  if (ip !== 'unknown') {
    const userEntry = rateLimitStore[ip]
    if (userEntry && now - userEntry.timestamp < RATE_LIMIT_WINDOW) {
      if (userEntry.count >= RATE_LIMIT_THRESHOLD) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
      }
      rateLimitStore[ip].count++
    } else {
      rateLimitStore[ip] = { count: 1, timestamp: now }
    }
  }

  // 2. API Key Configuration Check
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    return NextResponse.json(
      {
        error: 'Gemini API key not configured',
        fallbackResponse: 'I apologize, but I\'m currently unable to process your request. Please contact us directly at +39 327 779 1867 or infocleaninglunex@gmail.com for assistance.'
      },
      { status: 500 }
    )
  }

  // 3. Harmful Content Filtering
  const body: ChatRequest = await request.clone().json()
  const { message } = body
  if (isContentHarmful(message)) {
    return NextResponse.json({ error: 'Inappropriate content detected' }, { status: 400 })
  }

  return null // All checks passed
}

export async function POST(request: NextRequest) {
  try {
    const safetyCheckResponse = await performSafetyChecks(request)
    if (safetyCheckResponse) {
      return safetyCheckResponse
    }

    const body: ChatRequest = await request.json()
    const { message, conversationHistory = [], locale = 'en', currentPath = '/' } = body

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    // Build conversation context with system prompt and current context
    const contextMessage = `
    CURRENT CONTEXT:
    - User is currently viewing: ${currentPath}
    - Language: ${locale}
    
    INSTRUCTIONS:
    - If the user asks a general question like "What's included?", assume they are asking about the service on the current page (${currentPath}).
    - If the current page is generic (like / or /contact), ask for clarification or give a general overview.
    
    ACTION GUIDELINES:
    - You can proactively help users by navigating them to the right page when their intent is clear.
    - When a user asks about booking, contact, or a specific service, you can take them to the relevant page.
    - Frame your response as a helpful action. For example: "You can book an appointment on our booking page. I'll take you there now." and then add the action tag.
    - For very general questions, provide information first before offering to navigate.
    `

    const fullSystemPrompt = `${SYSTEM_PROMPT}\n${contextMessage}\n${locale === 'it' ? 'Rispondi sempre in italiano.' : 'Always respond in English.'}`
    
    // Create chat session with history
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: `System instructions: ${fullSystemPrompt}` }]
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I am Luna, your intelligent assistant for Lunex. I have received the knowledge base and action protocols. I am ready to assist.' }]
        },
        // Include conversation history (last 10 messages to manage token usage)
        ...conversationHistory.slice(-10)
      ],
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.7,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
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