'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { Heart, Search, CheckCircle, Star, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CharityClient({ user, profile, charities }) {
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState(profile?.charity_id || null)
  const [contribution, setContribution] = useState(
    profile?.charity_contribution_percent || 10
  )
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const filtered = charities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description?.toLowerCase().includes(search.toLowerCase())
  )

  const featured = filtered.filter((c) => c.is_featured)
  const others = filtered.filter((c) => !c.is_featured)

  const handleSave = async () => {
    if (!selectedId) {
      setError('Please select a charity first.')
      return
    }

    setSaving(true)
    setError('')

    const res = await fetch('/api/charity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        charity_id: selectedId,
        contribution_percent: contribution,
      }),
    })

    const data = await res.json()
    setSaving(false)

    if (!res.ok) {
      setError(data.error || 'Failed to save charity selection.')
      return
    }

    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      router.push('/dashboard')
      router.refresh()
    }, 1500)
  }

  const selectedCharity = charities.find((c) => c.id === selectedId)

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar user={user} profile={profile} />

      <div className="px-6 md:px-12 lg:px-20 py-10 max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading leading-tight">
            Choose your
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text ml-2">
              impact
            </span>
          </h1>
          <p className="text-gray-400 mt-3">
            Your subscription directly funds real-world change.
          </p>
        </motion.div>

        {/* SELECTED SUMMARY */}
        {selectedCharity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 rounded-2xl border border-purple-500/20 bg-purple-500/10 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <CheckCircle size={18} className="text-purple-400" />
              <div>
                <p className="font-semibold">{selectedCharity.name}</p>
                <p className="text-sm text-gray-400">
                  {contribution}% of your subscription will be donated
                </p>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving || success}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-semibold hover:scale-105 transition"
            >
              {success ? '✓ Saved' : saving ? 'Saving...' : 'Confirm Selection'}
            </button>
          </motion.div>
        )}

        {/* CONTRIBUTION */}
        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] mb-8">
          <div className="flex justify-between mb-4">
            <h3 className="flex items-center gap-2 text-sm uppercase text-gray-400">
              <Heart size={14} className="text-pink-400" />
              Contribution
            </h3>
            <span className="text-xl font-semibold text-purple-400">
              {contribution}%
            </span>
          </div>

          <input
            type="range"
            min={10}
            max={100}
            step={5}
            value={contribution}
            onChange={(e) => setContribution(parseInt(e.target.value))}
            className="w-full accent-purple-500"
          />

          <p className="text-sm text-gray-400 mt-3">
            You contribute £{((9.99 * contribution) / 100).toFixed(2)} monthly.
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
          <input
            type="text"
            placeholder="Search charities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:border-purple-500 transition"
          />
        </div>

        {/* FEATURED */}
        {featured.length > 0 && (
          <div className="mb-10">
            <h2 className="mb-4 text-sm uppercase text-gray-400 flex items-center gap-2">
              <Star size={14} className="text-yellow-400" />
              Featured
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {featured.map((c) => (
                <CharityCard
                  key={c.id}
                  charity={c}
                  selected={selectedId === c.id}
                  onSelect={() => setSelectedId(c.id)}
                  featured
                />
              ))}
            </div>
          </div>
        )}

        {/* ALL */}
        <div className="grid md:grid-cols-2 gap-6">
          {others.map((c) => (
            <CharityCard
              key={c.id}
              charity={c}
              selected={selectedId === c.id}
              onSelect={() => setSelectedId(c.id)}
            />
          ))}
        </div>

        {/* SAVE */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={handleSave}
            disabled={!selectedId}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-semibold hover:scale-105 transition"
          >
            Save Selection
          </button>
        </div>
      </div>
    </div>
  )
}

/* CARD */
function CharityCard({ charity, selected, onSelect, featured }) {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      onClick={onSelect}
      className={`text-left w-full p-5 rounded-2xl border transition-all ${
        selected
          ? 'border-purple-500 bg-purple-500/10'
          : 'border-white/10 bg-white/[0.03] hover:border-white/20'
      }`}
    >
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">{charity.name}</h3>
        {selected && <CheckCircle size={16} className="text-purple-400" />}
      </div>

      {charity.image_url && (
        <div
          className="h-28 rounded-lg mb-3 bg-cover bg-center"
          style={{ backgroundImage: `url(${charity.image_url})` }}
        />
      )}

      <p className="text-sm text-gray-400 line-clamp-2">
        {charity.description}
      </p>

      {featured && (
        <span className="text-xs mt-3 inline-block text-yellow-400">
          Featured
        </span>
      )}
    </motion.button>
  )
}