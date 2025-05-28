import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// This component serves as an alias/redirect to TripsPage
// to maintain consistency with different naming conventions
const TripListPage = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to the main trips page
    navigate('/trips', { replace: true })
  }, [navigate])

  // Return null or a loading spinner since this is just a redirect
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-blue-50 to-secondary-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default TripListPage