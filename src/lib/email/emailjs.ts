// EmailJS configuration for sending contact form emails
// This allows sending emails directly from the browser without a backend email service

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'default_service',
  TEMPLATE_ID: 'template_contact',
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY' // You'll need to replace this
}

export interface EmailTemplateParams {
  from_name: string
  from_email: string
  phone?: string
  subject: string
  message: string
  to_email: string
}

// Instructions for setting up EmailJS:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Add your email service (Gmail, Outlook, etc.)
// 3. Create an email template with these variables:
//    - {{from_name}} - Sender's name
//    - {{from_email}} - Sender's email
//    - {{phone}} - Sender's phone (optional)
//    - {{subject}} - Email subject
//    - {{message}} - Email message
//    - {{to_email}} - Your email (infocleaninglunex@gmail.com)
// 4. Get your Public Key from Account > API Keys
// 5. Replace 'YOUR_PUBLIC_KEY' above with your actual public key