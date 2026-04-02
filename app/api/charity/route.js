import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET — fetch all charities
export async function GET() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('charities')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('name', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ charities: data })
}

// POST — user selects a charity
export async function POST(request) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { charity_id, contribution_percent } = await request.json()

  if (!charity_id) {
    return NextResponse.json(
      { error: 'Charity ID is required' },
      { status: 400 }
    )
  }

  if (
    contribution_percent < 10 ||
    contribution_percent > 100
  ) {
    return NextResponse.json(
      { error: 'Contribution must be between 10% and 100%' },
      { status: 400 }
    )
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      charity_id,
      charity_contribution_percent: contribution_percent,
    })
    .eq('id', user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}