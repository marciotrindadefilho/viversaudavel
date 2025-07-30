'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Registro() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErro('')

    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
    })

    if (error) {
      setErro(error.message)
    } else {
      router.push('/')
    }

    setLoading(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 to-black p-4">
      <form onSubmit={handleRegistro} className="bg-white/10 backdrop-blur-md p-8 rounded-lg w-full max-w-md space-y-6 shadow-lg border border-white/20">
        <h1 className="text-2xl font-bold text-white">Crie sua conta</h1>
        <Input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        {erro && <p className="text-red-500 text-sm">{erro}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Criando conta...' : 'Registrar'}
        </Button>
      </form>
    </main>
  )
}
