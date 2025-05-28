import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import InvitePage from './pages/InvitePage'

import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-surface-50 via-blue-50 to-secondary-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 transition-all duration-500">
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/invite" element={<InvitePage darkMode={darkMode} setDarkMode={setDarkMode} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? "dark" : "light"}
          className="mt-16"
          toastClassName="rounded-xl shadow-soft"
        />
      </div>
    </div>
  )
}

export default App