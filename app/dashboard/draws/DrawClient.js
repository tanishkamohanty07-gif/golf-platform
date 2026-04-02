'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { Trophy, RefreshCw, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import { motion, AnimatePresence } from 'framer-motion'
export default function DrawClient({ user, profile }) {
  const [drawData, setDrawData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [revealed, setRevealed] = useState(false)

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

 useEffect(() => {
  if (drawData?.draw) {
    setRevealed(false)
    const timeout = setTimeout(() => setRevealed(true), 800)
    return () => clearTimeout(timeout)
  }
}, [drawData])

  const userScores = drawData?.scores || []
  const hasSubmittedAll = userScores.length >= 5

  const getMatchColor = (count) => {
    if (count >= 5) return 'text-emerald-400'
    if (count >= 4) return 'text-blue-400'
    if (count >= 3) return 'text-yellow-400'
    return 'text-gray-500'
  }

  const getMatchLabel = (count) => {
    if (count >= 5) return '🎉 Jackpot! 5 Match'
    if (count >= 4) return '🥈 4 Number Match'
    if (count >= 3) return '🥉 3 Number Match'
    if (count > 0) return `${count} matched`
    return 'No matches this draw'
  }

  const getPrizeShare = (count) => {
    if (count === 5) return '40%'
    if (count === 4) return '35%'
    if (count === 3) return '25%'
    return null
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar user={user} profile={profile} />

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-white text-3xl font-bold tracking-tight">
            Monthly Draw
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Enter your scores to unlock the draw and win rewards.
          </p>
        </div>

        {loading ? (
          <div className="h-40 bg-white/[0.03] rounded-xl animate-pulse" />
        ) : !hasSubmittedAll ? (

          /* 🔒 LOCKED */
          <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] rounded-2xl p-10 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-white/[0.04] border border-white/[0.08]">
                <Lock size={28} className="text-yellow-400" />
              </div>
            </div>

            <h2 className="text-white text-xl font-semibold mb-2">
              Draw Locked
            </h2>

            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Submit all 5 scores to unlock this month’s draw.
            </p>

            <div className="mt-6 text-xs text-gray-600">
              {userScores.length}/5 scores submitted
            </div>
          </div>

        ) : !drawData?.draw ? (

          /* ❌ NO DRAW */
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-10 text-center">
            <p className="text-white font-semibold mb-2">
              No draw available yet
            </p>
            <p className="text-gray-500 text-sm">
              Results will appear once the draw is conducted.
            </p>
          </div>

        ) : (

          /* ✅ DRAW */
          <div className="space-y-8">

            {/* DRAW NUMBERS */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-semibold text-sm flex items-center gap-2">
                  <Trophy size={16} className="text-yellow-400" />
                  Drawn Numbers
                </h2>
                <span className="text-gray-500 text-xs">
                  Pool: £{drawData.draw.prize_pool_total}
                </span>
              </div>
              
              <AnimatePresence>
  {revealed && (
    <div className="flex gap-4 justify-center flex-wrap">
      {drawData.draw.drawn_numbers.map((num, index) => {
        const matched = drawData.matches?.includes(num)

        return (
          <motion.div
            key={`${num}-${revealed}`} // 🔥 forces re-animation
            initial={{ y: -150, opacity: 0, scale: 0.2 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              delay: index * 0.25,
              duration: 0.6,
              ease: 'easeOut',
            }}
            className={`relative w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-2 ${
              matched
                ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.8)]'
                : 'border-white/10 bg-white/[0.05] text-gray-300'
            }`}
          >
            {num}

            {matched && (
              <motion.div
                className="absolute inset-0 rounded-full border border-emerald-400"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                }}
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )}
</AnimatePresence>
            </div>

            {/* RESULT */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 text-center">
              <p className={`text-lg font-bold ${getMatchColor(drawData.matchCount)}`}>
                {getMatchLabel(drawData.matchCount)}
              </p>

              {getPrizeShare(drawData.matchCount) && (
                <p className="text-gray-400 text-sm mt-2">
                  You win {getPrizeShare(drawData.matchCount)} of prize pool
                </p>
              )}
            </div>

            {/* REFRESH */}
            <button
              onClick={fetchDraw}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-300 text-xs mx-auto"
            >
              <RefreshCw size={12} />
              Refresh
            </button>

          </div>
        )}
      </div>
    </div>
  )
}