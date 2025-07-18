// Subscription Service Tiers for LUNEX
export interface SubscriptionTier {
  id: string
  name: string
  description: string
  price: number // monthly price in EUR
  originalPrice?: number // for showing discounts
  currency: 'EUR'
  billingCycle: 'monthly' | 'quarterly' | 'yearly'
  features: SubscriptionFeature[]
  limits: SubscriptionLimits
  services: SubscriptionService[]
  popularity: 'low' | 'medium' | 'high'
  recommended: boolean
  badge?: string
  color: string
  icon: string
}

export interface SubscriptionFeature {
  id: string
  name: string
  description: string
  included: boolean
  limit?: number
  unit?: string
}

export interface SubscriptionLimits {
  maxCleanings: number // per month
  maxArea: number // square meters
  maxRooms: number
  maxAddons: number
  prioritySupport: boolean
  emergencyService: boolean
  cancellationPolicy: 'flexible' | 'moderate' | 'strict'
}

export interface SubscriptionService {
  id: string
  name: string
  description: string
  frequency: 'weekly' | 'biweekly' | 'monthly'
  duration: number // minutes
  included: boolean
  additionalCost?: number
}

export interface CustomerSubscription {
  id: string
  customerId: string
  tierId: string
  status: 'active' | 'paused' | 'cancelled' | 'expired'
  startDate: Date
  endDate?: Date
  nextBillingDate: Date
  currentPeriodStart: Date
  currentPeriodEnd: Date
  usage: SubscriptionUsage
  paymentMethod: string
  discounts: SubscriptionDiscount[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

export interface SubscriptionUsage {
  cleaningsUsed: number
  cleaningsRemaining: number
  areaUsed: number
  areaRemaining: number
  addonsUsed: number
  addonsRemaining: number
  lastCleaningDate?: Date
  nextScheduledCleaning?: Date
}

export interface SubscriptionDiscount {
  id: string
  type: 'percentage' | 'fixed' | 'first_month_free'
  value: number
  description: string
  validUntil?: Date
  appliedAt: Date
}

export interface SubscriptionSchedule {
  id: string
  subscriptionId: string
  customerId: string
  serviceType: string
  frequency: 'weekly' | 'biweekly' | 'monthly'
  dayOfWeek: number // 0-6, Sunday = 0
  timeSlot: string
  location: {
    address: string
    city: string
    province: string
    postalCode: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  preferences: {
    cleaningProducts: 'eco' | 'standard' | 'premium'
    specialInstructions: string
    accessInstructions: string
    petInstructions?: string
  }
  status: 'active' | 'paused' | 'cancelled'
  nextOccurrence: Date
  lastCompleted?: Date
  createdAt: Date
  updatedAt: Date
}

export interface SubscriptionBilling {
  id: string
  subscriptionId: string
  customerId: string
  amount: number
  currency: 'EUR'
  status: 'pending' | 'paid' | 'failed' | 'refunded'
  billingDate: Date
  paidDate?: Date
  paymentMethod: string
  invoice: {
    number: string
    url: string
  }
  nextBillingDate: Date
  failureReason?: string
  retryCount: number
  createdAt: Date
}

export interface SubscriptionAnalytics {
  totalSubscriptions: number
  activeSubscriptions: number
  monthlyRevenue: number
  churnRate: number
  averageLifetimeValue: number
  popularTiers: {
    tierId: string
    name: string
    count: number
    percentage: number
  }[]
  revenueByTier: {
    tierId: string
    name: string
    revenue: number
    percentage: number
  }[]
  subscriptionGrowth: {
    month: string
    new: number
    cancelled: number
    net: number
  }[]
}

// Predefined subscription tiers for LUNEX
export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfetto per case piccole e pulizie occasionali',
    price: 79,
    originalPrice: 99,
    currency: 'EUR',
    billingCycle: 'monthly',
    features: [
      {
        id: 'cleanings',
        name: 'Pulizie mensili',
        description: 'Pulizia completa dell\'abitazione',
        included: true,
        limit: 2,
        unit: 'pulizie'
      },
      {
        id: 'area',
        name: 'Superficie coperta',
        description: 'Metri quadri inclusi nel piano',
        included: true,
        limit: 80,
        unit: 'mq'
      },
      {
        id: 'standard_support',
        name: 'Supporto standard',
        description: 'Assistenza clienti nei giorni lavorativi',
        included: true
      },
      {
        id: 'eco_products',
        name: 'Prodotti ecologici',
        description: 'Prodotti per la pulizia eco-friendly',
        included: true
      }
    ],
    limits: {
      maxCleanings: 2,
      maxArea: 80,
      maxRooms: 4,
      maxAddons: 1,
      prioritySupport: false,
      emergencyService: false,
      cancellationPolicy: 'moderate'
    },
    services: [
      {
        id: 'basic_cleaning',
        name: 'Pulizia Base',
        description: 'Pulizia completa di tutti gli ambienti',
        frequency: 'monthly',
        duration: 120,
        included: true
      }
    ],
    popularity: 'medium',
    recommended: false,
    color: 'blue',
    icon: '🏠'
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Ideale per famiglie e case di medie dimensioni',
    price: 149,
    originalPrice: 199,
    currency: 'EUR',
    billingCycle: 'monthly',
    features: [
      {
        id: 'cleanings',
        name: 'Pulizie bi-settimanali',
        description: 'Pulizia ogni due settimane',
        included: true,
        limit: 4,
        unit: 'pulizie'
      },
      {
        id: 'area',
        name: 'Superficie coperta',
        description: 'Metri quadri inclusi nel piano',
        included: true,
        limit: 120,
        unit: 'mq'
      },
      {
        id: 'priority_support',
        name: 'Supporto prioritario',
        description: 'Assistenza prioritaria e chat dedicata',
        included: true
      },
      {
        id: 'premium_products',
        name: 'Prodotti premium',
        description: 'Prodotti per la pulizia di alta qualità',
        included: true
      },
      {
        id: 'window_cleaning',
        name: 'Pulizia vetri',
        description: 'Pulizia vetri inclusa ogni mese',
        included: true,
        limit: 1,
        unit: 'volta/mese'
      }
    ],
    limits: {
      maxCleanings: 4,
      maxArea: 120,
      maxRooms: 6,
      maxAddons: 3,
      prioritySupport: true,
      emergencyService: false,
      cancellationPolicy: 'flexible'
    },
    services: [
      {
        id: 'premium_cleaning',
        name: 'Pulizia Premium',
        description: 'Pulizia approfondita con prodotti premium',
        frequency: 'biweekly',
        duration: 180,
        included: true
      },
      {
        id: 'window_service',
        name: 'Pulizia Vetri',
        description: 'Pulizia vetri interni ed esterni',
        frequency: 'monthly',
        duration: 60,
        included: true
      }
    ],
    popularity: 'high',
    recommended: true,
    badge: 'Più Popolare',
    color: 'purple',
    icon: '⭐'
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'Servizio completo per case di lusso e ville',
    price: 299,
    originalPrice: 399,
    currency: 'EUR',
    billingCycle: 'monthly',
    features: [
      {
        id: 'cleanings',
        name: 'Pulizie settimanali',
        description: 'Pulizia professionale ogni settimana',
        included: true,
        limit: 8,
        unit: 'pulizie'
      },
      {
        id: 'area',
        name: 'Superficie illimitata',
        description: 'Nessun limite di superficie',
        included: true
      },
      {
        id: 'concierge_support',
        name: 'Supporto concierge',
        description: 'Assistenza dedicata 24/7',
        included: true
      },
      {
        id: 'luxury_products',
        name: 'Prodotti luxury',
        description: 'Prodotti premium e specializzati',
        included: true
      },
      {
        id: 'emergency_service',
        name: 'Servizio emergenza',
        description: 'Intervento in emergenza entro 2 ore',
        included: true
      },
      {
        id: 'deep_cleaning',
        name: 'Pulizia profonda',
        description: 'Pulizia profonda mensile inclusa',
        included: true,
        limit: 1,
        unit: 'volta/mese'
      }
    ],
    limits: {
      maxCleanings: 8,
      maxArea: 9999,
      maxRooms: 99,
      maxAddons: 10,
      prioritySupport: true,
      emergencyService: true,
      cancellationPolicy: 'flexible'
    },
    services: [
      {
        id: 'luxury_cleaning',
        name: 'Pulizia Luxury',
        description: 'Servizio di pulizia di lusso con prodotti premium',
        frequency: 'weekly',
        duration: 240,
        included: true
      },
      {
        id: 'deep_service',
        name: 'Pulizia Profonda',
        description: 'Pulizia profonda mensile completa',
        frequency: 'monthly',
        duration: 360,
        included: true
      },
      {
        id: 'luxury_windows',
        name: 'Pulizia Vetri Premium',
        description: 'Pulizia vetri con prodotti specializzati',
        frequency: 'biweekly',
        duration: 90,
        included: true
      }
    ],
    popularity: 'low',
    recommended: false,
    badge: 'Luxury',
    color: 'gold',
    icon: '👑'
  },
  {
    id: 'commercial',
    name: 'Business',
    description: 'Soluzioni per uffici e spazi commerciali',
    price: 199,
    originalPrice: 249,
    currency: 'EUR',
    billingCycle: 'monthly',
    features: [
      {
        id: 'cleanings',
        name: 'Pulizie personalizzate',
        description: 'Frequenza adattabile alle esigenze',
        included: true,
        limit: 6,
        unit: 'pulizie'
      },
      {
        id: 'area',
        name: 'Superficie commerciale',
        description: 'Fino a 200 mq di spazio commerciale',
        included: true,
        limit: 200,
        unit: 'mq'
      },
      {
        id: 'business_support',
        name: 'Supporto business',
        description: 'Account manager dedicato',
        included: true
      },
      {
        id: 'commercial_products',
        name: 'Prodotti commerciali',
        description: 'Prodotti specifici per ambienti di lavoro',
        included: true
      },
      {
        id: 'night_service',
        name: 'Servizio notturno',
        description: 'Pulizia in orari di chiusura',
        included: true
      }
    ],
    limits: {
      maxCleanings: 6,
      maxArea: 200,
      maxRooms: 10,
      maxAddons: 5,
      prioritySupport: true,
      emergencyService: true,
      cancellationPolicy: 'moderate'
    },
    services: [
      {
        id: 'commercial_cleaning',
        name: 'Pulizia Commerciale',
        description: 'Pulizia specializzata per ambienti di lavoro',
        frequency: 'weekly',
        duration: 180,
        included: true
      },
      {
        id: 'sanitization',
        name: 'Sanificazione',
        description: 'Sanificazione completa degli ambienti',
        frequency: 'monthly',
        duration: 120,
        included: true
      }
    ],
    popularity: 'medium',
    recommended: false,
    badge: 'Business',
    color: 'green',
    icon: '🏢'
  }
]

// Subscription management utilities
export const SUBSCRIPTION_STATUSES = {
  active: {
    label: 'Attivo',
    color: 'green',
    description: 'Abbonamento attivo e funzionante'
  },
  paused: {
    label: 'In Pausa',
    color: 'yellow',
    description: 'Abbonamento temporaneamente sospeso'
  },
  cancelled: {
    label: 'Cancellato',
    color: 'red',
    description: 'Abbonamento cancellato'
  },
  expired: {
    label: 'Scaduto',
    color: 'gray',
    description: 'Abbonamento scaduto'
  }
}

export const BILLING_CYCLES = {
  monthly: {
    label: 'Mensile',
    discount: 0,
    description: 'Pagamento ogni mese'
  },
  quarterly: {
    label: 'Trimestrale',
    discount: 10,
    description: 'Pagamento ogni 3 mesi (10% sconto)'
  },
  yearly: {
    label: 'Annuale',
    discount: 20,
    description: 'Pagamento annuale (20% sconto)'
  }
}

export const CLEANING_FREQUENCIES = {
  weekly: {
    label: 'Settimanale',
    description: 'Ogni settimana',
    occurrences: 4
  },
  biweekly: {
    label: 'Bi-settimanale',
    description: 'Ogni due settimane',
    occurrences: 2
  },
  monthly: {
    label: 'Mensile',
    description: 'Una volta al mese',
    occurrences: 1
  }
}