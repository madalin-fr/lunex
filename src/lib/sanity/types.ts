export interface Author {
  _id: string
  name: string
  slug: {
    current: string
  }
  image?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
  bio?: Array<{
    _type: string
    [key: string]: unknown
  }>
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
}

export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
  excerpt?: string
  publishedAt?: string
  author?: string | Author
  categories?: string[] | Category[]
  body?: Array<{
    _type: string
    [key: string]: unknown
  }>
}

export interface SanityImage {
  asset: {
    _ref: string
    _type: string
  }
  alt?: string
}

export interface LocalizedString {
  it: string
  en: string
}

export interface LocalizedText {
  it: string
  en: string
}

export type ServiceType = 'office' | 'domestic' | 'post-renovation' | 'villa' | 'deep' | 'maintenance'

export interface Review {
  _type: 'review'
  title: LocalizedString
  clientName: LocalizedString
  clientPhoto?: {
    _type: 'image'
    asset: {
      _type: 'reference'
      _ref: string
    }
    alt: LocalizedString
  }
  service: ServiceType
  rating: number
  testimonial: LocalizedText
  publishedAt: string
  featured: boolean
  verified: boolean
}