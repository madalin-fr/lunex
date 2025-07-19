import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY

interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export async function POST(request: NextRequest) {
  console.log('📧 [Contact API] Request received')
  
  try {
    const body: ContactFormData = await request.json()
    console.log('📧 [Contact API] Form data:', body)

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      console.error('❌ [Contact API] Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      console.error('❌ [Contact API] Invalid email format')
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    console.log('📤 [Contact API] Sending email via Resend...')
    
    try {
      // Send email using Resend
      const { data, error } = await resend.emails.send({
        from: 'Lunex Contact Form <onboarding@resend.dev>', // Use your verified domain here
        to: 'infocleaninglunex@gmail.com',
        subject: `Contact Form: ${body.subject}`,
        replyTo: body.email,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>New Contact Form Submission</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #007bff; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
                .content { background: #f4f4f4; padding: 20px; border-radius: 0 0 5px 5px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #555; }
                .value { margin-top: 5px; padding: 10px; background: white; border-radius: 3px; }
                .message { white-space: pre-wrap; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>New Contact Form Submission</h2>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">Name:</div>
                    <div class="value">${body.name}</div>
                  </div>
                  <div class="field">
                    <div class="label">Email:</div>
                    <div class="value">${body.email}</div>
                  </div>
                  ${body.phone ? `
                    <div class="field">
                      <div class="label">Phone:</div>
                      <div class="value">${body.phone}</div>
                    </div>
                  ` : ''}
                  <div class="field">
                    <div class="label">Subject:</div>
                    <div class="value">${body.subject}</div>
                  </div>
                  <div class="field">
                    <div class="label">Message:</div>
                    <div class="value message">${body.message}</div>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
        text: `
New Contact Form Submission

Name: ${body.name}
Email: ${body.email}
${body.phone ? `Phone: ${body.phone}` : ''}
Subject: ${body.subject}

Message:
${body.message}
        `
      })

      if (error) {
        console.error('❌ [Contact API] Resend error:', error)
        throw new Error(error.message)
      }

      console.log('✅ [Contact API] Email sent successfully!', data)
      
      return NextResponse.json({
        success: true,
        message: 'Your message has been sent successfully!',
        id: data?.id
      })

    } catch (emailError) {
      console.error('❌ [Contact API] Email sending failed:', emailError)
      
      // If Resend fails, provide helpful setup instructions
      if (emailError instanceof Error && emailError.message.includes('API')) {
        return NextResponse.json(
          { 
            error: 'Email service not configured. Please set up RESEND_API_KEY in your environment variables.',
            setupInstructions: 'Visit https://resend.com to get your API key'
          },
          { status: 503 }
        )
      }
      
      throw emailError
    }

  } catch (error) {
    console.error('❌ [Contact API] Error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}