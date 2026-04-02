import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DrawClient from './DrawClient'

export default async function DrawsPage() {
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

  return <DrawClient user={user} profile={profile} />
}