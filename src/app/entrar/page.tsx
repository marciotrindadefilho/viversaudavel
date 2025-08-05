'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, LogIn } from 'lucide-react'
import Link from 'next/link'

export default function EntrarPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError('E-mail ou senha inválidos. Tente novamente.') // Mensagem mais amigável
        } else {
            // Redireciona para a página inicial ou para a página anterior
            router.push('/')
            router.refresh() // Força a atualização do layout para refletir o estado de login
        }

        setLoading(false)
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4">
            <div className="w-full max-w-md">
                <form 
                    onSubmit={handleLogin} 
                    className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl w-full space-y-6 shadow-2xl border border-white/10"
                >
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-white">Acesse sua Conta</h1>
                        <p className="text-gray-400 mt-2">Bem-vindo de volta!</p>
                    </div>
                    
                    <div className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12"
                        />
                        <Input
                            type="password"
                            placeholder="Sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12"
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm text-center border border-red-400/50 bg-red-400/10 py-2 rounded-md">{error}</p>}
                    
                    <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-lg py-6 flex items-center justify-center gap-2" disabled={loading}>
                        {loading ? (
                            <Loader2 className="animate-spin w-6 h-6" />
                        ) : (
                            <>
                                <LogIn className="w-5 h-5" />
                                <span>Entrar</span>
                            </>
                        )}
                    </Button>

                    <p className="text-center text-sm text-gray-400">
                        Não tem uma conta?{' '}
                        <Link href="/registro" className="font-semibold text-cyan-400 hover:underline">
                            Registre-se
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    )
}