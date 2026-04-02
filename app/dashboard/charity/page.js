import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import CharityClient from './CharityClient'

export default async function CharityPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: charities } = await supabase
    .from('charities')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('name', { ascending: true })

  return (
    <CharityClient
      user={user}
      profile={profile}
      charities={charities || []}
    />
  )
}