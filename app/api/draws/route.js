import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET — fetch latest published draw + user's scores for matching
export async function GET() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get latest published draw
  const { data: draw, error: drawError } = await supabase
    .from('draws')
    .select('*')
    .in('status', ['published', 'completed'])
    .order('draw_date', { ascending: false })
    .limit(1)
    .single()

  if (drawError || !draw) {
    return NextResponse.json({ draw: null, scores: [], matches: [] })
  }

  // Get user scores
  const { data: scores } = await supabase
    .from('scores')
    .select('*')
    .eq('user_id', user.id)
    .order('score_date', { ascending: false })
    .limit(5)

  const userScores = scores?.map((s) => s.score) || []
  const drawnNumbers = draw.drawn_numbers || []

  // Calculate matches
  const matches = userScores.filter((s) => drawnNumbers.includes(s))

  return NextResponse.json({
    draw,
    scores,
    matches,
    matchCount: matches.length,
  })
}

// POST — admin creates a new draw
export async function POST() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Verify admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Generate 5 unique random numbers between 1 and 45
  const generateDrawNumbers = () => {
    const numbers = new Set()
    while (numbers.size < 5) {
      numbers.add(Math.floor(Math.random() * 45) + 1)
    }
    return Array.from(numbers).sort((a, b) => a - b)
  }

  const drawnNumbers = generateDrawNumbers()

  // Get all active subscribers and their scores
  const { data: activeUsers } = await supabase
    .from('profiles')
    .select('id, subscription_status')
    .eq('subscription_status', 'active')

  const activeUserIds = activeUsers?.map((u) => u.id) || []

  // Calculate prize pool (mock — based on subscriber count)
  const pricePerUser = 9.99
  const totalPool = activeUserIds.length * pricePerUser
  const jackpot = parseFloat((totalPool * 0.4).toFixed(2))

  // Create the draw
  const { data: draw, error } = await supabase
    .from('draws')
    .insert({
      draw_date: new Date().toISOString().split('T')[0],
      drawn_numbers: drawnNumbers,
      status: 'published',
      jackpot_amount: jackpot,
      prize_pool_total: parseFloat(totalPool.toFixed(2)),
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Find and record winners
  if (activeUserIds.length > 0) {
    const { data: allScores } = await supabase
      .from('scores')
      .select('user_id, score')
      .in('user_id', activeUserIds)

    // Group scores by user
    const scoresByUser = {}
    allScores?.forEach((s) => {
      if (!scoresByUser[s.user_id]) scoresByUser[s.user_id] = []
      scoresByUser[s.user_id].push(s.score)
    })

    const winnersToInsert = []

    Object.entries(scoresByUser).forEach(([userId, userScores]) => {
      const matched = userScores.filter((s) => drawnNumbers.includes(s))
      const matchCount = matched.length

      if (matchCount >= 3) {
        let prizeAmount = 0
        if (matchCount === 5) prizeAmount = jackpot
        else if (matchCount === 4) prizeAmount = parseFloat((totalPool * 0.35).toFixed(2))
        else if (matchCount === 3) prizeAmount = parseFloat((totalPool * 0.25).toFixed(2))

        winnersToInsert.push({
          draw_id: draw.id,
          user_id: userId,
          match_count: matchCount,
          prize_amount: prizeAmount,
          matched_numbers: matched,
          verification_status: 'pending',
        })
      }
    })

    if (winnersToInsert.length > 0) {
      await supabase.from('winners').insert(winnersToInsert)
    }
  }

  return NextResponse.json({ draw, drawnNumbers }, { status: 201 })
}