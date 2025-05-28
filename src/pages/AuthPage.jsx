import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { User, Mail, Lock, Eye, EyeOff, Moon, Sun, ArrowLeft } from 'lucide-react'

function AuthPage({ darkMode, setDarkMode }) {
  const navigate = useNavigate()
  const [currentSection, setCurrentSection] = useState('signup') // 'signup' or 'login'
  const [loading, setLoading] = useState(false)
  
  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    password: ''
  })
  
  const [signUpErrors, setSignUpErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  
  // Validation functions
  const validateFullName = (name) => {
    if (!name.trim()) return 'Full name is required'
    if (name.trim().length < 2) return 'Full name must be at least 2 characters'
    return ''
  }
  
  const validateEmail = (email) => {
    if (!email.trim()) return 'Email address is required'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return 'Please enter a valid email address'
    return ''
  }
  
  const validatePassword = (password) => {
    if (!password) return 'Password is required'
    if (password.length < 6) return 'Password must be at least 6 characters'
    return ''
  }
  
  // Handle input changes with real-time validation
  const handleSignUpChange = (field, value) => {
    setSignUpData(prev => ({ ...prev, [field]: value }))
    
    // Clear error for this field
    if (signUpErrors[field]) {
      setSignUpErrors(prev => ({ ...prev, [field]: '' }))
    }
    
    // Real-time validation
    let error = ''
    switch (field) {
      case 'fullName':
        error = validateFullName(value)
        break
      case 'email':
        error = validateEmail(value)
        break
      case 'password':
        error = validatePassword(value)
        break
    }
    
    if (error) {
      setSignUpErrors(prev => ({ ...prev, [field]: error }))
    }
  }
  
  // Handle sign up form submission
  const handleSignUpSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all fields
    const errors = {
      fullName: validateFullName(signUpData.fullName),
      email: validateEmail(signUpData.email),
      password: validatePassword(signUpData.password)
    }
    
    // Remove empty error messages
    Object.keys(errors).forEach(key => {
      if (!errors[key]) delete errors[key]
    })
    
    setSignUpErrors(errors)
    
    // If there are errors, don't submit
    if (Object.keys(errors).length > 0) {
      toast.error('Please fix the errors in the form')
      return
    }
    
    setLoading(true)
    
    try {
      // Simulate API call for user registration
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate checking if email already exists
      const existingUsers = JSON.parse(localStorage.getItem('tripSyncUsers') || '[]')
      if (existingUsers.some(user => user.email === signUpData.email)) {
        toast.error('An account with this email already exists')
        setLoading(false)
        return
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        fullName: signUpData.fullName.trim(),
        email: signUpData.email.trim(),
        password: signUpData.password, // In real app, this would be hashed
        createdAt: new Date().toISOString()
      }
      
      // Store user
      existingUsers.push(newUser)
      localStorage.setItem('tripSyncUsers', JSON.stringify(existingUsers))
      
      // Set current user session
      localStorage.setItem('tripSyncCurrentUser', JSON.stringify(newUser))
      
      toast.success('Account created successfully! Welcome to TripSync!')
      
      // Reset form
      setSignUpData({ fullName: '', email: '', password: '' })
      setSignUpErrors({})
      
      // Redirect to home page or dashboard
      setTimeout(() => {
        navigate('/')
      }, 1000)
      
    } catch (error) {
      toast.error('Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const SignUpSection = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-surface-900 dark:text-white">
          Create Account
        </h2>
        <p className="text-surface-600 dark:text-surface-300">
          Join TripSync and start planning amazing trips together
        </p>
      </div>
      
      <form onSubmit={handleSignUpSubmit} className="space-y-5">
        {/* Full Name Field */}
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-surface-400 dark:text-surface-500" />
            </div>
            <input
              type="text"
              value={signUpData.fullName}
              onChange={(e) => handleSignUpChange('fullName', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-surface-800 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                signUpErrors.fullName 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-surface-300 dark:border-surface-600'
              }`}
              placeholder="Enter your full name"
              disabled={loading}
            />
          </div>
          {signUpErrors.fullName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {signUpErrors.fullName}
            </p>
          )}
        </div>
        
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-surface-400 dark:text-surface-500" />
            </div>
            <input
              type="email"
              value={signUpData.email}
              onChange={(e) => handleSignUpChange('email', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-surface-800 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                signUpErrors.email 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-surface-300 dark:border-surface-600'
              }`}
              placeholder="Enter your email address"
              disabled={loading}
            />
          </div>
          {signUpErrors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {signUpErrors.email}
            </p>
          )}
        </div>
        
        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
            Password *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-surface-400 dark:text-surface-500" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={signUpData.password}
              onChange={(e) => handleSignUpChange('password', e.target.value)}
              className={`w-full pl-10 pr-12 py-3 bg-white dark:bg-surface-800 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                signUpErrors.password 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-surface-300 dark:border-surface-600'
              }`}
              placeholder="Enter your password (min 6 characters)"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300" />
              ) : (
                <Eye className="h-5 w-5 text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300" />
              )}
            </button>
          </div>
          {signUpErrors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {signUpErrors.password}
            </p>
          )}
        </div>
        
        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Creating Account...</span>
            </div>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
      
      {/* Already have account link */}
      <div className="text-center">
        <button
          onClick={() => setCurrentSection('login')}
          className="text-primary hover:text-primary-dark font-medium transition-colors duration-200"
          disabled={loading}
        >
          Already have an account? Log In
        </button>
      </div>
    </div>
  )
  
  const LoginSection = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-surface-900 dark:text-white">
          Welcome Back
        </h2>
        <p className="text-surface-600 dark:text-surface-300">
          Sign in to continue planning your trips
        </p>
      </div>
      
      <div className="text-center py-12">
        <p className="text-surface-500 dark:text-surface-400">
          Login section coming soon...
        </p>
        <button
          onClick={() => setCurrentSection('signup')}
          className="mt-4 text-primary hover:text-primary-dark font-medium transition-colors duration-200"
        >
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  )
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-blue-50 to-secondary-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 transition-all duration-500">
      {/* Header */}
      <header className="bg-white dark:bg-surface-800 shadow-soft border-b border-surface-200 dark:border-surface-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-surface-900 dark:text-white">
                TripSync
              </h1>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors duration-200"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card border border-surface-200 dark:border-surface-700 p-8">
            {currentSection === 'signup' ? <SignUpSection /> : <LoginSection />}
          </div>
        </div>
      </main>
    </div>
  )
}

export default AuthPage