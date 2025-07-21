import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { createClient } from '@sanity/client'

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
    "customerName": clientName,
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
    "comment": testimonial,
    "reviewDate": publishedAt,
    "customerAvatar": clientPhoto {
      asset-> {
        _ref,
        _type,
        url
      },
      "alt": alt
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