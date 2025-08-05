'use client'

import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import type { Database } from '@/types/supabase'

type Props = {
  children: React.ReactNode
}

export default function SupabaseProvider({ children }: Props) {
  const [supabaseClient] = useState(() =>
    createPagesBrowserClient<Database>()
  )

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  )
}
