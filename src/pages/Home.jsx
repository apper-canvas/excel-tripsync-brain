import React from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = ({ darkMode, setDarkMode }) => {
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MainFeature />
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-surface-600 dark:text-surface-400">
            <p>&copy; 2024 TripSync. Collaborative travel planning made simple.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home