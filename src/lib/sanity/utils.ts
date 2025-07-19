// Utility functions for handling localized Sanity content

export function getLocalizedValue(localizedObject: any, locale: string = 'en'): string {
  if (!localizedObject) return ''
  
  // If it's already a string, return it
  if (typeof localizedObject === 'string') {
    return localizedObject
  }
  
  // If it's a localized object, extract the value for the locale
  if (localizedObject[locale]) {
    return localizedObject[locale]
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

export function getLocalizedArray(localizedObject: any, locale: string = 'en'): any[] {
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
export function getLocalizedPost(post: any, locale: string = 'en') {
  if (!post) return null
  
  // Handle localized slug
  let slug = post.slug
  if (slug && typeof slug === 'object' && !slug.current) {
    // It's a localized slug object
    if (slug[locale] && slug[locale].current) {
      slug = slug[locale]
    } else if (slug.en && slug.en.current) {
      slug = slug.en
    } else if (slug.it && slug.it.current) {
      slug = slug.it
    }
  }
  
  return {
    ...post,
    slug,
    title: getLocalizedValue(post.title, locale),
    excerpt: getLocalizedValue(post.excerpt, locale),
    body: getLocalizedArray(post.body, locale),
    author: post.author ? {
      ...post.author,
      name: getLocalizedValue(post.author.name, locale),
      bio: getLocalizedArray(post.author.bio, locale)
    } : null,
    categories: post.categories?.map((cat: any) =>
      typeof cat === 'string' ? cat : getLocalizedValue(cat, locale)
    ) || []
  }
}