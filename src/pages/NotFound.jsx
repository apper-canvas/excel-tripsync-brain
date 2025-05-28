import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-soft"
        >
          <ApperIcon name="MapPin" className="w-12 h-12 text-white" />
        </motion.div>
        
        <h1 className="text-6xl font-bold text-surface-800 dark:text-surface-200 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-surface-700 dark:text-surface-300 mb-4">Trip Not Found</h2>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          Looks like this destination doesn't exist. Let's get you back on track!
        </p>
        
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-medium shadow-soft hover:shadow-lg transition-all duration-200"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound