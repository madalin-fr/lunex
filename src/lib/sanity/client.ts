import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity configuration with fallback values for development
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Check if we have valid configuration
const hasValidConfig = projectId !== 'your-project-id'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: { _type: string; asset: { _ref: string; _type: string } }) {
  return builder.image(source)
}

export { hasValidConfig }