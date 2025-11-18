import { title } from "process";

export const common = {
  // Navigation
  home: 'Home',
  servicesNav: 'Services',
  about: 'About Us',
  contact: 'Contact',
  booking: 'Booking',
  reviewsNav: 'Reviews',
  blogNav: 'Blog',
  
  // Common Actions
  bookNow: 'Book Now',
  book_now: 'Book Now',
  read_more: 'Read More',
  view_all: 'View All',
  viewDetails: 'View Details',
  contactUs: 'Contact Us',
  contact_us: 'Contact Us',
  call_now: 'Call Now',
  send_message: 'Send Message',
  submit: 'Submit',
  cancel: 'Cancel',
  confirm: 'Confirm',
  save: 'Save',
  edit: 'Edit',
  delete: 'Delete',
  close: 'Close',
  getQuote: 'Free Estimate',
  
  // Common Labels
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  message: 'Message',
  date: 'Date',
  time: 'Time',
  price: 'Price',
  duration: 'Duration',
  status: 'Status',
  description: 'Description',
  address: 'Address',
  
  // Time & Date
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
  
  // Status
  pending: 'Pending',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
  completed: 'Completed',
  
  // Common Messages
  loading: 'Loading...',
  error: 'Error',
  success: 'Success',
  no_results: 'No results found',
  
  // Footer
  all_rights_reserved: 'All rights reserved',
  follow_us: 'Follow Us',
  
  footer: {
    company: {
      description: 'Professional cleaning services for offices, homes, and commercial spaces.',
      vat: 'P.IVA: 04840720165'
    },
    links: {
      title: 'Quick Links'
    },
    contact: {
      title: 'Contact Info'
    },
    legal: {
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookies: 'Cookie Policy'
    }
  },
  
  // Contact Info
  opening_hours: 'Opening Hours',
  closed: 'Closed',
  
  // Services
  services: {
    title: 'Our Cleaning Services',
    subtitle: 'Professional cleaning solutions for every need',
    description: 'Quality cleaning services for offices, homes, and commercial spaces',
    
    office: {
      title: 'Office Cleaning',
      name: 'Office Cleaning',
      subtitle: 'Professional cleaning services for offices and commercial spaces',
      description: 'Comprehensive office cleaning services to maintain a clean, healthy, and productive work environment.',
      features: {
        daily: 'Daily Cleaning',
        dailyDesc: 'Regular daily cleaning services to maintain office hygiene with 2025 industry standards',
        flexible: 'Flexible Scheduling',
        flexibleDesc: 'Cleaning services scheduled around your business hours with real-time booking system',
        equipment: 'Professional Equipment',
        equipmentDesc: 'Advanced 2025 cleaning equipment with AI-powered efficiency and eco-friendly products',
        specialized: 'Specialized Expertise',
        specializedDesc: 'Expert knowledge in post-pandemic hygiene protocols and health-focused cleaning'
      },
      process: {
        step1: 'Advanced Assessment',
        step1Desc: 'AI-enhanced evaluation using 3D mapping and specific cleaning needs analysis',
        step2: 'Digital Planning',
        step2Desc: 'Customized cleaning plan with advanced scheduling software and client portal access',
        step3: 'Smart Execution',
        step3Desc: 'Professional cleaning using 2025 cutting-edge techniques with IoT-enabled equipment',
        step4: 'Quality Assurance',
        step4Desc: 'Digital quality control systems with real-time client satisfaction tracking'
      },
      includes: {
        title: 'What\'s Included',
        dusting: 'Dusting of all surfaces',
        vacuuming: 'Vacuuming and mopping floors',
        bathrooms: 'Bathroom cleaning and sanitization',
        kitchen: 'Kitchen and break room cleaning',
        windows: 'Window cleaning (interior)',
        trash: 'Trash removal and replacement',
        customPlans: 'Customized business plans'
      }
    },
    
    domestic: {
      title: 'Domestic Cleaning',
      name: 'Domestic Cleaning',
      subtitle: 'Complete home cleaning services for your comfort',
      description: 'Professional home cleaning services to keep your living space spotless and healthy.',
      features: {
        thorough: 'Thorough Cleaning',
        thoroughDesc: 'Deep cleaning of all rooms and living spaces',
        trusted: 'Trusted Staff',
        trustedDesc: 'Background-checked and trained cleaning professionals',
        supplies: 'All Supplies Included',
        suppliesDesc: 'We bring all necessary cleaning supplies and equipment',
        customizable: 'Customizable Service',
        customizableDesc: 'Tailored cleaning services to meet your specific needs'
      },
      process: {
        step1: 'Home Assessment',
        step1Desc: 'Initial walkthrough to understand your home\'s cleaning requirements',
        step2: 'Custom Plan',
        step2Desc: 'Development of a personalized cleaning plan for your home',
        step3: 'Professional Cleaning',
        step3Desc: 'Systematic cleaning of all areas using professional techniques',
        step4: 'Final Inspection',
        step4Desc: 'Quality check to ensure satisfaction of clients'
      },
      includes: {
        title: 'Service Includes',
        bedrooms: 'Bedroom cleaning and organizing',
        bathrooms: 'Bathroom deep cleaning',
        kitchen: 'Kitchen cleaning and sanitization',
        living: 'Living areas dusting and vacuuming',
        floors: 'Floor cleaning and mopping',
        appliances: 'Appliance cleaning (exterior)',
        windows: 'Interior window cleaning'
      }
    },
    
    postRenovation: {
      title: 'Post-Renovation Cleaning',
      subtitle: 'Specialized cleaning after construction and renovation work'
    },

    luxury: {
      title: 'Villa Cleaning',
      subtitle: 'Premium cleaning services for villa properties',
    },
    
    deep: {
      title: 'Deep Cleaning',
      name: 'Deep Cleaning',
      subtitle: 'Intensive cleaning with professional equipment',
      description: 'Comprehensive deep cleaning services for thorough sanitization and restoration.',
      features: {
        intensive: 'Intensive Process',
        intensiveDesc: 'Multi-step deep cleaning process for maximum results',
        equipment: 'Professional Equipment',
        equipmentDesc: 'Advanced cleaning equipment for superior results',
        sanitization: 'Complete Sanitization',
        sanitizationDesc: 'Thorough sanitization of all surfaces and areas',
        restoration: 'Surface Restoration',
        restorationDesc: 'Restoration of surfaces to their original condition'
      },
      process: {
        step1: 'Pre-Inspection',
        step1Desc: 'Thorough assessment of areas requiring deep cleaning',
        step2: 'Preparation',
        step2Desc: 'Preparation of space and equipment for intensive cleaning',
        step3: 'Deep Cleaning',
        step3Desc: 'Systematic deep cleaning using professional techniques',
        step4: 'Sanitization',
        step4Desc: 'Complete sanitization and final quality inspection'
      },
      includes: {
        title: 'Deep Cleaning Includes',
        appliances: 'Deep appliance cleaning (inside and out)',
        grout: 'Grout and tile deep cleaning',
        baseboards: 'Baseboard and trim cleaning',
        light: 'Light fixture cleaning',
        cabinet: 'Cabinet interior cleaning',
        upholstery: 'Upholstery deep cleaning',
        sanitization: 'Complete sanitization treatment'
      },
      scheduling: {
        title: 'When to Schedule Deep Cleaning',
        subtitle: 'Deep cleaning is recommended for these situations',
        seasonal: {
          title: 'Seasonal Cleaning',
          description: 'Spring or fall deep cleaning for complete refresh'
        },
        moving: {
          title: 'Moving In/Out',
          description: 'Thorough cleaning for new beginnings'
        },
        events: {
          title: 'Special Events',
          description: 'Pre-event deep cleaning for perfect presentation'
        }
      },
      processTitle: 'Our Deep Cleaning Process'
    },
    
    maintenance: {
      title: 'Maintenance Cleaning',
      name: 'Maintenance Cleaning',
      subtitle: 'Regular cleaning services with flexible schedules',
      description: 'Ongoing maintenance cleaning services to keep your space consistently clean.',
      features: {
        regular: 'Regular Schedule',
        regularDesc: 'Consistent cleaning schedule tailored to your needs',
        flexible: 'Flexible Timing',
        flexibleDesc: 'Flexible scheduling to accommodate your lifestyle',
        consistent: 'Consistent Quality',
        consistentDesc: 'Same high-quality service every visit',
        affordable: 'Cost-Effective',
        affordableDesc: 'Budget-friendly regular cleaning solutions'
      },
      process: {
        step1: 'Schedule Setup',
        step1Desc: 'Establish optimal cleaning schedule for your needs',
        step2: 'Routine Development',
        step2Desc: 'Create consistent cleaning routine and checklist',
        step3: 'Regular Service',
        step3Desc: 'Ongoing maintenance cleaning visits',
        step4: 'Quality Monitoring',
        step4Desc: 'Regular quality checks and service adjustments'
      },
      schedules: {
        title: 'Available Schedules',
        daily: 'Daily cleaning service',
        weekly: 'Weekly maintenance cleaning',
        biweekly: 'Bi-weekly cleaning service',
        monthly: 'Monthly deep maintenance',
        custom: 'Custom schedule available',
        dailyDesc: 'Perfect for high-traffic offices and commercial spaces',
        weeklyDesc: 'Ideal for most homes and small offices',
        biweeklyDesc: 'Great for busy families and medium-sized offices',
        monthlyDesc: 'Comprehensive maintenance for seasonal care',
        // Frequency translations
        dailyFreq: 'Daily',
        weeklyFreq: 'Weekly',
        biweeklyFreq: 'Bi-weekly',
        monthlyFreq: 'Monthly',
        mostPopular: 'Most Popular',
        choosePlan: 'Choose Plan',
        howItWorks: 'How It Works',
        howItWorksDesc: 'Setting up your maintenance cleaning schedule is simple and straightforward',
        scheduleDesc: 'Choose the maintenance schedule that works best for your needs and lifestyle',
        customDesc: 'Need a custom schedule? We can create a maintenance plan tailored to your specific needs and preferences. Whether you need different frequencies for different areas or have special requirements, we\'ll work with you to find the perfect solution.',
        discussCustom: 'Discuss Custom Plan',
        benefitsTitle: 'Benefits of Regular Maintenance',
        benefitsDesc: 'Discover why regular cleaning maintenance is the smart choice',
        timeSavings: 'Time Savings',
        timeSavingsDesc: 'Regular maintenance saves time and prevents deep cleaning needs',
        costEffective: 'Cost Effective',
        costEffectiveDesc: 'Ongoing maintenance is more cost-effective than irregular deep cleaning',
        healthierEnv: 'Healthier Environment',
        healthierEnvDesc: 'Consistent cleaning maintains a healthier living and working space',
        ctaDesc: 'Contact us today to discuss your maintenance cleaning needs and create a schedule that works for you'
      }
    },
    
    whyChooseUs: {
      title: 'Why Choose Lunex',
      subtitle: 'Experience the difference with our professional cleaning services',
      quality: {
        title: 'Quality Guarantee',
        description: 'We guarantee the highest quality cleaning standards for every service'
      },
      reliable: {
        title: 'Reliable Service',
        description: 'Dependable cleaning services with consistent scheduling and quality'
      },
      eco: {
        title: 'Eco-Friendly',
        description: 'Environmentally safe cleaning products and sustainable practices'
      },
      insured: {
        title: 'Fully Insured',
        description: 'Comprehensive insurance coverage for your peace of mind'
      },
      local: {
        title: 'Local Business',
        description: 'Proudly serving Romano di Lombardia and surrounding areas'
      }
    },
    
    cta: {
      title: 'Ready for a Spotless Space?',
      subtitle: 'Contact us today for a free estimate and discover the Lunex difference'
    }
  },
  
  // Homepage
  hero: {
    title: 'Professional Cleaning Services',
    subtitle: 'Romano di Lombardia',
    description: 'Quality cleaning solutions for offices, homes, and commercial spaces.',
    cta: 'Free Estimate'
  },
  
  // Contact Page
  contactPage: {
    title: 'Contact Us',
    subtitle: 'Get in touch for professional cleaning services',
    description: 'Ready to experience professional cleaning? Contact us for a free estimate and consultation.',
    
    // Contact Form
    form: {
      title: 'Request an Estimate',
      subtitle: 'Fill out the form below and we\'ll get back to you with a customized estimate',
      name: 'Full Name',
      namePlaceholder: 'Enter your full name',
      email: 'Email Address',
      emailPlaceholder: 'Enter your email address',
      phone: 'Phone Number',
      phonePlaceholder: 'Enter your phone number',
      subject: 'Service Type',
      subjectPlaceholder: 'Select service type',
      selectSubject: 'Select a service',
      subjectOptions: {
        office: 'Office Cleaning',
        domestic: 'Domestic Cleaning',
        postRenovation: 'Post-Renovation Cleaning',
        villa: 'Villa Cleaning',
        deep: 'Deep Cleaning',
        maintenance: 'Maintenance Cleaning',
        quote: 'General Quote Request'
      },
      message: 'Message',
      messagePlaceholder: 'Please describe your cleaning needs and space details...',
      submit: 'Send Request',
      sending: 'Sending...',
      
      // Validation Messages
      validation: {
        nameRequired: 'Name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email address',
        phoneRequired: 'Phone number is required',
        subjectRequired: 'Service type is required',
        messageRequired: 'Message is required',
        messageMinLength: 'Message must be at least 10 characters long'
      },
      
      // Success/Error Messages
      success: {
        title: 'Request Sent Successfully!',
        description: 'Thank you for your inquiry. We\'ll contact you within 24 hours with a quote.',
        button: 'Send Another Request'
      },
      error: {
        title: 'Failed to Send Request',
        description: 'Something went wrong. Please try again or contact us directly.',
        button: 'Try Again'
      }
    },
    
    // Contact Information
    info: {
      title: 'Get in Touch',
      subtitle: 'Contact us for professional cleaning services',
      address: {
        title: 'Address',
        line1: 'Via Monsignor Giacomo Maggioni 26',
        line2: '24058 Romano di Lombardia',
        city: 'Provincia di Bergamo, Italy'
      },
      phone: {
        title: 'WhatsApp',
        number: '+39 327 779 1867',
        whatsapp: 'Available on WhatsApp'
      },
      email: {
        title: 'Email',
        address: 'infocleaninglunex@gmail.com',
        response: 'We respond within 24 hours'
      },
      hours: {
        title: 'Service Hours',
        weekdays: 'Mon - Fri: 8:00 AM - 6:00 PM',
        saturday_hours: 'Saturday: 8:00 AM - 12:00 PM'
      },
      social: {
        title: 'Follow Us',
        facebook: 'Facebook',
        instagram: 'Instagram',
        linkedin: 'LinkedIn'
      }
    },
    
    // Map Section
    map: {
      title: 'Our ',
      subtitle: 'Serving Romano di Lombardia and surrounding areas',
      directions: 'Get Directions',
      viewLarger: 'View Larger Map'
    },
    
    // CTA Section
    cta: {
      title: 'Ready for Professional Cleaning?',
      subtitle: 'Contact us today for a free estimate!',
      button: 'Free Estimate Now',
      or: 'or',
      call: 'Call Now'
    }
  },
  
  // General CTA
  cta: {
    book: 'Book Now',
    quote: 'Free Estimate',
    ready: 'Ready for Professional Cleaning?',
    description: 'Join hundreds of satisfied customers who trust Lunex for their cleaning needs'
  },

  // Privacy Policy
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'How we protect and manage your personal information',
    intro: {
      title: 'Introduction',
      content: 'At Lunex Cleaning Services, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
      commitment: 'We are committed to protecting your personal data and respecting your privacy rights.'
    },
    sections: {
      collection: {
        title: 'Information We Collect',
        content: 'We collect information that you provide directly to us and information that is automatically collected when you use our services.',
        personal: {
          title: 'Personal Information',
          name: 'Name and contact details',
          email: 'Email address',
          phone: 'Phone number',
          address: 'Service address',
          payment: 'Payment information'
        },
        usage: {
          title: 'Usage Information',
          browser: 'Browser type and version',
          ip: 'IP address',
          pages: 'Pages visited',
          time: 'Time and date of visits'
        }
      },
      use: {
        title: 'How We Use Your Information',
        content: 'We use the information we collect to provide, maintain, and improve our services.',
        purposes: {
          service: 'To provide cleaning services',
          communication: 'To communicate with you',
          improvement: 'To improve our services',
          legal: 'To comply with legal obligations',
          marketing: 'To send promotional materials (with consent)'
        }
      },
      protection: {
        title: 'Data Protection',
        content: 'We implement appropriate technical and organizational measures to protect your personal information.',
        measures: {
          encryption: 'Data encryption',
          access: 'Limited access controls',
          training: 'Staff training on data protection',
          regular: 'Regular security assessments'
        }
      },
      sharing: {
        title: 'Information Sharing',
        content: 'We do not sell, trade, or rent your personal information to third parties.',
        exceptions: {
          consent: 'With your consent',
          service: 'To service providers who assist us',
          legal: 'To comply with legal obligations',
          protect: 'To protect our rights and safety'
        }
      },
      cookies: {
        title: 'Cookies and Tracking',
        content: 'We use cookies and similar tracking technologies to improve your experience on our website.',
        types: {
          essential: 'Essential cookies for site functionality',
          analytics: 'Analytics cookies to understand usage',
          preferences: 'Preference cookies to remember your choices'
        }
      },
      rights: {
        title: 'Your Rights',
        content: 'You have certain rights regarding your personal information under applicable data protection laws.',
        list: {
          access: 'Right to access your data',
          correction: 'Right to correct inaccurate data',
          deletion: 'Right to request deletion',
          portability: 'Right to data portability',
          objection: 'Right to object to processing',
          withdrawal: 'Right to withdraw consent'
        }
      },
      children: {
        title: 'Children\'s Privacy',
        content: 'Our services are not directed to children under 16 years of age. We do not knowingly collect personal information from children.'
      },
      changes: {
        title: 'Changes to This Policy',
        content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.'
      },
      contact: {
        title: 'Contact Us',
        content: 'If you have any questions about this Privacy Policy, please contact us:'
      }
    },
    company: {
      name: 'Lunex Cleaning Services',
      address: 'Via Monsignor Giacomo Maggioni 26, 24058 Romano di Lombardia, BG, Italy'
    }
  },

  // Terms of Service
  terms: {
    title: 'Terms of Service',
    subtitle: 'Please read these terms carefully before using our services',
    lastUpdated: 'Last updated',
    acceptance: {
      title: 'Acceptance of Terms',
      content: 'By accessing and using Lunex Cleaning Services, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.'
    },
    services: {
      title: 'Our Services',
      description: {
        title: 'Service Description',
        content: 'Lunex provides professional cleaning services for offices, homes, and commercial spaces in Romano di Lombardia and surrounding areas. Our services include but are not limited to:',
        list: {
          office: 'Office and commercial cleaning',
          domestic: 'Residential cleaning',
          deep: 'Deep cleaning services',
          post: 'Post-renovation cleaning',
          luxury: 'Luxury property cleaning',
          maintenance: 'Regular maintenance cleaning'
        }
      },
      quality: {
        title: 'Service Quality',
        content: 'We strive to provide high-quality cleaning services. However, results may vary based on the condition of the space and specific requirements.'
      }
    },
    booking: {
      title: 'Booking and Scheduling',
      process: {
        title: 'Booking Process',
        content: 'Services can be booked through our website, phone, or email. All bookings are subject to availability.',
        confirmation: 'You will receive a confirmation once your booking is accepted.'
      },
      cancellation: {
        title: 'Cancellation Policy',
        content: 'Cancellations must be made at least 24 hours before the scheduled service.',
        fee: 'Late cancellations may incur a cancellation fee of up to 50% of the service cost.'
      },
      rescheduling: {
        title: 'Rescheduling',
        content: 'Services can be rescheduled with at least 24 hours notice, subject to availability.'
      }
    },
    pricing: {
      title: 'Pricing and Payment',
      rates: {
        title: 'Service Rates',
        content: 'Prices are quoted based on the specific requirements of each service. All prices are in EUR and include applicable taxes.'
      },
      payment: {
        title: 'Payment Terms',
        content: 'Payment is due upon completion of service unless other arrangements have been made.',
        methods: 'We accept cash, bank transfer, and major credit cards.'
      },
      additional: {
        title: 'Additional Charges',
        content: 'Additional charges may apply for:',
        list: {
          supplies: 'Special cleaning supplies requested',
          extra: 'Services beyond the agreed scope',
          parking: 'Parking fees where applicable',
          travel: 'Travel beyond our standard service area'
        }
      }
    },
    responsibilities: {
      title: 'Responsibilities',
      client: {
        title: 'Client Responsibilities',
        access: 'Provide safe access to the premises',
        pets: 'Secure pets during service',
        valuables: 'Secure valuable items',
        hazards: 'Inform us of any hazards or special requirements',
        payment: 'Make timely payment for services'
      },
      our: {
        title: 'Our Responsibilities',
        professional: 'Provide professional cleaning services',
        trained: 'Use trained and insured staff',
        equipment: 'Bring necessary equipment and supplies',
        respect: 'Respect your property and privacy',
        schedule: 'Arrive at scheduled times'
      }
    },
    liability: {
      title: 'Liability and Insurance',
      coverage: {
        title: 'Insurance Coverage',
        content: 'Lunex Cleaning Services is fully insured for general liability. Our insurance covers accidental damage during normal cleaning operations.'
      },
      limitations: {
        title: 'Limitations',
        content: 'We are not liable for:',
        list: {
          pre: 'Pre-existing damage',
          valuable: 'Loss of cash or valuables',
          indirect: 'Indirect or consequential damages',
          normal: 'Normal wear and tear',
          hidden: 'Damage to items not visible or accessible'
        }
      },
      claims: {
        title: 'Damage Claims',
        content: 'Any damage claims must be reported within 24 hours of service completion.'
      }
    },
    intellectual: {
      title: 'Intellectual Property',
      content: 'All content on our website, including text, graphics, logos, and images, is the property of Lunex Cleaning Services and protected by copyright laws.'
    },
    termination: {
      title: 'Termination',
      content: 'Either party may terminate the service agreement with appropriate notice. We reserve the right to refuse service to anyone for any reason.'
    },
    governing: {
      title: 'Governing Law',
      content: 'These Terms of Service are governed by the laws of Italy. Any disputes shall be resolved in the courts of Bergamo, Italy.'
    },
    contact: {
      title: 'Contact Information',
      content: 'For questions about these Terms of Service, please contact us at:'
    }
  },

  // Cookies Policy
  cookies: {
    title: 'Cookie Policy',
    subtitle: 'Understanding how we use cookies on our website',
    lastUpdated: 'Last updated',
    intro: {
      title: 'Introduction',
      content: 'This Cookie Policy explains what cookies are and how we use them on the Lunex Cleaning Services website. We encourage you to read this policy to understand what cookies we use and why.',
      consent: 'By using our website, you consent to the use of cookies in accordance with this policy.'
    },
    types: {
      title: 'Types of Cookies We Use',
      essential: {
        title: 'Essential Cookies',
        description: 'These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.',
        examples: {
          session: 'Session management cookies',
          preferences: 'User preference cookies',
          security: 'Security and authentication cookies'
        }
      },
      analytics: {
        title: 'Analytics Cookies',
        description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
        examples: {
          google: 'Google Analytics tracking',
          behavior: 'User behavior analysis',
          performance: 'Website performance monitoring'
        }
      },
      functional: {
        title: 'Functional Cookies',
        description: 'These cookies enable the website to provide enhanced functionality and personalization based on your preferences.',
        examples: {
          language: 'Language preference cookies',
          location: 'Location-based service cookies',
          display: 'Display preference cookies'
        }
      }
    },
    sections: {
      what: {
        title: 'What Are Cookies?',
        content: 'Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.'
      },
      why: {
        title: 'Why We Use Cookies',
        content: 'We use cookies for several reasons:',
        list: {
          remember: 'To remember your preferences and settings',
          improve: 'To improve website functionality and performance',
          secure: 'To ensure secure access to our services',
          personalize: 'To personalize your experience on our site'
        }
      },
      control: {
        title: 'How to Control Cookies',
        content: 'You can control and manage cookies in various ways:',
        list: {
          browser: 'Browser settings - Most browsers allow you to refuse or accept cookies',
          disable: 'Disable cookies - You can disable cookies entirely in your browser',
          delete: 'Delete cookies - You can delete cookies already stored on your device',
          block: 'Block specific cookies - You can block cookies from specific websites'
        }
      }
    },
    thirdParty: {
      title: 'Third-Party Cookies',
      content: 'We may use third-party services that set their own cookies:',
      analytics: 'Website analytics and performance monitoring',
      maps: 'Interactive maps and location services'
    },
    contact: {
      title: 'Questions About Cookies',
      description: 'If you have any questions about our use of cookies, please contact us:',
      button: 'Contact Us'
    },
    
    // Cookie Consent Banner
    banner: {
      title: 'We use cookies',
      message: 'This website uses cookies to enhance your browsing experience and provide personalized services. By continuing to use our site, you consent to essential cookies.',
      accept: 'Accept All',
      decline: 'Reject Non-Essential',
      customize: 'Customize Settings',
      learnMore: 'Learn more',
      legalNotice: 'By clicking "Accept All", you consent to all cookie categories. You can change your preferences at any time using the cookie settings.'
    },
    
    // Cookie Customization
    customization: {
      title: 'Cookie Preferences',
      subtitle: 'Manage your cookie preferences for our website',
      required: 'Required',
      cookiesUsed: 'Cookies Used',
      footerNote: 'Changes will take effect immediately after saving.',
      cancel: 'Cancel',
      save: 'Save Preferences'
    },
    
    // Cookie Settings Button
    settings: {
      title: 'Cookie Settings',
      tooltip: 'Manage cookie preferences'
    },
    
    // Cookie Categories
    categories: {
      essential: {
        title: 'Essential Cookies',
        description: 'These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas, and language preferences.'
      },
      functional: {
        title: 'Functional Cookies',
        description: 'These cookies enhance the functionality of the website by storing your preferences, such as chatbot conversation history and user interface settings.'
      },
      analytics: {
        title: 'Analytics Cookies',
        description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously, allowing us to improve our services.'
      },
      external: {
        title: 'External Services',
        description: 'These cookies enable external services like Google Maps for location services and AI-powered chatbot features for enhanced customer support.'
      }
    }
  },

  // Chatbot
  chatbot: {
    title: 'Luna - AI Assistant',
    status: 'Online now',
    placeholder: 'Type a message...',
    welcome: 'Hi! I\'m Luna, your intelligent Lunex assistant. I can help you with questions about our professional cleaning services, pricing, and booking. How can I assist you today?',
    needHelp: 'Need help? Chat with Luna!',
    suggestions: {
      quote: 'I want a quote',
      hours: 'Service hours',
      services: 'Types of cleaning',
      booking: 'Book an appointment',
      contact: 'Contact Us',
      cookieSettings: 'Cookie Settings'
    },
    responses: {
      quote: {
        text: 'Perfect! Our prices depend on the type of service:\n\n• Home cleaning\n• Office cleaning\n• Post-renovation cleaning\n• Luxury villa cleaning\n\nWould you like a personalized quote?',
        suggestions: ['Yes, I want a quote', 'Available services', 'How to book']
      },
      hours: {
        text: 'Our service hours are:\n\n• Monday-Friday: 8:00 AM - 6:00 PM\n• Saturday: 8:00 AM - 12:00 PM\n\nWe\'re also available for out-of-hours service upon request!',
        suggestions: ['Book now', 'Emergency service', 'Contact']
      },
      services: {
        text: 'We offer different types of professional cleaning:\n\n• 🏢 Office cleaning\n• 🏠 Domestic cleaning\n• 🔨 Post-renovation cleaning\n• ✨ Villa cleaning\n• 🧽 Deep cleaning\n• 🔄 Maintenance cleaning\n\nWhich interests you most?',
        suggestions: ['Office cleaning', 'Domestic cleaning', 'Post-renovation cleaning', 'Free estimate']
      },
      booking: {
        text: 'Great! To book an appointment you have several options:\n\n1. 📱 Fill out the online booking form\n2. 📞 Call +39 327 779 1867\n3. 📧 Email: info@lunex-cleaning.com\n\nWould you prefer to book online?',
        suggestions: ['Book online', 'Call now', 'Send email']
      },
      location: {
        text: 'We mainly operate in:\n\n• Romano di Lombardia\n• Bergamo and province\n• Surrounding areas\n\nFor more distant areas, contact us to check availability!',
        suggestions: ['Check availability', 'Contact', 'Free estimate']
      },
      emergency: {
        text: 'For cleaning emergencies we\'re available 24/7!\n\n📞 Emergency number: +39 327 779 1867\n\nEmergency rates: +50% on base price\nResponse time: 2-4 hours',
        suggestions: ['Call emergency', 'Normal quote', 'Standard hours']
      },
      greeting: {
        text: 'Hello! Welcome to Lunex Professional Cleaning! 👋\n\nI\'m here to help you with information about our professional cleaning services. What can I do for you?',
        suggestions: ['I want a quote', 'Available services', 'How to book', 'Contact']
      },
      thanks: {
        text: 'You\'re welcome! I\'m here to help! 😊\n\nIf you have other questions or want to proceed with booking, let me know!',
        suggestions: ['Book now', 'Other questions', 'Contact']
      },
      default: {
        text: 'I understand your request! For more specific information, I suggest you:\n\n• Contact our team at +39 327 779 1867\n• Visit the services section of the site\n• Fill out the contact form\n\nWhat would you prefer to do?',
        suggestions: ['Call now', 'View services', 'Contact via email', 'Free estimate']
      }
    },
    quickActions: {
      quote: '💰 Quote',
      book: '📅 Book',
      services: '🧽 Services'
    }
  },

  // Blog
  blog: {
    hero: {
      subtitle: 'Professional cleaning insights, tips and industry expertise'
    },
    setup: {
      title: 'Sanity CMS Setup Required',
      description: 'To start publishing your cleaning experience and insights, you need to set up Sanity CMS:',
      step1: 'Create a Sanity account at',
      step2: 'Create a new project and note your Project ID',
      step3: 'Create a file',
      step3_cont: 'in your project root',
      step4: 'Add your Sanity configuration:',
      step5: 'Restart the development server',
      instructions: 'For detailed instructions, see'
    },
    articleCount: 'Articles Available',
    latestArticles: 'Latest Articles',
    by: 'by',
    comingSoon: {
      title: 'Coming Soon!',
      description: 'We\'re preparing great cleaning tips and insights for you. Check back soon!'
    },
    needProfessionalCleaning: 'Need professional cleaning services?',
    ctaDescription: 'Let Lunex handle your cleaning needs with our professional, reliable, and eco-friendly services.',
    getFreeQuote: 'Free Estimate',
    viewServices: 'View Services',
    backToBlog: '← Back to Blog',
    about: 'About'
  },

  // Booking Page
  bookingPage: {
    title: 'Book Your Cleaning Service',
    subtitle: 'Select a service and book your appointment online',
    bookService: 'Book This Service',
    selectTimeSlot: 'Select Time Slot',
    selectedService: 'Selected Service',
    maintenance: {
      duration: 'Monthly/Weekly'
    },
    benefits: {
      instantConfirmation: {
        title: 'Instant Confirmation',
        description: 'Book your appointment and receive immediate confirmation'
      },
      flexibleScheduling: {
        title: 'Flexible Scheduling',
        description: 'Choose from available time slots that fit your schedule'
      },
      easyRescheduling: {
        title: 'Easy Rescheduling',
        description: 'Need to change your appointment? Reschedule anytime'
      }
    },
    preferCall: {
      title: 'Prefer to Call?',
      description: 'Our team is available to help you book your appointment'
    },
    scheduleAppointment: 'Schedule Appointment',
    bookAppointment: 'Book Appointment',
    loadingSystem: 'Loading booking system...'
  },

  // Reviews
  reviews: {
    hero: {
      title: 'Customer Reviews',
      subtitle: 'Discover what our clients say about our professional cleaning services'
    },
    subtitle: 'See why homeowners and businesses trust us for their cleaning needs',
    setup: {
      title: 'Sanity CMS Setup Required',
      description: 'To start managing your customer reviews, you need to set up Sanity CMS:',
      step1: 'Create a Sanity account at',
      step2: 'Create a new project and note your Project ID',
      step3: 'Create a file',
      step3_cont: 'in your project root',
      step4: 'Add your Sanity configuration:',
      step5: 'Restart the development server',
      instructions: 'For detailed instructions, see'
    },
    basedOn: 'Based on {count} reviews',
    testimonials: 'Customer Testimonials',
    noReviews: {
      title: 'No Reviews Yet',
      description: 'We\'re gathering reviews from our satisfied customers. Check back soon!'
    },
    cta: {
      title: 'Share Your Experience',
      description: 'Have you used our services? We\'d love to hear from you!',
      button: 'Write a Review'
    },
    finalCta: {
      title: 'Ready to Try Our Services?',
      description: 'Join our satisfied customers and experience the Lunex professional cleaning difference.',
      bookButton: 'Book Now',
      servicesButton: 'View Services'
    }
  },

  // Review Form
  reviewForm: {
    title: 'Write a Review',
    subtitle: 'Share your experience with our services',
    name: 'Full Name',
    namePlaceholder: 'Enter your full name',
    service: 'Service Received',
    servicePlaceholder: 'Select service',
    rating: 'Rating',
    ratingLabel: 'How many stars would you give our service?',
    testimonial: 'Your Review',
    testimonialPlaceholder: 'Describe your experience with our services...',
    submit: 'Submit Review',
    submitting: 'Submitting...',
    
    // Service Options
    serviceOptions: {
      office: 'Office Cleaning',
      domestic: 'Domestic Cleaning',
      'post-renovation': 'Post-Renovation Cleaning',
      villa: 'Villa Cleaning',
      deep: 'Deep Cleaning',
      maintenance: 'Maintenance Cleaning'
    },
    
    // Validation
    validation: {
      nameRequired: 'Name is required',
      serviceRequired: 'Service is required',
      ratingRequired: 'Rating is required',
      testimonialRequired: 'Review is required',
      testimonialMinLength: 'Review must be at least 10 characters long'
    },
    
    // Messages
    success: {
      title: 'Review Submitted Successfully!',
      description: 'Thank you for your review. It will be published after verification.',
      button: 'Close'
    },
    error: {
      title: 'Failed to Submit Review',
      description: 'An error occurred. Please try again later.',
      button: 'Try Again'
    }
  },

  // Pagination
  pagination: {
    previous: 'Previous',
    next: 'Next'
  },

  // About Page
  aboutPage: {
    subtitle: 'Professional Cleaning Services in Romano di Lombardia',
    description: 'Lunex is your trusted partner for all cleaning needs in the Bergamo province, committed to delivering exceptional service and quality.',
    
    story: {
      title: 'Our Story',
      content2: 'We believe that a clean environment is essential for health, productivity, and well-being. That\'s why we use only the best eco-friendly products and employ trained professionals who care about the details.',
      content3: 'Today, we serve hundreds of homes, offices, and commercial spaces, building lasting relationships based on trust, reliability, and exceptional service.'
    },
    
    values: {
      title: 'Our Values',
      subtitle: 'What sets us apart in the cleaning industry',
      qualityExcellence: {
        title: 'Quality Excellence',
        description: 'We maintain the highest standards in every cleaning service we provide'
      },
      customerFirst: {
        title: 'Customer First',
        description: 'Your satisfaction is our priority, with personalized service every time'
      },
      ecoFriendly: {
        title: 'Eco-Friendly',
        description: 'Using environmentally safe products for a healthier clean'
      },
      fullyInsured: {
        title: 'Fully Insured',
        description: 'Complete insurance coverage for your peace of mind'
      }
    },
    
    stats: {
      satisfiedClients: 'Satisfied Clients',
      happyCustomers: 'Happy Customers',
      projectsCompleted: 'Projects Completed',
      supportAvailable: 'Support Available'
    },
    
    team: {
      title: 'Our Team',
      subtitle: 'Dedicated professionals committed to excellence',
      teamMember: 'Team Member',
      professionalCleaner: 'Professional Cleaner'
    },
    
    cta: {
      title: 'Ready to Experience the Lunex Difference?',
      subtitle: 'Join hundreds of satisfied customers who trust us with their cleaning needs',
      getInTouch: 'Get in Touch',
      callUsNow: 'Call Us Now'
    }
  }
}