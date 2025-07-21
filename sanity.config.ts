import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Import all schemas
import { post } from './schemas/post'
import { author } from './schemas/author'
import { category } from './schemas/category'
import { blockContent } from './schemas/blockContent'
import { localizedString } from './schemas/localizedString'
import { localizedText } from './schemas/localizedText'
import { localizedBlockContent } from './schemas/localizedBlockContent'
import review from './schemas/review'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'n6k9v913'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Define blog workspace
const blogWorkspace = {
  name: 'blog',
  title: 'Lunex Blog',
  projectId,
  dataset,
  basePath: '/blog',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [
      post,
      author,
      category,
      blockContent,
      localizedString,
      localizedText,
      localizedBlockContent,
    ],
  },
}

// Define reviews workspace
const reviewsWorkspace = {
  name: 'reviews',
  title: 'Lunex Reviews',
  projectId,
  dataset,
  basePath: '/reviews',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [
      review,
      localizedString,
      localizedText,
    ],
  },
}

// Export multiple workspaces
export default defineConfig([blogWorkspace, reviewsWorkspace])