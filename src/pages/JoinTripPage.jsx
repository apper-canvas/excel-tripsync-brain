import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const JoinTripPage = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate()
  const { tripId } = useParams()
  const [guestName, setGuestName] = useState('')
  const [isJoining, setIsJoining] = useState(false)

  // Generate temporary guest ID
  const generateGuestId = () => {
    return `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Validate guest name
  const validateName = (name) => {
    return name.trim().length >= 2
  }

  // Join trip as guest
  const joinAsGuest = async () => {
    if (!guestName.trim()) {
      toast.error('Please enter your name')
      return
    }

    if (!validateName(guestName)) {
      toast.error('Name must be at least 2 characters long')
      return
    }

    setIsJoining(true)

    try {
      // Generate temporary guest ID
      const guestId = generateGuestId()
      
      // Create guest data object
      const guestData = {
        id: guestId,
        name: guestName.trim(),
        tripId: tripId,
        joinedAt: new Date().toISOString(),
        isGuest: true,
        permissions: {
          canView: true,
          canSuggest: true,
          canVote: true,
          canInvite: false,
          canManage: false
        }
      }

      // Store guest data in localStorage
      localStorage.setItem('tripSyncGuestData', JSON.stringify(guestData))
      localStorage.setItem(`tripSync_guest_${tripId}`, JSON.stringify(guestData))
      
      // Simulate API call to associate guest with trip
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Store trip association
      const tripAssociation = {
        guestId: guestId,
        tripId: tripId,
        associatedAt: new Date().toISOString(),
        status: 'active'
      }
      
      localStorage.setItem(`tripSync_association_${guestId}`, JSON.stringify(tripAssociation))
      
      toast.success(`Welcome to the trip, ${guestName}!`)
      
      // Redirect to trip dashboard with guest access
      navigate(`/trip-dashboard/${tripId}?guest=${guestId}`)
      
    } catch (error) {
      toast.error('Failed to join trip. Please try again.')
    } finally {
      setIsJoining(false)
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      joinAsGuest()
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 glass-effect backdrop-blur-xl border-b border-surface-200 dark:border-surface-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-soft">
                <ApperIcon name="MapPin" className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TripSync
              </h1>
            </motion.div>

            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => navigate('/')}
                className="neu-button p-2 rounded-xl"
                whileTap={{ scale: 0.95 }}
              >
                <ApperIcon name="ArrowLeft" className="w-5 h-5 text-surface-600 dark:text-surface-300" />
              </motion.button>
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                className="neu-button p-2 rounded-xl"
                whileTap={{ scale: 0.95 }}
              >
                <ApperIcon 
                  name={darkMode ? "Sun" : "Moon"} 
                  className="w-5 h-5 text-surface-600 dark:text-surface-300" 
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft">
            <ApperIcon name="UserPlus" className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-surface-800 dark:text-surface-200 mb-4">
            Join Trip
          </h1>
          <p className="text-surface-600 dark:text-surface-400 text-lg">
            You've been invited to join this exciting trip adventure!
          </p>
        </motion.div>

        {/* Guest Join Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="activity-card mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-emerald-400 rounded-xl flex items-center justify-center">
              <ApperIcon name="User" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-200">
                Join as Guest
              </h2>
              <p className="text-surface-600 dark:text-surface-400">
                Quick access without creating an account
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-surface-800 dark:text-surface-200"
                disabled={isJoining}
                maxLength={50}
              />
              <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                This name will be visible to other trip members
              </p>
            </div>

            <motion.button
              onClick={joinAsGuest}
              disabled={isJoining || !guestName.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-4 bg-gradient-to-r from-accent to-emerald-400 text-white rounded-xl font-medium shadow-soft hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isJoining ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Joining Trip...</span>
                </>
              ) : (
                <>
                  <ApperIcon name="ArrowRight" className="w-5 h-5" />
                  <span>Join Trip</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.section>

        {/* Login/Signup Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="activity-card"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <ApperIcon name="Shield" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-200">
                Join as Registered User
              </h2>
              <p className="text-surface-600 dark:text-surface-400">
                Full access with account benefits
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.button
                onClick={() => navigate(`/auth/login?redirect=/trip-dashboard/${tripId}`)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-primary text-white rounded-xl font-medium shadow-soft hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <ApperIcon name="LogIn" className="w-4 h-4" />
                <span>Log In</span>
              </motion.button>
              
              <motion.button
                onClick={() => navigate(`/auth/signup?redirect=/trip-dashboard/${tripId}`)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-secondary text-white rounded-xl font-medium shadow-soft hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <ApperIcon name="UserPlus" className="w-4 h-4" />
                <span>Sign Up</span>
              </motion.button>
            </div>
            
            <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4 border border-surface-200 dark:border-surface-600">
              <h3 className="font-medium text-surface-800 dark:text-surface-200 mb-2">
                Benefits of having an account:
              </h3>
              <ul className="text-sm text-surface-600 dark:text-surface-400 space-y-1">
                <li className="flex items-center space-x-2">
                  <ApperIcon name="Check" className="w-4 h-4 text-accent" />
                  <span>Invite others to trips</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ApperIcon name="Check" className="w-4 h-4 text-accent" />
                  <span>Manage trip settings</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ApperIcon name="Check" className="w-4 h-4 text-accent" />
                  <span>Access trip history</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ApperIcon name="Check" className="w-4 h-4 text-accent" />
                  <span>Enhanced collaboration features</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}

export default JoinTripPage