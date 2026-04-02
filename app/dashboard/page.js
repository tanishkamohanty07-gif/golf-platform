import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch charity only if exists
  let charity = null

  if (profile?.charity_id) {
    const { data } = await supabase
      .from('charities')
      .select('*')
      .eq('id', profile.charity_id)
      .single()

    charity = data
  }

  return (
    <DashboardClient
      user={user}
      profile={profile}
      charity={charity}
    />
  )
}