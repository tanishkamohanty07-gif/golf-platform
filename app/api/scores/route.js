import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .eq('user_id', user.id)
    .order('score_date', { ascending: false })
    .limit(5)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ scores: data })
}

export async function POST(request) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { score, score_date } = body

  if (!score || score < 1 || score > 45) {
    return NextResponse.json(
      { error: 'Score must be between 1 and 45' },
      { status: 400 }
    )
  }

  if (!score_date) {
    return NextResponse.json(
      { error: 'Score date is required' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('scores')
    .insert({
      user_id: user.id,
      score: parseInt(score),
      score_date,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ score: data }, { status: 201 })
}