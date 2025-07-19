// Booking configuration
// This file centralizes booking-related configuration that needs to be accessed from client components

export const bookingConfig = {
  // Cal.com configuration
  cal: {
    username: process.env.NEXT_PUBLIC_CAL_USERNAME || '',
    link: process.env.NEXT_PUBLIC_CAL_LINK || ''
  },
  
  // Calendly configuration (if needed in the future)
  calendly: {
    url: process.env.NEXT_PUBLIC_CALENDLY_URL || ''
  },
  
  // Default booking service
  defaultService: 'cal' as const,
  
  // Service availability
  services: {
    cal: !!process.env.NEXT_PUBLIC_CAL_USERNAME,
    calendly: !!process.env.NEXT_PUBLIC_CALENDLY_URL
  }
};

// Helper function to get the external booking link
export function getExternalBookingLink(eventSlug?: string): string {
  const { cal } = bookingConfig;
  
  if (!cal.username) {
    return '';
  }
  
  const baseUrl = cal.link || `https://cal.com/${cal.username}`;
  return eventSlug ? `${baseUrl}/${eventSlug}` : baseUrl;
}

// Helper function to check if booking is configured
export function isBookingConfigured(): boolean {
  return bookingConfig.services.cal || bookingConfig.services.calendly;
}