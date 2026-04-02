'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import ScoreManager from '@/components/ScoreManager'
import SubscriptionCard from '@/components/SubscriptionCard'
import { motion } from 'framer-motion'
import { Trophy, Heart, TrendingUp, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function DashboardClient({ user, profile: initialProfile, charity }) {
  const [profile, setProfile] = useState(initialProfile)

  const handleUpgrade = async (plan) => {
    const res = await fetch('/api/subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    })

    if (res.ok) {
      setProfile({
        ...profile,
        subscription_status: 'active',
        subscription_plan: plan,
      })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar user={user} profile={profile} />

      <div className="px-6 md:px-12 lg:px-20 py-10">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading leading-tight">
            Welcome back,
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text ml-2">
              {profile?.full_name?.split(' ')[0] || 'Golfer'}
            </span>
          </h1>
          <p className="text-gray-400 mt-3">
            Track your performance. Win rewards. Create impact.
          </p>
        </motion.div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: 'Subscription',
              value: profile?.subscription_plan || 'None',
              status: profile?.subscription_status,
            },
            {
              title: 'Charity',
              value: `${profile?.charity_contribution_percent || 10}%`,
              sub: charity?.name || 'Not selected',
            },
            {
              title: 'Draw Wins',
              value: '0',
              sub: 'So far',
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <p className="text-gray-500 text-xs uppercase">{card.title}</p>
              <h3 className="text-2xl mt-2 font-semibold">{card.value}</h3>
              <p className="text-gray-500 text-xs mt-1">{card.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-purple-400" />
                <h2 className="text-sm uppercase tracking-wider text-gray-400">
                  Score Management
                </h2>
              </div>
              <ScoreManager />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            <SubscriptionCard profile={profile} onUpgrade={handleUpgrade} />

            {/* Charity */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <h3 className="mb-4 text-sm uppercase text-gray-400">Your Charity</h3>

              {charity ? (
                <>
                  <p className="text-lg font-semibold">{charity.name}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {profile?.charity_contribution_percent}% contribution
                  </p>

                  <Link
                    href="/dashboard/charity"
                    className="mt-4 inline-flex items-center text-sm text-gray-400 hover:text-white"
                  >
                    Change charity <ChevronRight size={14} />
                  </Link>
                </>
              ) : (
                <Link
                  href="/dashboard/charity"
                  className="text-sm text-purple-400 hover:text-white"
                >
                  Choose a charity →
                </Link>
              )}
            </div>

            {/* Draw */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <h3 className="mb-4 text-sm uppercase text-gray-400">Monthly Draw</h3>

              <p className="text-gray-400 text-sm mb-4">
                {profile?.subscription_status === 'active'
                  ? 'You are entered in this month’s draw.'
                  : 'Subscribe to participate.'}
              </p>

              <Link
                href="/dashboard/draws"
                className="text-sm text-purple-400 hover:text-white"
              >
                View draw →
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}