'use client'

import { useState, useEffect, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import {
  Users,
  Trophy,
  BarChart3,
  CheckCircle,
  XCircle,
  Play,
  RefreshCw,
  Crown,
  Heart,
  AlertCircle,
} from 'lucide-react'
import { motion } from 'framer-motion'

const TABS = ['Overview', 'Users', 'Draws', 'Winners']

export default function AdminClient({ user, profile }) {
  const [activeTab, setActiveTab] = useState('Overview')
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [winners, setWinners] = useState([])
  const [draws, setDraws] = useState([])
  const [loading, setLoading] = useState(false)
  const [drawLoading, setDrawLoading] = useState(false)
  const [drawResult, setDrawResult] = useState(null)

  const fetchStats = useCallback(async () => {
    const res = await fetch('/api/admin/stats')
    const data = await res.json()
    if (data) setStats(data)
  }, [])

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/users')
    const data = await res.json()
    if (data.users) setUsers(data.users)
    setLoading(false)
  }, [])

  const fetchWinners = useCallback(async () => {
    const res = await fetch('/api/admin/winners')
    const data = await res.json()
    if (data.winners) setWinners(data.winners)
  }, [])

  const fetchDraws = useCallback(async () => {
    const res = await fetch('/api/draws')
    const data = await res.json()
    if (data.draw) setDraws([data.draw])
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  useEffect(() => {
    if (activeTab === 'Users') fetchUsers()
    if (activeTab === 'Winners') fetchWinners()
    if (activeTab === 'Draws') fetchDraws()
  }, [activeTab, fetchUsers, fetchWinners, fetchDraws])

  const handleRunDraw = async () => {
    setDrawLoading(true)
    setDrawResult(null)

    const res = await fetch('/api/draws', { method: 'POST' })
    const data = await res.json()

    setDrawLoading(false)

    if (res.ok) {
      setDrawResult({ success: true, numbers: data.drawnNumbers })
      fetchStats()
      fetchDraws()
    } else {
      setDrawResult({ success: false, error: data.error })
    }
  }

  const getStatusBadge = (status) => {
    const map = {
      active: 'bg-purple-500/10 text-purple-400',
      inactive: 'bg-red-500/10 text-red-400',
      pending: 'bg-yellow-500/10 text-yellow-400',
      approved: 'bg-purple-500/10 text-purple-400',
      rejected: 'bg-red-500/10 text-red-400',
      paid: 'bg-blue-500/10 text-blue-400',
    }
    return map[status] || 'bg-gray-500/10 text-gray-400'
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar user={user} profile={profile} />

      <div className="px-6 md:px-12 lg:px-20 py-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-heading flex items-center gap-3">
            <Crown className="text-yellow-400" />
            Admin Panel
          </h1>
          <p className="text-gray-400 mt-2">
            Manage users, draws, and platform activity
          </p>
        </motion.div>

        {/* TABS */}
        <div className="flex gap-2 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm transition ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === 'Overview' && (
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Users', value: stats?.totalUsers },
              { label: 'Subscribers', value: stats?.activeSubscribers },
              { label: 'Prize Pool', value: `£${stats?.prizePool}` },
              { label: 'Pending', value: stats?.pendingWinners },
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
              >
                <p className="text-gray-500 text-xs">{s.label}</p>
                <p className="text-2xl font-semibold mt-2">{s.value || '—'}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* USERS */}
        {activeTab === 'Users' && (
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-500">
                <tr>
                  <th className="text-left py-3">Name</th>
                  <th>Email</th>
                  <th>Plan</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t border-white/10">
                    <td className="py-3">{u.full_name}</td>
                    <td>{u.email}</td>
                    <td>{u.subscription_plan}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(u.subscription_status)}`}>
                        {u.subscription_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* DRAWS */}
        {activeTab === 'Draws' && (
          <div className="space-y-6">

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <h3 className="mb-4 font-semibold">Run Draw</h3>

              <button
                onClick={handleRunDraw}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl"
              >
                {drawLoading ? 'Running...' : 'Run Draw'}
              </button>

              {drawResult?.success && (
                <div className="flex gap-2 mt-4">
                  {drawResult.numbers.map((n) => (
                    <span key={n} className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      {n}
                    </span>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* WINNERS */}
        {activeTab === 'Winners' && (
          <div className="space-y-4">
            {winners.map((w) => (
              <div key={w.id} className="p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                <p className="font-medium">{w.profiles?.full_name}</p>
                <p className="text-gray-400 text-sm">
                  £{w.prize_amount} · {w.match_count} match
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}