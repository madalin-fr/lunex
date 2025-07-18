# Sanity Blog Setup Guide

## Overview
Your blog is now set up with Sanity CMS, a powerful headless CMS that provides a great content editing experience for non-technical users.

## Setup Steps

### 1. Create a Sanity Project

1. Go to [sanity.io](https://www.sanity.io/) and create an account
2. Create a new project from the dashboard
3. Note your Project ID and Dataset name (usually "production")

### 2. Configure Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Deploy Sanity Studio

The Sanity Studio is already integrated at `/studio`. To access it:

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/studio`
3. Log in with your Sanity account

### 4. CORS Configuration

In your Sanity project settings (manage.sanity.io):
1. Go to API settings
2. Add your domains to CORS origins:
   - `http://localhost:3000` (development)
   - Your production domain

## Features Implemented

### Content Types
- **Posts**: Blog articles with rich text, images, categories, and authors
- **Authors**: Content creators with bio and profile image
- **Categories**: Organize posts by topics
- **Block Content**: Rich text editor with formatting options

### Pages
- `/blog` - Blog listing page with grid layout
- `/blog/[slug]` - Individual blog post pages
- `/studio` - Sanity Studio for content management

### Key Features
- Server-side rendering for SEO
- Image optimization with Next.js Image component
- Responsive design
- Category filtering
- Author profiles
- Rich text content with PortableText

## Content Management

### Creating a Blog Post
1. Go to `/studio`
2. Click on "Post" in the sidebar
3. Fill in the required fields:
   - Title
   - Slug (auto-generated from title)
   - Main Image
   - Categories
   - Author
   - Body content
4. Click "Publish"

### Managing Categories
1. Create categories first before assigning to posts
2. Each category needs a title and slug

### Managing Authors
1. Create author profiles with name, bio, and image
2. Assign authors to posts

## Customization Options

### Styling
- Blog listing: `/src/app/blog/page.tsx`
- Blog post: `/src/app/blog/[slug]/page.tsx`
- Modify Tailwind classes to match your design

### Schema Extensions
- Add fields to schemas in `/src/lib/sanity/schemas/`
- Common additions:
  - SEO metadata
  - Reading time
  - Tags
  - Related posts

### Performance
- Revalidation is set to 60 seconds
- Static generation for all blog posts
- Optimized images through Sanity's CDN

## Preview Mode (Optional Enhancement)

To add draft preview functionality:

1. Create an API route for preview mode
2. Add preview parameter to Sanity queries
3. Configure preview secret in Sanity Studio

## Best Practices

1. **Image Optimization**: Always add alt text to images
2. **SEO**: Use descriptive titles and excerpts
3. **Categories**: Keep them focused and limited
4. **Content**: Regular publishing schedule helps SEO
5. **Performance**: Monitor build times as content grows

## Troubleshooting

### Common Issues

1. **"Cannot find module 'sanity'"**: Run `npm install sanity @sanity/client --legacy-peer-deps`
2. **CORS errors**: Add your domain to Sanity CORS settings
3. **Missing content**: Check dataset name matches environment variable
4. **TypeScript errors**: These are mostly type definition issues that won't affect runtime

### Useful Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Next Steps

1. Create your Sanity project and add credentials
2. Create some test content in Sanity Studio
3. Customize the design to match your brand
4. Add blog link to your main navigation
5. Consider adding:
   - Search functionality
   - Newsletter signup
   - Comments system
   - Social sharing buttons