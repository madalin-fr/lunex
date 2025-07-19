import { NextResponse } from 'next/server'
import { client, hasValidConfig } from '@/lib/sanity/client'

export async function GET() {
  if (!hasValidConfig) {
    return NextResponse.json([])
  }
  
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage {
      ...,
      alt
    },
    excerpt,
    publishedAt,
    author-> {
      _id,
      name,
      bio
    },
    categories[]-> {
      _id,
      title
    },
    body
  }`
  
  try {
    const posts = await client.fetch(query)
    return NextResponse.json(posts || [])
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json([])
  }
}