'use client'

import { useState } from 'react'
import { useLocale } from '@/hooks/useLocale'
import { Button } from '@/components/ui/button'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

interface Review {
  id: string
  name: string
  service: string
  rating: number
  comment: string
  date: string
  avatar?: string
}

export default function ReviewsPage() {
  const { t } = useLocale()
  
  // Sample reviews data - in a real app, this would come from an API
  const reviews: Review[] = [
    {
      id: '1',
      name: 'Maria Rossi',
      service: 'Haircut & Styling',
      rating: 5,
      comment: 'Absolutely amazing experience! The staff was professional and the result exceeded my expectations.',
      date: '2024-01-15'
    },
    {
      id: '2',
      name: 'Alessandro Bianchi',
      service: 'Relaxing Massage',
      rating: 5,
      comment: 'Perfect relaxation session. The atmosphere was so peaceful and the massage technique was excellent.',
      date: '2024-01-10'
    },
    {
      id: '3',
      name: 'Sofia Chen',
      service: 'Hydrating Facial',
      rating: 5,
      comment: 'My skin has never felt so soft and radiant! The facial treatment was incredibly rejuvenating.',
      date: '2024-01-08'
    },
    {
      id: '4',
      name: 'Marco Lombardi',
      service: 'Professional Manicure',
      rating: 4,
      comment: 'Great attention to detail and very hygienic environment. Will definitely return.',
      date: '2024-01-05'
    },
    {
      id: '5',
      name: 'Elena Gabrielli',
      service: 'Hair Coloring',
      rating: 5,
      comment: 'The color turned out exactly as I wanted. The stylist really listened to my needs.',
      date: '2024-01-03'
    },
    {
      id: '6',
      name: 'Roberto Ferri',
      service: 'Deep Tissue Massage',
      rating: 5,
      comment: 'Exceptional therapeutic massage. Really helped with my muscle tension.',
      date: '2024-01-01'
    }
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 6
  const totalPages = Math.ceil(reviews.length / reviewsPerPage)
  
  const currentReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  )

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  }

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    }
    
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Customer Reviews
          </h1>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Discover what our clients say about their experience at Lunex
          </p>
          
          {/* Rating Overview */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(averageRating), 'lg')}
                </div>
                <p className="text-purple-100">
                  Based on {reviews.length} reviews
                </p>
              </div>
              
              <div className="col-span-2">
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <span className="text-white w-8">{rating}</span>
                      <Star className="w-4 h-4 text-white mr-2" />
                      <div className="flex-1 bg-white/20 rounded-full h-2 mr-4">
                        <div
                          className="bg-white rounded-full h-2 transition-all duration-300"
                          style={{
                            width: `${(ratingDistribution[rating as keyof typeof ratingDistribution] / reviews.length) * 100}%`
                          }}
                        />
                      </div>
                      <span className="text-white text-sm">
                        {ratingDistribution[rating as keyof typeof ratingDistribution]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-600 font-semibold text-lg">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{review.name}</h3>
                    <p className="text-sm text-gray-600">{review.service}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {renderStars(review.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    {formatDate(review.date)}
                  </span>
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-purple-200" />
                  <p className="text-gray-700 pl-6 italic">
                    "{review.comment}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <div className="flex space-x-2">
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 ${
                      currentPage === i + 1 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-600 hover:bg-purple-50'
                    }`}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Write Review CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Share Your Experience
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Have you visited Lunex? We'd love to hear about your experience and help others discover our services.
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
            Write a Review
          </Button>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Happy Clients</h3>
              <p className="text-gray-600">Satisfied customers who trust our services</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">4.9</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Average Rating</h3>
              <p className="text-gray-600">Consistently excellent service quality</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">2+</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Years of Excellence</h3>
              <p className="text-gray-600">Proven track record in beauty industry</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Lunex?
          </h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Join our community of satisfied customers and discover why they choose Lunex for their beauty needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3">
              Book Your Appointment
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3">
              View Our Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}