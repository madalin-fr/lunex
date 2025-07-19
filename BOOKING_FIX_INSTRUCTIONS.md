# Critical Booking Issue Fix Instructions

## Problem Identified
The booking system is not working because the Cal.com integration credentials are missing.

## Quick Fix (5 minutes)

### Step 1: Sign up for Cal.com (Free)
1. Go to [cal.com](https://cal.com)
2. Click "Sign Up"
3. Choose a username (e.g., "lunex-beauty" or your business name)
   - This becomes your booking URL: `cal.com/your-username`
4. Complete the registration

### Step 2: Update Environment Variables
1. Open the `.env.local` file I just created
2. Replace `your-cal-username` with your actual Cal.com username:
   ```
   NEXT_PUBLIC_CAL_USERNAME=lunex-beauty
   NEXT_PUBLIC_CAL_LINK=https://cal.com/lunex-beauty
   ```

### Step 3: Restart Your Development Server
```bash
# Stop the current server (Ctrl+C) then run:
npm run dev
```

### Step 4: Create Event Types in Cal.com
1. Log into your Cal.com dashboard
2. Click "Event Types"
3. Create events for each service:
   - "Office Cleaning" (2-4 hours)
   - "Domestic Cleaning" (1-3 hours)
   - "Post Renovation" (3-6 hours)
   - "Luxury Cleaning" (2-5 hours)
   - "Deep Cleaning" (4-8 hours)
   - "Maintenance Plan" (Recurring)

### Step 5: Set Your Availability
1. Go to "Availability" in Cal.com
2. Set your business hours
3. Add buffer time between appointments
4. Set minimum booking notice (e.g., 24 hours)

## Testing the Fix
1. Visit http://localhost:3000/booking
2. You should now see the Cal.com booking widget instead of just phone buttons
3. Try making a test booking

## Optional: Set Up Webhooks (for notifications)
1. In Cal.com, go to Settings > Developer > Webhooks
2. Add webhook URL: `https://your-domain.com/api/webhooks/cal`
3. Copy the webhook secret
4. Update `.env.local` with the webhook secret

## Need Help?
- Cal.com Documentation: https://cal.com/docs
- Contact support if the issue persists

## Alternative: Use Calendly
If you prefer Calendly:
1. Sign up at calendly.com
2. Update `.env.local`:
   ```
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/consultation
   ```
3. Comment out the Cal.com variables