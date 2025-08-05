
"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { toast } from "sonner"

export function useNewsletter() {
  const [loading, setLoading] = useState(false)

  async function inscrever(email: string) {
    setLoading(true)
    const { error } = await supabase.from("NewsletterS").insert({ email })

    if (error) {
      toast.error("E-mail inválido ou já inscrito.")
    } else {
      toast.success("Inscrição realizada com sucesso!")
    }

    setLoading(false)
  }

  return { inscrever, loading }
}
