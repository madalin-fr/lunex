import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/lib/sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Lunex Blog',

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})