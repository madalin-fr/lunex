# Vercel Deployment Guide for Lunex.it

## Prerequisites
- GitHub account with the repository
- Vercel account (free at vercel.com)
- Access to lunex.it domain DNS settings

## Step 1: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

## Step 2: Environment Variables

Add these environment variables in Vercel Dashboard → Settings → Environment Variables:

### Required Variables:
```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token

# Application URLs
NEXT_PUBLIC_APP_URL=https://lunex.it

# Booking Integrations (Optional)
CAL_API_KEY=your_cal_key
CAL_EVENT_TYPE_ID=your_event_type_id
CAL_WEBHOOK_SECRET=your_webhook_secret
CALENDLY_WEBHOOK_SECRET=your_calendly_secret

# Payment Integration (Optional)
STRIPE_SECRET_KEY=your_stripe_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key

# Email Service (Optional)
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_email
EMAIL_SERVER_PASSWORD=your_password
EMAIL_FROM=info@lunex.it

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

## Step 3: Custom Domain Configuration

### In Vercel:
1. Go to your project → Settings → Domains
2. Add domain: `lunex.it`
3. Add domain: `www.lunex.it`
4. You'll see DNS records to configure

### DNS Configuration Options:

#### Option A: Nameservers (Recommended)
Change your domain's nameservers to:
- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

#### Option B: A/AAAA Records
If keeping current DNS provider:

For apex domain (lunex.it):
- A Record: `76.76.21.21`

For www subdomain:
- CNAME Record: `cname.vercel-dns.com`

### SSL Certificate
- Vercel automatically provisions SSL certificates
- No action required after DNS propagation

## Step 4: Deploy Command

After initial setup, deploy with:

```bash
# Manual deploy from terminal
vercel --prod

# Or push to main branch for automatic deployment
git push origin main
```

## Step 5: Post-Deployment Checklist

### Verify Functionality:
- [ ] Homepage loads at lunex.it
- [ ] Blog posts load correctly
- [ ] Service pages work
- [ ] Contact form submits
- [ ] Booking integration works
- [ ] Sanity Studio accessible at /studio
- [ ] Multi-language switching works
- [ ] Chatbot functions properly

### Performance Optimization:
- [ ] Enable Vercel Analytics (in dashboard)
- [ ] Set up Web Vitals monitoring
- [ ] Configure caching headers
- [ ] Enable Image Optimization

### Security:
- [ ] All environment variables set
- [ ] API routes protected
- [ ] CORS configured correctly
- [ ] Rate limiting enabled

## Monitoring & Maintenance

### Vercel Dashboard Features:
- **Deployments**: View all deployments and rollback if needed
- **Functions**: Monitor API route usage and logs
- **Analytics**: Track visitor metrics
- **Logs**: Real-time function logs
- **Domains**: Manage SSL and DNS

### Useful Commands:
```bash
# View production logs
vercel logs --prod

# List all deployments
vercel list

# Rollback to previous deployment
vercel rollback

# Set environment variable
vercel env add VARIABLE_NAME
```

## Troubleshooting

### Build Failures:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in package.json
3. Verify environment variables are set
4. Run `npm run build` locally to test

### Domain Issues:
1. DNS propagation can take up to 48 hours
2. Check DNS with: `nslookup lunex.it`
3. Verify nameservers or A records

### API Route Errors:
1. Check function logs in Vercel dashboard
2. Ensure environment variables are accessible
3. Verify API route exports (GET, POST, etc.)
4. Check function timeout settings

## Cost Optimization

### Free Tier Includes:
- 100GB bandwidth
- Unlimited deployments
- Serverless function executions
- SSL certificates
- Custom domains

### Monitor Usage:
- Check usage in Vercel dashboard
- Set up usage alerts
- Optimize images and assets
- Enable caching headers

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Vercel Support](https://vercel.com/support)
- [Community Forum](https://github.com/vercel/next.js/discussions)