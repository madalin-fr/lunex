import { post } from './post'
import { author } from './author'
import { category } from './category'
import { blockContent } from './blockContent'
import { localizedString } from './localizedString'
import { localizedText } from './localizedText'
import { localizedBlockContent } from './localizedBlockContent'
import review from './review'

export const schemaTypes = [
  // Blog schemas
  post, 
  author, 
  category, 
  blockContent, 
  localizedString, 
  localizedText, 
  localizedBlockContent,
  
  // Review schema
  review
]