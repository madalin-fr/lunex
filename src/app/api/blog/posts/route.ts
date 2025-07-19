import { client, hasValidConfig } from '@/lib/sanity/client'
import { NextResponse } from 'next/server'

export async function GET() {
  if (!hasValidConfig) {
    return NextResponse.json({ error: 'Sanity not configured', posts: [] }, { status: 200 })
  }
  
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    author-> {
      name
    },
    categories[]-> {
      title
    },
    body
  }`
  
  try {
    const posts = await client.fetch(query)
    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts', posts: [] }, { status: 500 })
  }
}