import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';

// Cal.com webhook event types
interface CalWebhookPayload {
  triggerEvent: string;
  createdAt: string;
  payload: {
    title?: string;
    type?: string;
    description?: string;
    additionalNotes?: string;
    customInputs?: Record<string, string | number | boolean | Date | null>;
    startTime?: string;
    endTime?: string;
    organizer?: {
      id: number;
      name: string;
      email: string;
      username: string;
      timeZone: string;
      language: {
        locale: string;
      };
      timeFormat?: number;
    };
    attendees?: Array<{
      email: string;
      name: string;
      timeZone: string;
      language: {
        locale: string;
      };
    }>;
    location?: string;
    destinationCalendar?: {
      id: number;
      integration: string;
      externalId: string;
      userId?: number;
      eventTypeId?: number;
      teamId?: number;
    };
    hideCalendarNotes?: boolean;
    requiresConfirmation?: boolean;
    eventTypeId?: number;
    seatsShowAttendees?: boolean;
    seatsPerTimeSlot?: number;
    uid?: string;
    eventTitle?: string;
    eventDescription?: string;
    price?: number;
    currency?: string;
    length?: number;
    bookingId?: number;
    metadata?: Record<string, string | number | boolean | Date | null>;
    status?: string;
    rescheduleUid?: string;
    rescheduleStartTime?: string;
    rescheduleEndTime?: string;
    rescheduledBy?: string;
    cancelledBy?: string;
    cancellationReason?: string;
  };
}

// Verify Cal.com webhook signature
function verifyCalWebhook(payload: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  
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
    const signature = headersList.get('X-Cal-Signature-256');
    
    // Get webhook secret from environment variable
    const webhookSecret = process.env.CAL_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error('CAL_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }
    
    // Verify webhook signature
    if (!verifyCalWebhook(body, signature, webhookSecret)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }
    
    const data: CalWebhookPayload = JSON.parse(body);
    
    // Handle different event types
    switch (data.triggerEvent) {
      case 'BOOKING_CREATED':
        await handleBookingCreated(data);
        break;
        
      case 'BOOKING_RESCHEDULED':
        await handleBookingRescheduled(data);
        break;
        
      case 'BOOKING_CANCELLED':
        await handleBookingCancelled(data);
        break;
        
      case 'BOOKING_CONFIRMED':
        await handleBookingConfirmed(data);
        break;
        
      case 'BOOKING_REJECTED':
        await handleBookingRejected(data);
        break;
        
      case 'BOOKING_REQUESTED':
        await handleBookingRequested(data);
        break;
        
      case 'FORM_SUBMITTED':
        await handleFormSubmitted(data);
        break;
        
      case 'MEETING_ENDED':
        await handleMeetingEnded(data);
        break;
        
      default:
        console.log(`Unhandled Cal.com event type: ${data.triggerEvent}`);
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Cal.com webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleBookingCreated(data: CalWebhookPayload) {
  const { payload } = data;
  const attendee = payload.attendees?.[0];
  
  console.log('New Cal.com booking:', {
    bookingId: payload.bookingId,
    customerName: attendee?.name,
    customerEmail: attendee?.email,
    serviceType: payload.title,
    duration: payload.length,
    startTime: payload.startTime,
    endTime: payload.endTime,
    location: payload.location,
    price: payload.price,
    currency: payload.currency,
    additionalNotes: payload.additionalNotes,
  });
  
  // Here you would typically:
  // 1. Save booking details to your database
  // 2. Send confirmation email to customer
  // 3. Notify staff members
  // 4. Process payment if required
  
  try {
    if (attendee) {
      await sendBookingNotification({
        to: attendee.email,
        customerName: attendee.name,
        serviceName: payload.title || 'Appointment',
        dateTime: payload.startTime || '',
        duration: payload.length || 0,
        location: payload.location || 'TBD',
        bookingId: payload.bookingId?.toString() || '',
      });
    }
  } catch (error) {
    console.error('Failed to send booking notification:', error);
  }
}

async function handleBookingRescheduled(data: CalWebhookPayload) {
  const { payload } = data;
  const attendee = payload.attendees?.[0];
  
  console.log('Cal.com booking rescheduled:', {
    bookingId: payload.bookingId,
    customerName: attendee?.name,
    customerEmail: attendee?.email,
    oldStartTime: payload.rescheduleStartTime,
    oldEndTime: payload.rescheduleEndTime,
    newStartTime: payload.startTime,
    newEndTime: payload.endTime,
    rescheduledBy: payload.rescheduledBy,
  });
  
  // Update booking in database and notify customer
}

async function handleBookingCancelled(data: CalWebhookPayload) {
  const { payload } = data;
  const attendee = payload.attendees?.[0];
  
  console.log('Cal.com booking cancelled:', {
    bookingId: payload.bookingId,
    customerName: attendee?.name,
    customerEmail: attendee?.email,
    cancelledBy: payload.cancelledBy,
    cancellationReason: payload.cancellationReason,
  });
  
  // Update booking status and send cancellation confirmation
}

async function handleBookingConfirmed(data: CalWebhookPayload) {
  const { payload } = data;
  console.log('Cal.com booking confirmed:', {
    bookingId: payload.bookingId,
    status: payload.status,
  });
  
  // Update booking status to confirmed
}

async function handleBookingRejected(data: CalWebhookPayload) {
  const { payload } = data;
  console.log('Cal.com booking rejected:', {
    bookingId: payload.bookingId,
    status: payload.status,
  });
  
  // Handle rejected booking
}

async function handleBookingRequested(data: CalWebhookPayload) {
  const { payload } = data;
  console.log('Cal.com booking requested (requires confirmation):', {
    bookingId: payload.bookingId,
    requiresConfirmation: payload.requiresConfirmation,
  });
  
  // Handle booking that requires manual confirmation
}

async function handleFormSubmitted(data: CalWebhookPayload) {
  const { payload } = data;
  console.log('Cal.com form submitted:', {
    customInputs: payload.customInputs,
    metadata: payload.metadata,
  });
  
  // Process form submission data
}

async function handleMeetingEnded(data: CalWebhookPayload) {
  const { payload } = data;
  console.log('Cal.com meeting ended:', {
    bookingId: payload.bookingId,
    endTime: data.createdAt,
  });
  
  // Update booking status to completed
  // Send follow-up email or review request
}

// Mock function - replace with actual email service
async function sendBookingNotification(details: {
  to: string;
  customerName: string;
  serviceName: string;
  dateTime: string;
  duration: number;
  location: string;
  bookingId: string;
}) {
  console.log('Sending booking notification email:', details);
  // Implement your email sending logic here
}

// Webhook setup instructions
export async function GET() {
  return NextResponse.json({
    instructions: {
      setup: 'Add this webhook URL to your Cal.com account',
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/cal`,
      events: [
        'BOOKING_CREATED',
        'BOOKING_RESCHEDULED',
        'BOOKING_CANCELLED',
        'BOOKING_CONFIRMED',
        'BOOKING_REJECTED',
        'BOOKING_REQUESTED',
        'FORM_SUBMITTED',
        'MEETING_ENDED'
      ],
      configuration: {
        1: 'Go to Cal.com Settings > Developer > Webhooks',
        2: 'Click "New Webhook"',
        3: 'Enter the webhook URL above',
        4: 'Select the events you want to receive',
        5: 'Copy the signing secret and add it as CAL_WEBHOOK_SECRET in your .env file',
        6: 'Make sure to enable the webhook after creation'
      }
    }
  });
}