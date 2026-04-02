'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { Trophy, Star, RefreshCw, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DrawClient({ user, profile }) {
  const [drawData, setDrawData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchDraw = async () => {
    setLoading(true)
    const res = await fetch('/api/draws')
    const data = await res.json()
    setDrawData(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchDraw()
  }, [])

  const getMatchColor = (count) => {
    if (count >= 5) return 'text-emerald-400'
    if (count >= 4) return 'text-blue-400'
    if (count >= 3) return 'text-yellow-400'
    return 'text-gray-500'
  }

  const getMatchLabel = (count) => {
    if (count >= 5) return '🎉 Jackpot! 5 Match'
    if (count >= 4) return '🥈 4 Match'
    if (count >= 3) return '🥉 3 Match'
    if (count > 0) return `${count} matched`
    return 'No matches this draw'
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar user={user} profile={profile} />

      <div className="px-6 md:px-12 lg:px-20 py-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading">
            Monthly Draw
          </h1>
          <p className="text-gray-400 mt-2">
            Match your scores with the draw and win rewards.
          </p>
        </motion.div>

        {/* PRIZE TIERS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { label: '5 Match', value: '40%' },
            { label: '4 Match', value: '35%' },
            { label: '3 Match', value: '25%' },
          ].map((tier, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] text-center"
            >
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                {tier.value}
              </p>
              <p className="text-gray-500 text-sm mt-2">{tier.label}</p>
            </motion.div>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-40 bg-white/[0.03] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : !drawData?.draw ? (
          <div className="p-12 text-center border border-white/10 rounded-2xl bg-white/[0.03]">
            <AlertCircle size={32} className="mx-auto text-gray-500 mb-4" />
            <p className="text-lg font-semibold">No draw yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Wait for the admin to publish the draw.
            </p>
          </div>
        ) : (
          <div className="space-y-10">

            {/* DRAW NUMBERS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="flex justify-between mb-8">
                <h2 className="flex items-center gap-2 text-sm uppercase text-gray-400">
                  <Trophy size={16} className="text-yellow-400" />
                  Draw Numbers
                </h2>

                <p className="text-gray-500 text-sm">
                  £{drawData.draw.prize_pool_total}
                </p>
              </div>

              <div className="flex justify-center gap-4 flex-wrap">
                {drawData.draw.drawn_numbers.map((num) => {
                  const matched = drawData.matches?.includes(num)

                  return (
                    <motion.div
                      key={num}
                      whileHover={{ scale: 1.1 }}
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold border transition-all ${
                        matched
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-transparent'
                          : 'border-white/10 bg-white/[0.03]'
                      }`}
                    >
                      {num}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* USER SCORES */}
            <motion.div className="p-8 rounded-2xl border border-white/10 bg-white/[0.03]">
              <h2 className="text-sm uppercase text-gray-400 mb-6 flex items-center gap-2">
                <Star size={16} className="text-purple-400" />
                Your Scores
              </h2>

              <div className="flex justify-center gap-4 flex-wrap mb-6">
                {drawData.scores?.map((s) => {
                  const matched = drawData.matches?.includes(s.score)

                  return (
                    <motion.div
                      key={s.id}
                      whileHover={{ scale: 1.1 }}
                      className={`w-16 h-16 rounded-full flex items-center justify-center font-bold ${
                        matched
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                          : 'bg-white/[0.03] border border-white/10 text-gray-400'
                      }`}
                    >
                      {s.score}
                    </motion.div>
                  )
                })}
              </div>

              {/* RESULT */}
              <div className="text-center p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                <p className={`text-xl font-semibold ${getMatchColor(drawData.matchCount)}`}>
                  {getMatchLabel(drawData.matchCount)}
                </p>
              </div>
            </motion.div>

            {/* REFRESH */}
            <button
              onClick={fetchDraw}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition mx-auto"
            >
              <RefreshCw size={14} />
              Refresh
            </button>

          </div>
        )}
      </div>
    </div>
  )
}