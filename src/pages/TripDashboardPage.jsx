import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { 
  ArrowLeft, 
  Edit3, 
  Calendar, 
  MapPin, 
  Users,
  Moon,
  Sun
} from 'lucide-react'

const TripDashboardPage = ({ darkMode, setDarkMode }) => {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)

  // Simulate fetching trip data from database
  useEffect(() => {
    const fetchTripData = async () => {
      setLoading(true)
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock trip data from "database"
        const mockTrip = {
          id: tripId,
          name: 'European Adventure 2024',
          destination: 'Paris, France → Rome, Italy',
          startDate: '2024-06-15',
          endDate: '2024-06-25',
          creatorId: 'user123',
          participants: [
            { id: 'user123', name: 'Sarah Johnson', role: 'Creator' },
            { id: 'user456', name: 'Mike Chen', role: 'Member' },
            { id: 'guest789', name: 'Emma Wilson', role: 'Guest' }
          ]
        }
        
        // Mock current user data
        const mockCurrentUser = {
          id: 'user123',
          name: 'Sarah Johnson',
          isGuest: false
        }
        
        setTrip(mockTrip)
        setCurrentUser(mockCurrentUser)
        setLoading(false)
      } catch (error) {
        toast.error('Failed to load trip data')
        setLoading(false)
      }
    }

    fetchTripData()
  }, [tripId])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isCreator = currentUser && trip && currentUser.id === trip.creatorId

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

  if (!trip) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-50 via-blue-50 to-secondary-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">Trip Not Found</h2>
          <p className="text-surface-600 dark:text-surface-300 mb-6">The trip you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
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
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trip Overview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-lg rounded-2xl shadow-card border border-surface-200 dark:border-surface-700 p-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-surface-900 dark:text-white mb-4 font-heading">
                {trip.name}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-3 sm:space-y-0 mb-6">
                <div className="flex items-center text-surface-600 dark:text-surface-300">
                  <MapPin className="w-5 h-5 mr-3 text-primary" />
                  <span className="text-lg">{trip.destination}</span>
                </div>
                
                <div className="flex items-center text-surface-600 dark:text-surface-300">
                  <Calendar className="w-5 h-5 mr-3 text-secondary" />
                  <span className="text-lg">
                    {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                  </span>
                </div>
                
                <div className="flex items-center text-surface-600 dark:text-surface-300">
                  <Users className="w-5 h-5 mr-3 text-accent" />
                  <span className="text-lg">
                    {trip.participants.length} participant{trip.participants.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
            
            {isCreator && (
              <div className="mt-6 lg:mt-0">
                <Link
                  to={`/trip/${tripId}/edit`}
                  className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200 transform hover:scale-105 shadow-soft"
                >
                  <Edit3 className="w-5 h-5 mr-2" />
                  Edit Trip Details
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Placeholder for additional sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Participant List Section Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-lg rounded-2xl shadow-card border border-surface-200 dark:border-surface-700 p-6"
          >
            <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4 font-heading">
              Participants
            </h2>
            <div className="space-y-3">
              {trip.participants.map((participant) => (
                <div key={participant.id} className="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-700 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {participant.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-surface-900 dark:text-white">{participant.name}</p>
                      <p className="text-sm text-surface-500 dark:text-surface-400">{participant.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Updates Feed Section Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-lg rounded-2xl shadow-card border border-surface-200 dark:border-surface-700 p-6"
          >
            <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4 font-heading">
              Recent Updates
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                <p className="text-surface-900 dark:text-white">Trip created and participants invited</p>
                <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">2 hours ago</p>
              </div>
              <div className="p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                <p className="text-surface-900 dark:text-white">Mike Chen joined the trip</p>
                <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">1 hour ago</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default TripDashboardPage