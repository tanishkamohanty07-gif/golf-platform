'use client'

import { useState, useEffect, useCallback } from 'react'
import { Trash2, Plus, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ScoreManager() {
  const [scores, setScores] = useState([])
  const [form, setForm] = useState({
    score: '',
    score_date: new Date().toISOString().split('T')[0],
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchScores = useCallback(async () => {
    setFetching(true)
    const res = await fetch('/api/scores')
    const data = await res.json()
    if (data.scores) setScores(data.scores)
    setFetching(false)
  }, [])

  useEffect(() => {
    fetchScores()
  }, [fetchScores])

  const handleAdd = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    const res = await fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        score: parseInt(form.score),
        score_date: form.score_date,
      }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || 'Failed to add score')
      return
    }

    setSuccess('Score added!')
    setForm({
      score: '',
      score_date: new Date().toISOString().split('T')[0],
    })
    fetchScores()
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleDelete = async (id) => {
    const res = await fetch(`/api/scores/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setScores(scores.filter((s) => s.id !== id))
    }
  }

  const getScoreColor = (score) => {
    if (score >= 36) return 'text-emerald-400'
    if (score >= 28) return 'text-blue-400'
    if (score >= 20) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreLabel = (score) => {
    if (score >= 36) return 'Excellent'
    if (score >= 28) return 'Good'
    if (score >= 20) return 'Average'
    return 'Below Par'
  }

  const average =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b.score, 0) / scores.length)
      : null

  return (
    <div className="space-y-10">

      {/* Stats */}
      {scores.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: "Scores", value: `${scores.length}/5` },
            { label: "Average", value: average },
            { label: "Best", value: Math.max(...scores.map(s => s.score)) }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl"
            >
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
                {item.label}
              </p>
              <p className="text-3xl font-semibold text-white">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Score */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08]"
      >
        <div className="flex items-center mb-6">
          <h3 className="text-lg font-semibold">Add New Score</h3>
          <span className="ml-auto text-xs text-gray-500">
            {scores.length}/5 used
          </span>
        </div>

        <form onSubmit={handleAdd} className="grid md:grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Score (1–45)"
            value={form.score}
            onChange={(e) => setForm({ ...form, score: e.target.value })}
            className="bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 transition"
            required
          />

          <input
            type="date"
            value={form.score_date}
            onChange={(e) => setForm({ ...form, score_date: e.target.value })}
            className="bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 transition"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:scale-105 transition"
          >
            {loading ? "Adding..." : "Add Score"}
          </button>
        </form>

        {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}
        {success && <p className="text-emerald-400 mt-3 text-sm">{success}</p>}
      </motion.div>

      {/* Score List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
      >
        <h3 className="mb-6 text-lg font-semibold">Your Last 5 Scores</h3>

        {fetching ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 bg-white/[0.03] rounded-lg animate-pulse" />
            ))}
          </div>
        ) : scores.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">
            No scores yet.
          </p>
        ) : (
          <div className="space-y-3">
            {scores.map((s, index) => (
              <motion.div
                key={s.id}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 text-xs">#{index + 1}</span>

                  <div>
                    <p className={`text-xl font-semibold ${getScoreColor(s.score)}`}>
                      {s.score} pts
                    </p>
                    <p className="text-xs text-gray-500">
                      {getScoreLabel(s.score)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(s.id)}
                  className="text-gray-500 hover:text-red-400 transition"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}