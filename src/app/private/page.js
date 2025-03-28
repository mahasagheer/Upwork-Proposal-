// app/private/page.jsx (Server Component)
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import PrivatePageClient from '@/components/PrivatePageClient'

export default async function PrivatePage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  
  if (error || !data?.user) {
    redirect('/login')
  }

  return <PrivatePageClient />
}