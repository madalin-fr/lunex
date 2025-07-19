// Utility functions for handling localized Sanity content

import { Post, Author, Category } from './types'

// Type for localized string objects
interface LocalizedString {
  en?: string
  it?: string
  [key: string]: string | undefined
}

// Type for localized array objects
interface LocalizedArray<T> {
  en?: T[]
  it?: T[]
  [key: string]: T[] | undefined
}

// Type for localized slug
interface LocalizedSlug {
  current?: string
  en?: { current: string }
  it?: { current: string }
  [key: string]: { current: string } | string | undefined
}

// Type for localized post with all fields potentially localized
interface LocalizedPost extends Omit<Post, 'title' | 'excerpt' | 'body' | 'slug' | 'author' | 'categories'> {
  title?: string | LocalizedString
  excerpt?: string | LocalizedString
  body?: Array<{ _type: string; [key: string]: unknown }> | LocalizedArray<{ _type: string; [key: string]: unknown }>
  slug?: { current: string } | LocalizedSlug
  author?: string | Author | {
    name?: string | LocalizedString
    bio?: Array<{ _type: string; [key: string]: unknown }> | LocalizedArray<{ _type: string; [key: string]: unknown }>
    [key: string]: unknown
  }
  categories?: Array<string | Category | LocalizedString>
}

export function getLocalizedValue(localizedObject: string | LocalizedString | undefined, locale: string = 'en'): string {
  if (!localizedObject) return ''
  
  // If it's already a string, return it
  if (typeof localizedObject === 'string') {
    return localizedObject
  }
  
  // If it's a localized object, extract the value for the locale
  if (localizedObject[locale]) {
    return localizedObject[locale] || ''
  }
  
  // Fallback to English if the requested locale doesn't exist
  if (localizedObject.en) {
    return localizedObject.en
  }
  
  // Fallback to Italian if English doesn't exist
  if (localizedObject.it) {
    return localizedObject.it
  }
  
  // If none of the above work, return empty string
  return ''
}

export function getLocalizedArray<T>(
  localizedObject: T[] | LocalizedArray<T> | undefined,
  locale: string = 'en'
): T[] {
  if (!localizedObject) return []
  
  // If it's already an array, return it
  if (Array.isArray(localizedObject)) {
    return localizedObject
  }
  
  // If it's a localized object, extract the value for the locale
  if (localizedObject[locale]) {
    return localizedObject[locale] || []
  }
  
  // Fallback to English if the requested locale doesn't exist
  if (localizedObject.en) {
    return localizedObject.en || []
  }
  
  // Fallback to Italian if English doesn't exist
  if (localizedObject.it) {
    return localizedObject.it || []
  }
  
  // If none of the above work, return empty array
  return []
}

// Extract localized content for blog posts
export function getLocalizedPost(post: LocalizedPost | null, locale: string = 'en') {
  if (!post) return null
  
  // Handle localized slug
  let slug = post.slug
  if (slug && typeof slug === 'object' && !('current' in slug)) {
    // It's a localized slug object, cast it to LocalizedSlug
    const localizedSlug = slug as LocalizedSlug
    if (localizedSlug[locale] && typeof localizedSlug[locale] === 'object' && 'current' in localizedSlug[locale]!) {
      slug = localizedSlug[locale] as { current: string }
    } else if (localizedSlug.en && typeof localizedSlug.en === 'object' && 'current' in localizedSlug.en) {
      slug = localizedSlug.en
    } else if (localizedSlug.it && typeof localizedSlug.it === 'object' && 'current' in localizedSlug.it) {
      slug = localizedSlug.it
    }
  }
  
  // Handle author processing
  let processedAuthor = null
  if (post.author) {
    if (typeof post.author === 'string') {
      processedAuthor = post.author
    } else if ('_id' in post.author) {
      // It's an Author object, but check if name is localized
      const author = post.author as Author & { name?: string | LocalizedString }
      if (author.name && typeof author.name === 'object') {
        // Name is localized
        processedAuthor = {
          ...author,
          name: getLocalizedValue(author.name, locale)
        }
      } else {
        processedAuthor = post.author
      }
    } else {
      // It's a localized author object
      processedAuthor = {
        ...post.author,
        name: getLocalizedValue(post.author.name, locale),
        bio: getLocalizedArray(post.author.bio, locale)
      }
    }
  }
  
  return {
    ...post,
    slug,
    title: getLocalizedValue(post.title, locale),
    excerpt: getLocalizedValue(post.excerpt, locale),
    body: getLocalizedArray(post.body, locale),
    author: processedAuthor,
    categories: post.categories?.map((cat) => {
      if (typeof cat === 'string') {
        return cat
      } else if ('_id' in cat) {
        // It's a Category object, but check if title is localized
        const category = cat as Category & { title?: string | LocalizedString }
        if (category.title && typeof category.title === 'object') {
          // Title is localized
          return {
            ...category,
            title: getLocalizedValue(category.title, locale)
          }
        }
        return cat
      } else {
        // It's a LocalizedString
        return getLocalizedValue(cat, locale)
      }
    }) || []
  }
}