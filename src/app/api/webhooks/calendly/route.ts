import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';

// Calendly webhook event types
interface CalendlyWebhookPayload {
  event: string;
  time: string;
  payload: {
    event_type: {
      uuid: string;
      kind: string;
      slug: string;
      name: string;
      duration: number;
    };
    event: {
      uuid: string;
      assigned_to: string[];
      extended_assigned_to: Array<{
        email: string;
        name: string;
      }>;
      start_time: string;
      start_time_pretty: string;
      invitee_start_time: string;
      invitee_start_time_pretty: string;
      end_time: string;
      end_time_pretty: string;
      invitee_end_time: string;
      invitee_end_time_pretty: string;
      created_at: string;
      location: string;
      canceled: boolean;
      canceler_name?: string;
      cancel_reason?: string;
      canceled_at?: string;
    };
    invitee: {
      uuid: string;
      first_name: string;
      last_name: string;
      name: string;
      email: string;
      text_reminder_number?: string;
      timezone: string;
      created_at: string;
      is_reschedule: boolean;
      payments?: Array<{
        id: string;
        provider: string;
        amount: number;
        currency: string;
        terms: string;
        successful: boolean;
      }>;
      canceled: boolean;
      canceler_name?: string;
      cancel_reason?: string;
      canceled_at?: string;
    };
    questions_and_answers?: Array<{
      question: string;
      answer: string;
    }>;
    questions_and_responses?: {
      [key: string]: {
        question: string;
        response: string;
      };
    };
    tracking?: {
      utm_campaign?: string;
      utm_source?: string;
      utm_medium?: string;
      utm_content?: string;
      utm_term?: string;
      salesforce_uuid?: string;
    };
    old_event?: {
      uuid: string;
      assigned_to: string[];
      extended_assigned_to: Array<{
        email: string;
        name: string;
      }>;
      start_time: string;
      start_time_pretty: string;
      invitee_start_time: string;
      invitee_start_time_pretty: string;
      end_time: string;
      end_time_pretty: string;
      invitee_end_time: string;
      invitee_end_time_pretty: string;
      created_at: string;
      location: string;
      canceled: boolean;
      canceler_name?: string;
      cancel_reason?: string;
      canceled_at?: string;
    };
    old_invitee?: {
      uuid: string;
      first_name: string;
      last_name: string;
      name: string;
      email: string;
      text_reminder_number?: string;
      timezone: string;
      created_at: string;
      is_reschedule: boolean;
      payments?: Array<{
        id: string;
        provider: string;
        amount: number;
        currency: string;
        terms: string;
        successful: boolean;
      }>;
      canceled: boolean;
      canceler_name?: string;
      cancel_reason?: string;
      canceled_at?: string;
    };
    new_event?: {
      uuid: string;
      assigned_to: string[];
      extended_assigned_to: Array<{
        email: string;
        name: string;
      }>;
      start_time: string;
      start_time_pretty: string;
      invitee_start_time: string;
      invitee_start_time_pretty: string;
      end_time: string;
      end_time_pretty: string;
      invitee_end_time: string;
      invitee_end_time_pretty: string;
      created_at: string;
      location: string;
      canceled: boolean;
      canceler_name?: string;
      cancel_reason?: string;
      canceled_at?: string;
    };
    new_invitee?: {
      uuid: string;
      first_name: string;
      last_name: string;
      name: string;
      email: string;
      text_reminder_number?: string;
      timezone: string;
      created_at: string;
      is_reschedule: boolean;
      payments?: Array<{
        id: string;
        provider: string;
        amount: number;
        currency: string;
        terms: string;
        successful: boolean;
      }>;
      canceled: boolean;
      canceler_name?: string;
      cancel_reason?: string;
      canceled_at?: string;
    };
  };
}

// Verify Calendly webhook signature
function verifyCalendlyWebhook(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('Calendly-Webhook-Signature');
    
    // Get webhook secret from environment variable
    const webhookSecret = process.env.CALENDLY_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error('CALENDLY_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }
    
    // Verify webhook signature
    if (signature && !verifyCalendlyWebhook(body, signature, webhookSecret)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }
    
    const data: CalendlyWebhookPayload = JSON.parse(body);
    
    // Handle different event types
    switch (data.event) {
      case 'invitee.created':
        await handleBookingCreated(data);
        break;
        
      case 'invitee.canceled':
        await handleBookingCanceled(data);
        break;
        
      case 'invitee_scheduled':
        // Legacy event type
        await handleBookingCreated(data);
        break;
        
      case 'invitee_canceled':
        // Legacy event type
        await handleBookingCanceled(data);
        break;
        
      default:
        console.log(`Unhandled Calendly event type: ${data.event}`);
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Calendly webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleBookingCreated(data: CalendlyWebhookPayload) {
  const { invitee, event, event_type } = data.payload;
  
  console.log('New Calendly booking:', {
    customerName: invitee.name,
    customerEmail: invitee.email,
    customerPhone: invitee.text_reminder_number,
    serviceType: event_type.name,
    duration: event_type.duration,
    startTime: event.start_time,
    endTime: event.end_time,
    location: event.location,
  });
  
  // Here you would typically:
  // 1. Save booking details to your database
  // 2. Send confirmation email to customer
  // 3. Notify staff members
  // 4. Update your internal calendar
  
  // Example: Send notification email
  try {
    await sendBookingNotification({
      to: invitee.email,
      customerName: invitee.name,
      serviceName: event_type.name,
      dateTime: event.start_time_pretty,
      duration: event_type.duration,
      location: event.location,
    });
  } catch (error) {
    console.error('Failed to send booking notification:', error);
  }
}

async function handleBookingCanceled(data: CalendlyWebhookPayload) {
  const { invitee } = data.payload;
  
  console.log('Calendly booking canceled:', {
    customerName: invitee.name,
    customerEmail: invitee.email,
    canceledBy: invitee.canceler_name,
    cancelReason: invitee.cancel_reason,
    canceledAt: invitee.canceled_at,
  });
  
  // Here you would typically:
  // 1. Update booking status in your database
  // 2. Send cancellation confirmation
  // 3. Free up the time slot
  // 4. Notify relevant staff
}

// Mock function - replace with actual email service
async function sendBookingNotification(details: {
  to: string;
  customerName: string;
  serviceName: string;
  dateTime: string;
  duration: number;
  location: string;
}) {
  console.log('Sending booking notification email:', details);
  // Implement your email sending logic here
  // You could use services like SendGrid, AWS SES, or Resend
}

// Webhook setup instructions
export async function GET() {
  return NextResponse.json({
    instructions: {
      setup: 'Add this webhook URL to your Calendly account',
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/calendly`,
      events: [
        'invitee.created',
        'invitee.canceled'
      ],
      configuration: {
        1: 'Go to Calendly Dashboard > Integrations > Webhooks',
        2: 'Click "Create Webhook"',
        3: 'Enter the webhook URL above',
        4: 'Select the events you want to receive',
        5: 'Copy the signing key and add it as CALENDLY_WEBHOOK_SECRET in your .env file'
      }
    }
  });
}