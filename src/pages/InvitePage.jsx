import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const InvitePage = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate()
  const [emailInvite, setEmailInvite] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [inviteLink] = useState(`${window.location.origin}/join-trip/tokyo-adventure-123`)
  const [pendingInvites, setPendingInvites] = useState([
    { id: 1, email: 'john@example.com', status: 'pending', sentAt: '2024-01-15', inviter: 'You' },
    { id: 2, email: 'sarah@example.com', status: 'accepted', sentAt: '2024-01-14', inviter: 'You' },
    { id: 3, email: 'mike@example.com', status: 'pending', sentAt: '2024-01-13', inviter: 'You' }
  ])

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Send email invitation
  const sendEmailInvite = async () => {
    if (!emailInvite.trim()) {
      toast.error('Please enter an email address')
      return
    }

    if (!validateEmail(emailInvite)) {
      toast.error('Please enter a valid email address')
      return
    }

    // Check if email already invited
    const existingInvite = pendingInvites.find(invite => invite.email === emailInvite)
    if (existingInvite) {
      toast.warning('This email has already been invited')
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call for invitation storage
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Store invitation in pending invitations table (simulated)
      const newInvite = {
        id: Date.now(),
        email: emailInvite,
        status: 'pending',
        sentAt: new Date().toISOString().split('T')[0],
        inviter: 'You',
        tripId: 'tokyo-adventure-123'
      }
      
      setPendingInvites(prev => [newInvite, ...prev])
      
      // Simulate sending email with invite link
      console.log('Email invitation sent:', {
        to: emailInvite,
        subject: 'You\'re invited to join Tokyo Adventure trip!',
        inviteLink: inviteLink,
        message: 'Join us on our upcoming trip to Tokyo, Japan. Click the link to accept the invitation.'
      })
      
      toast.success(`Invitation sent to ${emailInvite}!`)
      setEmailInvite('')
    } catch (error) {
      toast.error('Failed to send invitation. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Copy invite link to clipboard
  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      toast.success('Invite link copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  // Resend invitation
  const resendInvitation = async (inviteId, email) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setPendingInvites(prev => prev.map(invite => 
        invite.id === inviteId 
          ? { ...invite, sentAt: new Date().toISOString().split('T')[0] }
          : invite
      ))
      
      toast.success(`Invitation resent to ${email}`)
    } catch (error) {
      toast.error('Failed to resend invitation')
    }
  }

  // Revoke invitation
  const revokeInvitation = async (inviteId, email) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setPendingInvites(prev => prev.filter(invite => invite.id !== inviteId))
      toast.success(`Invitation to ${email} has been revoked`)
    } catch (error) {
      toast.error('Failed to revoke invitation')
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-surface-800 dark:text-surface-200 mb-4">
            Invite Friends to Tokyo Adventure
          </h1>
          <p className="text-surface-600 dark:text-surface-400 text-lg">
            Share your trip and collaborate on planning together
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Email Invite Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="activity-card"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="Mail" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-200">
                  Invite by Email
                </h2>
                <p className="text-surface-600 dark:text-surface-400">
                  Send a personalized invitation with trip details
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={emailInvite}
                  onChange={(e) => setEmailInvite(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendEmailInvite()}
                  className="flex-1 px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  disabled={isLoading}
                />
                <motion.button
                  onClick={sendEmailInvite}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium shadow-soft hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Send" className="w-4 h-4" />
                      <span>Send Invite</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.section>

          {/* Link Invite Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="activity-card"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-emerald-400 rounded-xl flex items-center justify-center">
                <ApperIcon name="Link" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-200">
                  Invite by Link
                </h2>
                <p className="text-surface-600 dark:text-surface-400">
                  Share this link with anyone you want to invite
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl text-surface-700 dark:text-surface-300 font-mono text-sm break-all">
                  {inviteLink}
                </div>
                <motion.button
                  onClick={copyInviteLink}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-accent text-white rounded-xl font-medium shadow-soft hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                >
                  <ApperIcon name="Copy" className="w-4 h-4" />
                  <span>Copy Link</span>
                </motion.button>
              </div>
            </div>
          </motion.section>

          {/* Pending Invites Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="activity-card"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-orange-400 rounded-xl flex items-center justify-center">
                <ApperIcon name="Users" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-200">
                  Pending Invitations
                </h2>
                <p className="text-surface-600 dark:text-surface-400">
                  Manage your sent invitations
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {pendingInvites.length === 0 ? (
                <div className="text-center py-8 text-surface-500 dark:text-surface-400">
                  <ApperIcon name="UserPlus" className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No invitations sent yet</p>
                </div>
              ) : (
                pendingInvites.map((invite) => (
                  <motion.div
                    key={invite.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-xl border border-surface-200 dark:border-surface-600"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-3">
                        <p className="font-medium text-surface-800 dark:text-surface-200">
                          {invite.email}
                        </p>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          invite.status === 'accepted' 
                            ? 'bg-accent text-white' 
                            : 'bg-secondary text-white'
                        }`}>
                          {invite.status}
                        </span>
                      </div>
                      <p className="text-sm text-surface-600 dark:text-surface-400">
                        Sent on {invite.sentAt} by {invite.inviter}
                      </p>
                    </div>
                    
                    {invite.status === 'pending' && (
                      <div className="flex items-center space-x-2 mt-3 sm:mt-0">
                        <motion.button
                          onClick={() => resendInvitation(invite.id, invite.email)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
                        >
                          Resend
                        </motion.button>
                        <motion.button
                          onClick={() => revokeInvitation(invite.id, invite.email)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                        >
                          Revoke
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  )
}

export default InvitePage