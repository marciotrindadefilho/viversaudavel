'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, UserPlus, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function RegistroPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('') // Estado para o telefone
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleRegistro = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Validação de senha
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.')
            return
        }
        if (password.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres.')
            return
        }

        setLoading(true)
        setError('')
        setSuccess(false)

        // Adiciona o telefone aos metadados do usuário no momento do registro
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    phone: phone || null, // Salva o telefone se preenchido, senão salva nulo
                }
            }
        })

        if (error) {
            setError(error.message)
        } else {
            // Mostra a mensagem de sucesso em vez de redirecionar
            setSuccess(true)
        }

        setLoading(false)
    }

    // Se o registro for bem-sucedido, mostra uma mensagem de confirmação
    if (success) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4">
                <div className="w-full max-w-md text-center bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/10">
                    <CheckCircle className="mx-auto w-16 h-16 text-green-400 mb-4" />
                    <h1 className="text-2xl font-bold text-white">Verifique seu E-mail</h1>
                    <p className="text-gray-300 mt-2">
                        Enviamos um link de confirmação para o seu e-mail. Por favor, clique no link para ativar sua conta.
                    </p>
                </div>
            </main>
        )
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4">
            <div className="w-full max-w-md">
                <form 
                    onSubmit={handleRegistro} 
                    className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl w-full space-y-6 shadow-2xl border border-white/10"
                >
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-white">Crie sua Conta</h1>
                        <p className="text-gray-400 mt-2">Comece sua jornada conosco.</p>
                    </div>
                    
                    <div className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Seu melhor e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12"
                        />
                        {/* Campo de telefone adicionado */}
                        <Input
                            type="tel"
                            placeholder="Telefone (Opcional)"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12"
                        />
                        <Input
                            type="password"
                            placeholder="Crie uma senha (mín. 6 caracteres)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12"
                        />
                        <Input
                            type="password"
                            placeholder="Confirme sua senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                                <UserPlus className="w-5 h-5" />
                                <span>Criar Conta</span>
                            </>
                        )}
                    </Button>

                    <p className="text-center text-sm text-gray-400">
                        Já tem uma conta?{' '}
                        <Link href="/entrar" className="font-semibold text-cyan-400 hover:underline">
                            Faça login
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    )
}
