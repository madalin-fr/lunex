import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { createClient } from '@sanity/client'
import { Review, ServiceType } from '@/lib/sanity/types'

// Create separate client for reviews
const reviewsClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_REVIEWS_PROJECT_ID || 'n6k9v913',
  dataset: process.env.NEXT_PUBLIC_SANITY_REVIEWS_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const featured = searchParams.get('featured')
  const limit = searchParams.get('limit')
  
  // Build the query based on parameters
  let filter = '_type == "review" && verified == true && publishedAt <= now()'
  
  if (featured === 'true') {
    filter += ' && featured == true'
  }
  
  let query = `*[${filter}] | order(publishedAt desc) {
    _id,
    clientName,
    "service": {
      "it": select(
        service == "office" => "Pulizie Uffici",
        service == "domestic" => "Pulizie Domestiche",
        service == "post-renovation" => "Pulizie Post-Ristrutturazione",
        service == "villa" => "Pulizie Ville",
        service == "deep" => "Pulizie Approfondite",
        service == "maintenance" => "Pulizie di Mantenimento",
        service
      ),
      "en": select(
        service == "office" => "Office Cleaning",
        service == "domestic" => "Domestic Cleaning",
        service == "post-renovation" => "Post-Renovation Cleaning",
        service == "villa" => "Villa Cleaning",
        service == "deep" => "Deep Cleaning",
        service == "maintenance" => "Maintenance Cleaning",
        service
      )
    },
    rating,
    testimonial,
    "reviewDate": publishedAt, // Keep this as reviewDate is more semantic for the frontend
    "clientPhoto": clientPhoto { // Match frontend expectation
      asset-> {
        _ref,
        _type,
        url
      },
      alt
    },
    featured,
    verified
  }`
  
  // Add limit if specified
  if (limit && !isNaN(Number(limit))) {
    query += `[0...${Number(limit)}]`
  }
  
  try {
    const reviews = await reviewsClient.fetch(query)
    return NextResponse.json(reviews || [])
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const clientName = formData.get('clientName') as string
    const service = formData.get('service') as string
    const rating = formData.get('rating') as string
    const testimonial = formData.get('testimonial') as string
    const title = formData.get('title') as string
    const clientPhoto = formData.get('clientPhoto') as File | null
    
    // Validate required fields
    if (!clientName || !service || !rating || !testimonial) {
      return NextResponse.json(
        { error: 'Missing required fields: clientName, service, rating, testimonial' },
        { status: 400 }
      )
    }
    
    // Validate rating range
    const ratingNum = parseInt(rating)
    if (ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }
    
    // Validate service type
    const validServices: ServiceType[] = ['office', 'domestic', 'post-renovation', 'villa', 'deep', 'maintenance']
    if (!validServices.includes(service as ServiceType)) {
      return NextResponse.json(
        { error: 'Invalid service type' },
        { status: 400 }
      )
    }
    
    // Create client with write permissions
    const writeClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_REVIEWS_PROJECT_ID || 'n6k9v913',
      dataset: process.env.NEXT_PUBLIC_SANITY_REVIEWS_DATASET || 'production',
      useCdn: false,
      apiVersion: '2024-01-01',
      token: process.env.SANITY_API_TOKEN, // Write token needed
    })
    
    // Handle image upload if provided
    let clientPhotoAsset = null
    if (clientPhoto && clientPhoto.size > 0) {
      try {
        // Convert File to Buffer
        const buffer = Buffer.from(await clientPhoto.arrayBuffer())
        
        // Upload image to Sanity
        const imageAsset = await writeClient.assets.upload('image', buffer, {
          filename: clientPhoto.name,
          contentType: clientPhoto.type,
        })
        
        clientPhotoAsset = {
          _type: 'image' as const,
          asset: {
            _type: 'reference' as const,
            _ref: imageAsset._id,
          },
          alt: {
            it: `Foto di ${clientName}`,
            en: `Photo of ${clientName}`
          }
        }
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError)
        // Continue without image rather than failing the entire request
      }
    }
    
    // Create review document
    const reviewData: Review = {
      _type: 'review',
      title: title ? {
        it: title,
        en: title
      } : {
        it: `Recensione di ${clientName}`,
        en: `Review by ${clientName}`
      },
      clientName: {
        it: clientName,
        en: clientName
      },
      service: service as ServiceType,
      rating: ratingNum,
      testimonial: {
        it: testimonial,
        en: testimonial
      },
      publishedAt: new Date().toISOString(),
      featured: false,
      verified: false // User submitted reviews need verification
    }
    
    // Add photo if uploaded successfully
    if (clientPhotoAsset) {
      reviewData.clientPhoto = clientPhotoAsset
    }
    
    const result = await writeClient.create(reviewData)
    
    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully. It will be published after verification.',
      id: result._id
    })
    
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    )
  }
}