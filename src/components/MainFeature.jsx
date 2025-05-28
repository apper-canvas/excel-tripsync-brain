import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { format, addDays } from 'date-fns'

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [currentTrip, setCurrentTrip] = useState({
    name: 'Tokyo Adventure',
    destination: 'Tokyo, Japan',
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    participants: [
      { id: 1, name: 'You', avatar: '👤', isCreator: true },
      { id: 2, name: 'Sarah', avatar: '👩', isCreator: false },
      { id: 3, name: 'Mike', avatar: '👨', isCreator: false }
    ]
  })

  const [activities, setActivities] = useState([
    {
      id: 1,
      name: 'Senso-ji Temple Visit',
      time: '10:00 AM',
      date: format(new Date(), 'yyyy-MM-dd'),
      location: 'Asakusa, Tokyo',
      votes: { up: 3, down: 0 },
      suggestedBy: 'Sarah',
      status: 'confirmed'
    },
    {
      id: 2,
      name: 'Shibuya Crossing',
      time: '3:00 PM',
      date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      location: 'Shibuya, Tokyo',
      votes: { up: 2, down: 1 },
      suggestedBy: 'Mike',
      status: 'pending'
    }
  ])

  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Flight tickets', amount: 800, paidBy: 'You', splitBetween: 3, category: 'Transport' },
    { id: 2, name: 'Hotel booking', amount: 450, paidBy: 'Sarah', splitBetween: 3, category: 'Accommodation' }
  ])

  const [newActivity, setNewActivity] = useState({
    name: '',
    time: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    location: ''
  })

  const [newExpense, setNewExpense] = useState({
    name: '',
    amount: '',
    category: 'General'
  })

  const [recentUpdates, setRecentUpdates] = useState([
    { id: 1, action: 'Sarah added Senso-ji Temple Visit', time: '2 hours ago', type: 'activity' },
    { id: 2, action: 'Mike voted on Shibuya Crossing', time: '4 hours ago', type: 'vote' },
    { id: 3, action: 'You added hotel booking expense', time: '1 day ago', type: 'expense' }
  ])

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const perPersonCost = totalExpenses / currentTrip.participants.length

  const addActivity = () => {
    if (!newActivity.name || !newActivity.time || !newActivity.location) {
      toast.error('Please fill in all activity details')
      return
    }

    const activity = {
      id: Date.now(),
      ...newActivity,
      votes: { up: 0, down: 0 },
      suggestedBy: 'You',
      status: 'pending'
    }

    setActivities(prev => [...prev, activity])
    setNewActivity({ name: '', time: '', date: format(new Date(), 'yyyy-MM-dd'), location: '' })
    
    const update = {
      id: Date.now(),
      action: `You suggested ${activity.name}`,
      time: 'just now',
      type: 'activity'
    }
    setRecentUpdates(prev => [update, ...prev.slice(0, 4)])
    
    toast.success('Activity added successfully!')
  }

  const voteOnActivity = (activityId, voteType) => {
    setActivities(prev => prev.map(activity => {
      if (activity.id === activityId) {
        const newVotes = { ...activity.votes }
        newVotes[voteType] = newVotes[voteType] + 1
        return { ...activity, votes: newVotes }
      }
      return activity
    }))

    const update = {
      id: Date.now(),
      action: `You ${voteType === 'up' ? 'liked' : 'disliked'} an activity`,
      time: 'just now',
      type: 'vote'
    }
    setRecentUpdates(prev => [update, ...prev.slice(0, 4)])
    
    toast.success(`Vote ${voteType === 'up' ? '👍' : '👎'} recorded!`)
  }

  const addExpense = () => {
    if (!newExpense.name || !newExpense.amount) {
      toast.error('Please fill in expense details')
      return
    }

    const expense = {
      id: Date.now(),
      ...newExpense,
      amount: parseFloat(newExpense.amount),
      paidBy: 'You',
      splitBetween: currentTrip.participants.length
    }

    setExpenses(prev => [...prev, expense])
    setNewExpense({ name: '', amount: '', category: 'General' })
    
    const update = {
      id: Date.now(),
      action: `You added ${expense.name} expense`,
      time: 'just now',
      type: 'expense'
    }
    setRecentUpdates(prev => [update, ...prev.slice(0, 4)])
    
    toast.success('Expense added successfully!')
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'itinerary', label: 'Itinerary', icon: 'Calendar' },
    { id: 'budget', label: 'Budget', icon: 'DollarSign' },
    { id: 'notes', label: 'Notes', icon: 'StickyNote' }
  ]

  return (
    <div className="space-y-6">
      {/* Trip Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-border"
      >
        <div className="bg-white dark:bg-surface-800 p-6 md:p-8 rounded-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-200">
                {currentTrip.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-surface-600 dark:text-surface-400">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="MapPin" className="w-4 h-4" />
                  <span>{currentTrip.destination}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Calendar" className="w-4 h-4" />
                  <span>{format(currentTrip.startDate, 'MMM dd')} - {format(currentTrip.endDate, 'MMM dd, yyyy')}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                {currentTrip.participants.map((participant) => (
                  <motion.div
                    key={participant.id}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-medium border-2 border-white dark:border-surface-800 shadow-soft"
                  >
                    {participant.avatar}
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-accent text-white px-4 py-2 rounded-xl font-medium shadow-soft hover:shadow-lg transition-all duration-200"
              >
                <ApperIcon name="UserPlus" className="w-4 h-4" />
                <span className="hidden sm:inline">Invite</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-surface-100 dark:bg-surface-800 p-1 rounded-2xl overflow-x-auto">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white dark:bg-surface-700 text-primary shadow-soft'
                : 'text-surface-600 dark:text-surface-400 hover:text-primary hover:bg-white hover:bg-opacity-50'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <ApperIcon name={tab.icon} className="w-4 h-4" />
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Recent Updates */}
            <div className="lg:col-span-2">
              <div className="activity-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200">Recent Updates</h3>
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse-soft"></div>
                </div>
                <div className="space-y-3">
                  {recentUpdates.map((update) => (
                    <motion.div
                      key={update.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center space-x-3 p-3 bg-surface-50 dark:bg-surface-700 rounded-xl"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        update.type === 'activity' ? 'bg-primary' :
                        update.type === 'vote' ? 'bg-secondary' : 'bg-accent'
                      }`}>
                        <ApperIcon 
                          name={update.type === 'activity' ? 'Calendar' : update.type === 'vote' ? 'ThumbsUp' : 'DollarSign'} 
                          className="w-4 h-4 text-white" 
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-surface-700 dark:text-surface-300 text-sm">{update.action}</p>
                        <p className="text-surface-500 dark:text-surface-500 text-xs">{update.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="activity-card">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name="Users" className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-surface-800 dark:text-surface-200">{currentTrip.participants.length}</h4>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">Participants</p>
                </div>
              </div>

              <div className="activity-card">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name="Calendar" className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-surface-800 dark:text-surface-200">{activities.length}</h4>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">Activities</p>
                </div>
              </div>

              <div className="activity-card">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name="DollarSign" className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-surface-800 dark:text-surface-200">${perPersonCost.toFixed(0)}</h4>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">Per Person</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'itinerary' && (
          <motion.div
            key="itinerary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Add Activity Form */}
            <div className="activity-card">
              <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200 mb-4">Suggest New Activity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Activity name"
                  value={newActivity.name}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, name: e.target.value }))}
                  className="px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
                <input
                  type="time"
                  value={newActivity.time}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, time: e.target.value }))}
                  className="px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
                <input
                  type="date"
                  value={newActivity.date}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, date: e.target.value }))}
                  className="px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newActivity.location}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, location: e.target.value }))}
                  className="px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
              </div>
              <motion.button
                onClick={addActivity}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-medium shadow-soft hover:shadow-lg transition-all duration-200"
              >
                Add Activity
              </motion.button>
            </div>

            {/* Activities List */}
            <div className="space-y-4">
              {activities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="activity-card"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-surface-800 dark:text-surface-200">{activity.name}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          activity.status === 'confirmed' ? 'bg-accent text-white' : 'bg-secondary text-white'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-surface-600 dark:text-surface-400 text-sm">
                        <div className="flex items-center space-x-1">
                          <ApperIcon name="Clock" className="w-4 h-4" />
                          <span>{activity.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ApperIcon name="Calendar" className="w-4 h-4" />
                          <span>{format(new Date(activity.date), 'MMM dd')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ApperIcon name="MapPin" className="w-4 h-4" />
                          <span>{activity.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ApperIcon name="User" className="w-4 h-4" />
                          <span>by {activity.suggestedBy}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <motion.button
                        onClick={() => voteOnActivity(activity.id, 'up')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="vote-button bg-accent text-white"
                      >
                        <ApperIcon name="ThumbsUp" className="w-4 h-4" />
                      </motion.button>
                      <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                        {activity.votes.up}
                      </span>
                      <motion.button
                        onClick={() => voteOnActivity(activity.id, 'down')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="vote-button bg-red-500 text-white"
                      >
                        <ApperIcon name="ThumbsDown" className="w-4 h-4" />
                      </motion.button>
                      <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                        {activity.votes.down}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'budget' && (
          <motion.div
            key="budget"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Budget Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="activity-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <ApperIcon name="DollarSign" className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-surface-800 dark:text-surface-200">${totalExpenses}</h4>
                <p className="text-surface-600 dark:text-surface-400">Total Expenses</p>
              </div>
              
              <div className="activity-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <ApperIcon name="Users" className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-surface-800 dark:text-surface-200">${perPersonCost.toFixed(2)}</h4>
                <p className="text-surface-600 dark:text-surface-400">Per Person</p>
              </div>
              
              <div className="activity-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <ApperIcon name="Receipt" className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-surface-800 dark:text-surface-200">{expenses.length}</h4>
                <p className="text-surface-600 dark:text-surface-400">Expenses</p>
              </div>
            </div>

            {/* Add Expense Form */}
            <div className="activity-card">
              <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200 mb-4">Add New Expense</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Expense name"
                  value={newExpense.name}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, name: e.target.value }))}
                  className="px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
                <input
                  type="number"
                  placeholder="Amount ($)"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                  className="px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value }))}
                  className="px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                >
                  <option value="General">General</option>
                  <option value="Transport">Transport</option>
                  <option value="Accommodation">Accommodation</option>
                  <option value="Food">Food</option>
                  <option value="Activities">Activities</option>
                </select>
              </div>
              <motion.button
                onClick={addExpense}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-medium shadow-soft hover:shadow-lg transition-all duration-200"
              >
                Add Expense
              </motion.button>
            </div>

            {/* Expenses List */}
            <div className="activity-card">
              <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200 mb-4">Expense Breakdown</h3>
              <div className="space-y-3">
                {expenses.map((expense) => (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="expense-item"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-surface-800 dark:text-surface-200">{expense.name}</h4>
                        <span className="px-2 py-1 text-xs bg-surface-200 dark:bg-surface-600 text-surface-700 dark:text-surface-300 rounded-full">
                          {expense.category}
                        </span>
                      </div>
                      <p className="text-sm text-surface-600 dark:text-surface-400">
                        Paid by {expense.paidBy} • Split {expense.splitBetween} ways
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-surface-800 dark:text-surface-200">${expense.amount}</p>
                      <p className="text-sm text-surface-600 dark:text-surface-400">
                        ${(expense.amount / expense.splitBetween).toFixed(2)} each
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'notes' && (
          <motion.div
            key="notes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="activity-card"
          >
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-surface-200 to-surface-300 dark:from-surface-600 dark:to-surface-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="StickyNote" className="w-12 h-12 text-surface-500 dark:text-surface-400" />
              </div>
              <h3 className="text-xl font-semibold text-surface-800 dark:text-surface-200 mb-2">Shared Notes & To-Dos</h3>
              <p className="text-surface-600 dark:text-surface-400 mb-6">
                Keep track of important reminders, packing lists, and shared ideas.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-medium shadow-soft hover:shadow-lg transition-all duration-200"
              >
                Coming Soon
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature