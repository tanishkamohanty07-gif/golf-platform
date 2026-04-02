import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const { count: activeSubscribers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('subscription_status', 'active')

  const { count: totalDraws } = await supabase
    .from('draws')
    .select('*', { count: 'exact', head: true })

  const { count: pendingWinners } = await supabase
    .from('winners')
    .select('*', { count: 'exact', head: true })
    .eq('verification_status', 'pending')

  const prizePool = (activeSubscribers || 0) * 9.99

  return NextResponse.json({
    totalUsers: totalUsers || 0,
    activeSubscribers: activeSubscribers || 0,
    totalDraws: totalDraws || 0,
    pendingWinners: pendingWinners || 0,
    prizePool: parseFloat(prizePool.toFixed(2)),
  })
}