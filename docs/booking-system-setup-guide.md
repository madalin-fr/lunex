# Business-Ready Booking System Setup Guide

## Overview

This guide will help you set up a professional booking system for your business using free or affordable booking services. The implementation includes:

- Multiple booking service integrations (Calendly, Cal.com, etc.)
- Webhook endpoints for real-time notifications
- Admin dashboard for booking management
- Customizable booking page

## Quick Start (5 Minutes)

### Option 1: Calendly (Recommended for beginners)

1. **Sign up for Calendly**
   - Go to [calendly.com](https://calendly.com)
   - Create a free account
   - Verify your email

2. **Create Your First Event Type**
   - Click "Create New Event Type"
   - Choose "One-on-One" for individual appointments
   - Set duration (30, 60, 90 minutes)
   - Name it (e.g., "Hair Consultation", "Cleaning Service")

3. **Set Your Availability**
   - Click "Availability"
   - Set your working hours
   - Add buffer time between appointments
   - Set advance notice (e.g., 24 hours)

4. **Get Your Booking Link**
   - Copy your Calendly link (e.g., `https://calendly.com/yourbusiness/consultation`)

5. **Update Your Website**
   - Open `/src/app/booking/page.tsx`
   - Replace `calendlyUrl` with your actual link:
   ```typescript
   calendlyUrl: 'https://calendly.com/yourbusiness/consultation',
   ```

### Option 2: Cal.com (Open-source alternative)

1. **Sign up for Cal.com**
   - Go to [cal.com](https://cal.com)
   - Create account and choose username
   - This becomes your booking URL: `cal.com/yourusername`

2. **Connect Your Calendar**
   - Go to Settings > Integrations
   - Connect Google Calendar or Outlook
   - This prevents double bookings

3. **Create Event Types**
   - Click "Event Types" > "New"
   - Set up services (Hair Cut, Massage, etc.)
   - Configure duration and pricing

4. **Update Your Website**
   - Open `/src/app/booking/page.tsx`
   - Update with your Cal.com username:
   ```typescript
   calUsername: 'yourusername',
   ```

## Setting Up Webhooks

### Calendly Webhooks

1. **Access Webhook Settings**
   - Go to Calendly Dashboard
   - Navigate to Integrations > Webhooks
   - Click "Create Webhook"

2. **Configure Webhook**
   - URL: `https://yourdomain.com/api/webhooks/calendly`
   - Events: Select "invitee.created" and "invitee.canceled"
   - Copy the signing key

3. **Add to Environment Variables**
   ```bash
   CALENDLY_WEBHOOK_SECRET=your_signing_key_here
   ```

### Cal.com Webhooks

1. **Access Developer Settings**
   - Go to Settings > Developer > Webhooks
   - Click "New Webhook"

2. **Configure Webhook**
   - URL: `https://yourdomain.com/api/webhooks/cal`
   - Select all booking events
   - Copy the secret

3. **Add to Environment Variables**
   ```bash
   CAL_WEBHOOK_SECRET=your_webhook_secret_here
   ```

## Environment Variables Setup

Create or update your `.env.local` file:

```bash
# App URL (update with your domain)
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Webhook Secrets
CALENDLY_WEBHOOK_SECRET=your_calendly_secret
CAL_WEBHOOK_SECRET=your_cal_secret

# Email Service (optional)
EMAIL_FROM=noreply@yourdomain.com
SENDGRID_API_KEY=your_sendgrid_key
```

## Testing Your Booking System

1. **Test the Booking Flow**
   - Visit `/booking` on your site
   - Select a booking provider
   - Make a test booking
   - Check if booking appears in provider dashboard

2. **Test Webhooks (Local Development)**
   - Use [ngrok](https://ngrok.com) for local testing:
   ```bash
   ngrok http 3000
   ```
   - Use the ngrok URL for webhook configuration
   - Make a test booking
   - Check console logs for webhook data

3. **Access Admin Dashboard**
   - Visit `/admin/bookings`
   - View all bookings
   - Filter by status
   - Export booking data

## Customization Options

### Brand Colors
Update the booking integration colors in `/src/app/booking/page.tsx`:
```typescript
backgroundColor="#ffffff"  // Your background color
textColor="#374151"       // Your text color
primaryColor="#f59e0b"    // Your brand color
```

### Service Types
Add your specific services to both:
1. Your booking provider (Calendly/Cal.com)
2. The booking page for display

### Notification Templates
Customize email templates in webhook handlers:
- `/src/app/api/webhooks/calendly/route.ts`
- `/src/app/api/webhooks/cal/route.ts`

## Production Checklist

- [ ] Choose and configure booking provider
- [ ] Update booking URLs in code
- [ ] Set up production webhook URLs
- [ ] Add webhook secrets to production environment
- [ ] Configure email service for notifications
- [ ] Test complete booking flow
- [ ] Enable webhook endpoints in provider dashboard
- [ ] Set up backup notification method (SMS/WhatsApp)
- [ ] Create staff training documentation
- [ ] Set up booking policies (cancellation, rescheduling)

## Troubleshooting

### Booking Widget Not Loading
- Check if booking URL is correct
- Ensure no ad blockers are active
- Check browser console for errors

### Webhooks Not Working
- Verify webhook URL is publicly accessible
- Check webhook secrets match
- Review server logs for errors
- Test with webhook testing tools

### Time Zone Issues
- Calendly/Cal.com handle timezones automatically
- Ensure your business timezone is set correctly
- Test with customers in different timezones

## Support Resources

- **Calendly Help**: [help.calendly.com](https://help.calendly.com)
- **Cal.com Docs**: [cal.com/docs](https://cal.com/docs)
- **Community Support**: Join provider-specific forums

## Next Steps

1. **Enhance Security**
   - Add rate limiting to webhook endpoints
   - Implement webhook retry logic
   - Add monitoring and alerts

2. **Advanced Features**
   - Group bookings
   - Package deals
   - Membership discounts
   - Automated follow-ups

3. **Analytics**
   - Track booking conversion rates
   - Monitor popular time slots
   - Analyze cancellation patterns
   - Revenue reporting

Remember: Start simple with one provider, test thoroughly, then expand features based on your business needs.