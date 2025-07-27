'use client'

import { useState } from 'react'
import { useLocale } from '@/hooks/useLocale'
import { Star, X, Check, Upload, User } from 'lucide-react'

interface ReviewFormProps {
  isOpen: boolean
  onClose: () => void
}

export function ReviewForm({ isOpen, onClose }: ReviewFormProps) {
  const { t } = useLocale()
  const [formData, setFormData] = useState({
    clientName: '',
    service: '',
    rating: 0,
    testimonial: '',
    clientPhoto: null as File | null
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const services = [
    { value: 'office', label: t('reviewForm.serviceOptions.office') },
    { value: 'domestic', label: t('reviewForm.serviceOptions.domestic') },
    { value: 'post-renovation', label: t('reviewForm.serviceOptions.post-renovation') },
    { value: 'villa', label: t('reviewForm.serviceOptions.villa') },
    { value: 'deep', label: t('reviewForm.serviceOptions.deep') },
    { value: 'maintenance', label: t('reviewForm.serviceOptions.maintenance') }
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.clientName.trim()) {
      newErrors.clientName = t('reviewForm.validation.nameRequired')
    }
    
    if (!formData.service) {
      newErrors.service = t('reviewForm.validation.serviceRequired')
    }
    
    if (formData.rating === 0) {
      newErrors.rating = t('reviewForm.validation.ratingRequired')
    }
    
    if (!formData.testimonial.trim()) {
      newErrors.testimonial = t('reviewForm.validation.testimonialRequired')
    } else if (formData.testimonial.trim().length < 10) {
      newErrors.testimonial = t('reviewForm.validation.testimonialMinLength')
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Create FormData for image upload
      const submitData = new FormData()
      submitData.append('clientName', formData.clientName)
      submitData.append('service', formData.service)
      submitData.append('rating', formData.rating.toString())
      submitData.append('testimonial', formData.testimonial)
      
      if (formData.clientPhoto) {
        submitData.append('clientPhoto', formData.clientPhoto)
      }
      
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: submitData, // Send as FormData for file upload
      })
      
      if (response.ok) {
        setShowSuccess(true)
        setFormData({
          clientName: '',
          service: '',
          rating: 0,
          testimonial: '',
          clientPhoto: null
        })
        setImagePreview(null)
      } else {
        setShowError(true)
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      setShowError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }))
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: '' }))
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, clientPhoto: 'Image size must be less than 5MB' }))
        return
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, clientPhoto: 'Please select a valid image file' }))
        return
      }
      
      setFormData(prev => ({ ...prev, clientPhoto: file }))
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      
      // Clear any previous errors
      if (errors.clientPhoto) {
        setErrors(prev => ({ ...prev, clientPhoto: '' }))
      }
    }
  }

  const removeImage = () => {
    setFormData(prev => ({ ...prev, clientPhoto: null }))
    setImagePreview(null)
    // Clear file input
    const fileInput = document.getElementById('photo-upload') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  const resetAndClose = () => {
    setShowSuccess(false)
    setShowError(false)
    setErrors({})
    setImagePreview(null)
    setFormData({
      clientName: '',
      service: '',
      rating: 0,
      testimonial: '',
      clientPhoto: null
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{t('reviewForm.title')}</h2>
            <p className="text-gray-600 mt-1">{t('reviewForm.subtitle')}</p>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 hover:bg-purple-100 rounded-full transition-colors group"
          >
            <X className="w-6 h-6 text-gray-500 group-hover:text-gray-700" />
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="p-6">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-900 mb-2">
                {t('reviewForm.success.title')}
              </h3>
              <p className="text-emerald-700 mb-4">
                {t('reviewForm.success.description')}
              </p>
              <button
                onClick={resetAndClose}
                className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-2 rounded-full hover:from-emerald-700 hover:to-green-700 transition-all transform hover:scale-105"
              >
                {t('reviewForm.success.button')}
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {showError && (
          <div className="p-6">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-semibold text-red-900 mb-2">
                {t('reviewForm.error.title')}
              </h3>
              <p className="text-red-700 mb-4">
                {t('reviewForm.error.description')}
              </p>
              <button
                onClick={() => setShowError(false)}
                className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-red-700 hover:to-pink-700 transition-all transform hover:scale-105"
              >
                {t('reviewForm.error.button')}
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        {!showSuccess && !showError && (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Profile Photo (Optional)
              </label>
              <div className="flex items-center space-x-4">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-20 h-20 rounded-full object-cover border-4 border-purple-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center border-2 border-dashed border-purple-300">
                    <User className="w-8 h-8 text-purple-400" />
                  </div>
                )}
                <div className="flex-1">
                  <label
                    htmlFor="photo-upload"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 cursor-pointer transition-all transform hover:scale-105"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Photo
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <p className="text-sm text-gray-600 mt-1">Max 5MB, JPG/PNG only</p>
                </div>
              </div>
              {errors.clientPhoto && (
                <p className="text-red-600 text-sm mt-2">{errors.clientPhoto}</p>
              )}
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('reviewForm.name')}
              </label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                placeholder={t('reviewForm.namePlaceholder')}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500 ${
                  errors.clientName ? 'border-red-300 bg-red-50' : 'border-purple-200 hover:border-purple-300'
                }`}
              />
              {errors.clientName && (
                <p className="text-red-600 text-sm mt-1">{errors.clientName}</p>
              )}
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('reviewForm.service')}
              </label>
              <select
                value={formData.service}
                onChange={(e) => handleInputChange('service', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 ${
                  errors.service ? 'border-red-300 bg-red-50' : 'border-purple-200 hover:border-purple-300'
                }`}
              >
                <option value="">{t('reviewForm.servicePlaceholder')}</option>
                {services.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="text-red-600 text-sm mt-1">{errors.service}</p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('reviewForm.rating')}
              </label>
              <p className="text-sm text-gray-600 mb-3">{t('reviewForm.ratingLabel')}</p>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    className="focus:outline-none focus:ring-2 focus:ring-purple-500 rounded transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 transition-all ${
                        star <= formData.rating
                          ? 'text-yellow-400 fill-current drop-shadow-sm'
                          : 'text-purple-300 hover:text-yellow-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {errors.rating && (
                <p className="text-red-600 text-sm mt-1">{errors.rating}</p>
              )}
            </div>

            {/* Testimonial */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('reviewForm.testimonial')}
              </label>
              <textarea
                value={formData.testimonial}
                onChange={(e) => handleInputChange('testimonial', e.target.value)}
                placeholder={t('reviewForm.testimonialPlaceholder')}
                rows={4}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-gray-900 placeholder-gray-500 ${
                  errors.testimonial ? 'border-red-300 bg-red-50' : 'border-purple-200 hover:border-purple-300'
                }`}
              />
              {errors.testimonial && (
                <p className="text-red-600 text-sm mt-1">{errors.testimonial}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-purple-100">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? t('reviewForm.submitting') : t('reviewForm.submit')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}