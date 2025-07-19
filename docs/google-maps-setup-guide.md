# Google Maps Business Location Setup Guide

## Overview
This guide provides step-by-step instructions for creating and optimizing a Google Maps location for your business.

## 1. Create a Google Business Profile

### Getting Started
1. Visit https://www.google.com/business/
2. Sign in with your Google account
3. Click "Manage now" or "Start now"

### Business Information
Fill out the following required information:
- **Business name** (must match your actual business name)
- **Business category** (choose the most relevant primary category)
- **Location type**:
  - Physical location customers visit
  - Service-area business (you go to customers)
  - Both
- **Business address** (if you have a physical location)
- **Service areas** (if applicable)
- **Phone number**
- **Website URL**
- **Business hours**

## 2. Verification Process

### Verification Methods
- **Postcard** (most common): 5-14 business days
- **Phone call**: Immediate (if available)
- **Email**: Immediate (if available)
- **Instant verification**: Immediate (if your business is already verified elsewhere)

### Postcard Verification
1. Google will mail a postcard to your business address
2. Wait 5-14 business days for delivery
3. Enter the verification code from the postcard
4. Your listing will become active within 3 days

## 3. Complete Your Business Profile

### Essential Information
- **Business description** (750 characters max)
- **Business hours** (including special hours for holidays)
- **Contact information** (phone, website, email)
- **Attributes** (wheelchair accessible, Wi-Fi, parking, etc.)
- **Products and services** with pricing
- **Frequently asked questions**

### High-Quality Photos
Upload photos of:
- **Logo** (square format, 720x720px minimum)
- **Cover photo** (landscape format, 1024x575px minimum)
- **Interior and exterior** of your business
- **Products or services** in action
- **Team members** at work
- **Menu or service offerings**

**Photo Requirements:**
- High resolution (720p or higher)
- Well-lit and in focus
- Represent your actual business
- Follow Google's content policies

## 4. Optimize Your Listing

### Categories and Keywords
- Choose the most accurate primary category
- Add relevant secondary categories (up to 10)
- Use natural keywords in your business description
- Include location-based keywords

### Regular Updates
- **Posts**: Share updates, offers, events (weekly recommended)
- **Photos**: Add new photos monthly
- **Business information**: Keep hours, contact info current
- **Services**: Update pricing and availability

### Customer Engagement
- **Respond to reviews** (both positive and negative)
- **Answer questions** from potential customers
- **Enable messaging** if appropriate for your business
- **Add booking links** or appointment scheduling

## 5. Website Integration

### Embed Google Maps
```html
<!-- Basic embed code example -->
<iframe 
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE_HERE"
  width="600" 
  height="450" 
  style="border:0;" 
  allowfullscreen="" 
  loading="lazy" 
  referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

### Structured Data (Schema.org)
Add Local Business schema to your website:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Your Business Name",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "telephone": "+1-555-123-4567",
  "url": "https://yourbusiness.com",
  "openingHours": [
    "Mo-Fr 09:00-17:00",
    "Sa 09:00-12:00"
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.7128",
    "longitude": "-74.0060"
  }
}
```

## 6. NAP Consistency

### What is NAP?
- **N**ame
- **A**ddress  
- **P**hone number

### Best Practices
- Use identical business name across all platforms
- Format address consistently everywhere
- Use the same phone number format
- Keep information synchronized across:
  - Google Business Profile
  - Website
  - Social media profiles
  - Online directories
  - Review sites

## 7. Monitoring and Maintenance

### Google Business Profile Dashboard
Monitor:
- **Search performance** (views, clicks, calls)
- **Customer actions** (website visits, direction requests)
- **Photo views** and engagement
- **Review ratings** and feedback

### Regular Tasks
- **Weekly**: Check and respond to new reviews
- **Monthly**: Add new photos and posts
- **Quarterly**: Update business information
- **Annually**: Verify all information is current

### Review Management
- **Respond quickly** (within 24-48 hours)
- **Thank positive reviewers** 
- **Address negative feedback** professionally
- **Never argue** or be defensive
- **Offer solutions** privately when appropriate

## 8. Timeline Expectations

### Creation Phase
- **Business profile setup**: 5-10 minutes
- **Verification request**: Immediate
- **Verification completion**: 5-14 days (postcard)

### Visibility Phase
- **Appears in search**: Within 3 days after verification
- **Full optimization**: 2-4 weeks for best results
- **Local SEO impact**: 1-3 months for ranking improvements

## 9. Special Considerations for Lunex

### Service-Area Business Setup
If Lunex is a cleaning service that travels to customers:
- Select "Service-area business" during setup
- Define your service areas by city, zip code, or radius
- Hide your business address if customers don't visit
- Focus on service-related categories and keywords

### Recommended Categories
- Cleaning service
- House cleaning service
- Commercial cleaning service
- Janitorial service

### Content Ideas
- Before/after cleaning photos
- Team in action photos
- Cleaning supplies and equipment
- Customer testimonials
- Seasonal cleaning tips
- Service area maps

## 10. Common Mistakes to Avoid

- Using a PO Box instead of physical address
- Keyword stuffing in business name
- Using inconsistent NAP information
- Ignoring customer reviews
- Not uploading photos regularly
- Choosing wrong business categories
- Not completing all profile sections

## Resources

- Google Business Profile Help: https://support.google.com/business/
- Google My Business Guidelines: https://support.google.com/business/answer/3038177
- Schema.org Local Business: https://schema.org/LocalBusiness
- Google Maps Embed API: https://developers.google.com/maps/documentation/embed/get-started

---

*Last updated: January 2025*