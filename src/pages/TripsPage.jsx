import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { 
  Plus,
  MapPin, 
  Calendar, 
  Users,
  ArrowRight,
  Moon,
  Sun,
  Home
} from 'lucide-react'

const TripsPage = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate()
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: ''
  })
  const [errors, setErrors] = useState({})

  // Load trips from localStorage on component mount
  useEffect(() => {
    const loadTrips = () => {
      setLoading(true)
      try {
        const savedTrips = localStorage.getItem('tripsync_trips')
        if (savedTrips) {
          setTrips(JSON.parse(savedTrips))
        } else {
          // Initialize with some sample trips if none exist
          const sampleTrips = [
            {
              id: 'trip-1',
              name: 'European Adventure 2024',
              destination: 'Paris, France → Rome, Italy',
              startDate: '2024-06-15',
              endDate: '2024-06-25',
              creatorId: 'user123',
              participants: [
                { id: 'user123', name: 'Sarah Johnson', role: 'Creator' },
                { id: 'user456', name: 'Mike Chen', role: 'Member' },
                { id: 'guest789', name: 'Emma Wilson', role: 'Guest' }
              ],
              createdAt: new Date().toISOString()
            },
            {
              id: 'trip-2',
              name: 'Beach Getaway',
              destination: 'Maldives',
              startDate: '2024-08-10',
              endDate: '2024-08-17',
              creatorId: 'user123',
              participants: [
                { id: 'user123', name: 'Sarah Johnson', role: 'Creator' },
                { id: 'user789', name: 'Alex Rivera', role: 'Member' }
              ],
              createdAt: new Date().toISOString()
            }
          ]
          setTrips(sampleTrips)
          localStorage.setItem('tripsync_trips', JSON.stringify(sampleTrips))
        }
      } catch (error) {
        toast.error('Failed to load trips')
      } finally {
        setLoading(false)
      }
    }

    loadTrips()
  }, [])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Trip name is required'
    }

    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required'
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required'
    }

    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate)
      const endDate = new Date(formData.endDate)
      if (startDate >= endDate) {
        newErrors.endDate = 'End date must be after start date'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleCreateTrip = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form')
      return
    }

    setIsCreating(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newTrip = {
        id: `trip-${Date.now()}`,
        name: formData.name.trim(),
        destination: formData.destination.trim(),
        startDate: formData.startDate,
        endDate: formData.endDate,
        creatorId: 'user123', // In real app, this would come from auth
        participants: [
          { id: 'user123', name: 'Sarah Johnson', role: 'Creator' }
        ],
        createdAt: new Date().toISOString()
      }
      
      const updatedTrips = [newTrip, ...trips]
      setTrips(updatedTrips)
      localStorage.setItem('tripsync_trips', JSON.stringify(updatedTrips))
      
      // Reset form
      setFormData({
        name: '',
        destination: '',
        startDate: '',
        endDate: ''
      })
      
      toast.success('Trip created successfully!')
      
      // Navigate to the new trip
      navigate(`/trip/${newTrip.id}`)
      
    } catch (error) {
      toast.error('Failed to create trip. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleTripClick = (tripId) => {
    navigate(`/trip/${tripId}`)
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
                to="/"
                className="flex items-center text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
              >
                <Home className="w-5 h-5 mr-2" />
                Home
              </Link>
              <span className="text-surface-400 dark:text-surface-500">/</span>
              <span className="text-surface-900 dark:text-white font-medium">My Trips</span>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Trip Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-lg rounded-2xl shadow-card border border-surface-200 dark:border-surface-700 p-8 mb-8"
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-soft mr-4">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-surface-900 dark:text-white font-heading">
                Create New Trip
              </h1>
              <p className="text-surface-600 dark:text-surface-300 mt-1">
                Start planning your next adventure
              </p>
            </div>
          </div>

          <form onSubmit={handleCreateTrip} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Trip Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-surface-300 dark:border-surface-600'} bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200`}
                placeholder="Enter trip name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Destination *
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.destination ? 'border-red-500' : 'border-surface-300 dark:border-surface-600'} bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200`}
                placeholder="Enter destination"
              />
              {errors.destination && (
                <p className="text-red-500 text-sm mt-1">{errors.destination}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.startDate ? 'border-red-500' : 'border-surface-300 dark:border-surface-600'} bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                End Date *
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.endDate ? 'border-red-500' : 'border-surface-300 dark:border-surface-600'} bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200`}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <motion.button
                type="submit"
                disabled={isCreating}
                className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-soft font-medium"
                whileTap={{ scale: 0.95 }}
              >
                {isCreating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Creating Trip...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Create Trip
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Trips List Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-lg rounded-2xl shadow-card border border-surface-200 dark:border-surface-700 p-8"
        >
          <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-6 font-heading">
            My Trips ({trips.length})
          </h2>

          {trips.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-12 h-12 text-surface-400 dark:text-surface-500" />
              </div>
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                No trips yet
              </h3>
              <p className="text-surface-600 dark:text-surface-300">
                Create your first trip to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="bg-surface-50 dark:bg-surface-700 rounded-xl p-6 border border-surface-200 dark:border-surface-600 hover:shadow-soft transition-all duration-300 cursor-pointer group"
                  onClick={() => handleTripClick(trip.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-200">
                        {trip.name}
                      </h3>
                      <div className="flex items-center text-surface-600 dark:text-surface-300 text-sm mb-2">
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        <span className="truncate">{trip.destination}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-surface-400 dark:text-surface-500 group-hover:text-primary dark:group-hover:text-primary-light transform group-hover:translate-x-1 transition-all duration-200" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-surface-600 dark:text-surface-300 text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-secondary" />
                      <span>
                        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                      </span>
                    </div>

                    <div className="flex items-center text-surface-600 dark:text-surface-300 text-sm">
                      <Users className="w-4 h-4 mr-2 text-accent" />
                      <span>
                        {trip.participants.length} participant{trip.participants.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-600">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-surface-500 dark:text-surface-400">
                        Created {formatDate(trip.createdAt)}
                      </span>
                      <div className="px-2 py-1 bg-primary text-white text-xs rounded-full">
                        Active
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}

export default TripsPage