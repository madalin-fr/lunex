# Google Maps Integration Setup Guide

This guide will help you set up Google Maps integration for the Lunex Cleaning Services website.

## Prerequisites

- Google Cloud Platform account
- Valid billing account (Google Maps API requires billing, but includes $200 free monthly credit)

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name your project (e.g., "Lunex Website")
4. Click "Create"

## Step 2: Enable Google Maps APIs

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for and enable the following APIs:
   - **Maps JavaScript API** (required)
   - **Places API** (optional, for location search)
   - **Geocoding API** (optional, for address conversion)

## Step 3: Create API Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Your API key will be generated
4. Click "Edit API key" to configure restrictions

## Step 4: Secure Your API Key

### HTTP Referrer Restrictions (Recommended)

1. Under "Application restrictions", select "HTTP referrers"
2. Add your allowed referrers:
   ```
   http://localhost:3000/*
   http://localhost:3001/*
   https://yourdomain.com/*
   https://www.yourdomain.com/*
   ```

### API Restrictions

1. Under "API restrictions", select "Restrict key"
2. Select the APIs you enabled:
   - Maps JavaScript API
   - Places API (if enabled)
   - Geocoding API (if enabled)

## Step 5: Add API Key to Your Project

1. Copy your API key
2. Open `.env.local` in your project root
3. Replace the placeholder:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-actual-api-key-here
   ```

## Step 6: Restart Development Server

```bash
npm run dev
```

## Usage in the Application

The GoogleMap component is already integrated in:
- Contact page (`/contact`)

### Component Props

```typescript
interface GoogleMapProps {
  center?: { lat: number; lng: number };  // Map center coordinates
  zoom?: number;                          // Zoom level (1-20)
  markers?: MapMarker[];                  // Array of markers
  height?: string;                        // Map height
  width?: string;                         // Map width
  className?: string;                     // Additional CSS classes
  mapOptions?: google.maps.MapOptions;    // Additional map options
  onMarkerClick?: (marker: MapMarker) => void; // Marker click handler
}
```

### Example Usage

```tsx
import GoogleMap from '@/components/ui/GoogleMap'

<GoogleMap
  center={{ lat: 41.8902, lng: 12.4922 }}
  zoom={15}
  height="400px"
  markers={[
    {
      position: { lat: 41.8902, lng: 12.4922 },
      title: 'Office Location',
      description: 'Our main office'
    }
  ]}
/>
```

## Customization

### Map Styles

The map uses modern, clean styles by default. You can customize the styles in the `modernMapStyles` array in the GoogleMap component.

### Markers

Custom markers can be added with icons:

```typescript
markers={[
  {
    position: { lat: 41.8902, lng: 12.4922 },
    title: 'Custom Marker',
    description: 'With custom icon',
    icon: '/path/to/custom-icon.png'
  }
]}
```

## Billing and Quotas

- Google Maps includes $200 free monthly credit
- Monitor usage in Google Cloud Console
- Set billing alerts to avoid unexpected charges
- Typical small business websites stay well within free tier

## Troubleshooting

### "Google Maps API key is missing"
- Ensure `.env.local` contains the correct API key
- Restart the development server after adding the key

### "This page can't load Google Maps correctly"
- Check browser console for specific errors
- Verify API key restrictions match your domain
- Ensure billing is enabled in Google Cloud Console

### Map not showing
- Check if the API key has the Maps JavaScript API enabled
- Verify there are no JavaScript errors in the console
- Ensure the component is receiving valid coordinates

## Additional Features

To add more features:

1. **Search Box**: Enable Places API and add search functionality
2. **Directions**: Use Directions API for route planning
3. **Street View**: Add Street View controls
4. **Drawing Tools**: Allow users to draw on the map

## Security Best Practices

1. Never commit API keys to version control
2. Use environment variables for all sensitive data
3. Implement proper API key restrictions
4. Monitor API usage regularly
5. Use HTTPS in production

## Support

For Google Maps API issues:
- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
- [Stack Overflow Google Maps Tag](https://stackoverflow.com/questions/tagged/google-maps)
- [Google Maps Platform Support](https://developers.google.com/maps/support)