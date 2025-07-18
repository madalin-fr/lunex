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