'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Crown } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SubscriptionCard({ profile, onUpgrade }) {
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState('monthly')

  const isActive = profile?.subscription_status === 'active'

  const handleUpgrade = async () => {
    setLoading(true)
    await onUpgrade(plan)
    setLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl"
    >
      {/* subtle glow */}
      <div className="absolute inset-0 bg-purple-600/5 blur-3xl opacity-40 rounded-2xl" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-6 relative z-10">
        <Crown size={18} className="text-yellow-400" />
        <h3 className="text-lg font-semibold">Subscription</h3>
      </div>

      {/* ACTIVE STATE */}
      {isActive ? (
        <div className="space-y-4 relative z-10">

          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">Active</span>

            <span className="ml-auto text-xs text-gray-400 capitalize">
              {profile.subscription_plan} plan
            </span>
          </div>

          {/* Highlight box */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
            <p className="text-emerald-300 text-sm">
              Eligible for this month’s draw 🎯
            </p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-white/[0.03] rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">Started</p>
              <p className="text-white text-sm">
                {profile.subscription_start
                  ? new Date(profile.subscription_start).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })
                  : '—'}
              </p>
            </div>

            <div className="bg-white/[0.03] rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">Renews</p>
              <p className="text-white text-sm">
                {profile.subscription_end
                  ? new Date(profile.subscription_end).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })
                  : '—'}
              </p>
            </div>
          </div>
        </div>

      ) : (

        /* INACTIVE STATE */
        <div className="space-y-5 relative z-10">

          <div className="flex items-center gap-2">
            <XCircle size={16} className="text-red-400" />
            <span className="text-red-400 text-sm font-medium">Inactive</span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            Subscribe to enter monthly draws and fund real-world impact.
          </p>

          {/* Plan selector */}
          <div className="grid grid-cols-2 gap-3">

            {['monthly', 'yearly'].map((p) => (
              <motion.button
                whileTap={{ scale: 0.97 }}
                key={p}
                onClick={() => setPlan(p)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  plan === p
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <p className="capitalize font-semibold text-sm">
                  {p}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {p === 'monthly' ? '£9.99 / mo' : '£99.99 / yr'}
                </p>
              </motion.button>
            ))}

          </div>

          {/* CTA */}
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
          >
            {loading ? 'Activating...' : 'Join & Start Impact'}
          </button>

        </div>
      )}
    </motion.div>
  )
}