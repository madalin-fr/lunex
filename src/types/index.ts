export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: 'client' | 'admin'
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number // in minutes
  category: 'hair' | 'nails' | 'massage' | 'facial' | 'spa'
  isActive: boolean
  imageUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface Booking {
  id: string
  userId: string
  serviceId: string
  date: Date
  time: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  notes?: string
  totalPrice: number
  createdAt: Date
  updatedAt: Date
  user?: User
  service?: Service
}

export interface Review {
  id: string
  userId: string
  serviceId: string
  bookingId: string
  rating: number // 1-5
  comment?: string
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
  user?: User
  service?: Service
}

export interface ContactForm {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  isRead: boolean
  createdAt: Date
}

export interface BusinessHours {
  id: string
  dayOfWeek: number // 0-6 (Sunday to Saturday)
  isOpen: boolean
  openTime?: string
  closeTime?: string
  breakStartTime?: string
  breakEndTime?: string
}

export interface Promotion {
  id: string
  title: string
  description: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  startDate: Date
  endDate: Date
  isActive: boolean
  serviceIds?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  imageUrl?: string
  isPublished: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
  tags?: string[]
}

export interface SiteSettings {
  id: string
  businessName: string
  businessEmail: string
  businessPhone: string
  businessAddress: string
  businessDescription: string
  logoUrl?: string
  socialLinks: {
    facebook?: string
    instagram?: string
    youtube?: string
    tiktok?: string
  }
  seoSettings: {
    metaTitle: string
    metaDescription: string
    metaKeywords: string
  }
  updatedAt: Date
}

export interface Translation {
  [key: string]: string | Translation
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface BookingSlot {
  time: string
  available: boolean
  serviceId?: string
}

export interface DaySchedule {
  date: Date
  slots: BookingSlot[]
  isAvailable: boolean
}

export interface ChatMessage {
  id: string
  message: string
  isBot: boolean
  timestamp: Date
  userId?: string
}

export interface NavItem {
  href: string
  label: string
  icon?: string
  children?: NavItem[]
}

export interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  imageUrl?: string
  url?: string
}

export interface BookingForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  date: string
  time: string
  service: string
  notes: string
}