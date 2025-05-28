import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { 
  ArrowLeft, 
  Save, 
  Calendar, 
  MapPin, 
  Type,
  Moon,
  Sun
} from 'lucide-react'

const EditTripPage = ({ darkMode, setDarkMode }) => {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: ''
  })
  const [errors, setErrors] = useState({})

  // Simulate fetching trip data from database
  useEffect(() => {
    const fetchTripData = async () => {
      setLoading(true)
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Mock trip data from "database"
        const mockTrip = {
          id: tripId,
          name: 'European Adventure 2024',
          destination: 'Paris, France → Rome, Italy',
          startDate: '2024-06-15',
          endDate: '2024-06-25'
        }
        
        setFormData({
          name: mockTrip.name,
          destination: mockTrip.destination,
          startDate: mockTrip.startDate,
          endDate: mockTrip.endDate
        })
        setLoading(false)
      } catch (error) {
        toast.error('Failed to load trip data')
        setLoading(false)
      }
    }

    fetchTripData()
  }, [tripId])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Trip name is required'
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Trip name must be at least 3 characters'
    }
    
    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required'
    } else if (formData.destination.trim().length < 3) {
      newErrors.destination = 'Destination must be at least 3 characters'
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required'
    } else if (formData.startDate && formData.endDate <= formData.startDate) {
      newErrors.endDate = 'End date must be after start date'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the errors before saving')
      return
    }
    
    setSaving(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock successful update
      toast.success('Trip details updated successfully!')
      
      // Navigate back to trip dashboard
      navigate(`/trip/${tripId}`)
    } catch (error) {
      toast.error('Failed to update trip details')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-50 via-blue-50 to-secondary-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-blue-50 to-secondary-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-lg border-b border-surface-200 dark:border-surface-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to={`/trip/${tripId}`}
                className="flex items-center text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors duration-200"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-lg rounded-2xl shadow-card border border-surface-200 dark:border-surface-700 p-8"
        >
          <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-8 font-heading">
            Edit Trip Details
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Trip Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                <Type className="w-4 h-4 mr-2 text-primary" />
                Trip Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                  errors.name
                    ? 'border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-400'
                    : 'border-surface-300 dark:border-surface-600 focus:border-primary dark:focus:border-primary-light'
                } bg-white dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 dark:placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                placeholder="Enter trip name"
                maxLength={100}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Destination */}
            <div>
              <label className="flex items-center text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                <MapPin className="w-4 h-4 mr-2 text-secondary" />
                Destination
              </label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                  errors.destination
                    ? 'border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-400'
                    : 'border-surface-300 dark:border-surface-600 focus:border-primary dark:focus:border-primary-light'
                } bg-white dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 dark:placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                placeholder="Enter destination"
                maxLength={200}
              />
              {errors.destination && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.destination}</p>
              )}
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Date */}
              <div>
                <label className="flex items-center text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-accent" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                    errors.startDate
                      ? 'border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-400'
                      : 'border-surface-300 dark:border-surface-600 focus:border-primary dark:focus:border-primary-light'
                  } bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20`}
                />
                {errors.startDate && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.startDate}</p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label className="flex items-center text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-accent" />
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                    errors.endDate
                      ? 'border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-400'
                      : 'border-surface-300 dark:border-surface-600 focus:border-primary dark:focus:border-primary-light'
                  } bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20`}
                />
                {errors.endDate && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.endDate}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-soft font-medium"
              >
                {saving ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  )
}

export default EditTripPage