"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNewsletter } from "@/app/hooks/useNewsletter"
import { FaWhatsapp } from "react-icons/fa"

export default function Footer() {
  const [email, setEmail] = useState("")
  const { inscrever, loading } = useNewsletter()

  return (
    <footer id="contato" className="bg-black text-white py-12 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo e WhatsApp */}
          <div className="space-y-4">
            <Link href="/" aria-label="Voltar à página inicial">
              <Image
                src="/img2.png"
                alt="Viver Saudável - Voltar à página inicial"
                width={160}
                height={36}
                className="cursor-pointer transition-opacity hover:opacity-80"
              />
            </Link>
            <a
              href="https://wa.me/5583999105011"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 text-sm"
            >
              <FaWhatsapp /> Fale conosco no WhatsApp
            </a>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-green-400 font-semibold mb-4">Institucional</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="text-gray-300 hover:text-white">Nosso Blog</Link></li>
              <li><Link href="/valores" className="text-gray-300 hover:text-white">Nossos Valores</Link></li>
              <li><Link href="/depoimentos" className="text-gray-300 hover:text-white">Depoimentos</Link></li>
              <li><Link href="/missao" className="text-gray-300 hover:text-white">Nossa Misssão</Link></li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-green-400 font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/e-books/biblioteca" className="text-gray-300 hover:text-white">Cardiorrespiratória</Link></li>
              <li><Link href="/audiobooks/biblioteca" className="text-gray-300 hover:text-white">Nutrição</Link></li>
              <li><Link href="/audiobooks/biblioteca" className="text-gray-300 hover:text-white">Saúde Mental</Link></li>
              <li><Link href="/e-books/biblioteca" className="text-gray-300 hover:text-white">Prevenção</Link></li>
            </ul>
          </div>

          {/* Contato e Newsletter */}
          <div>
            <h3 className="text-green-400 font-semibold mb-4">Contato</h3>
            <div className="space-y-2 text-sm text-gray-300 mb-4">
              <p>📍 João Pessoa, PB</p>
              <p>📞 (83) 9 9910-5011</p>
              <p>✉️ contato@viversaudavel.com</p>
            </div>
            <div className="space-y-3">
              <h4 className="text-green-400 font-medium">Newsletter</h4>
              <p className="text-xs text-gray-400">Receba dicas de saúde semanalmente</p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 text-sm"
                />
                <Button
                  onClick={() => inscrever(email)}
                  disabled={loading || !email}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm"
                >
                  OK
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 Viver Saudável, João Pessoa-PB. Todos os direitos reservados.</p>
          <div className="flex justify-center flex-wrap gap-4 text-xs text-gray-500 mt-2">
            <Link href="/termos" className="hover:text-white">Termos de Uso</Link>
            <Link href="/privacidade" className="hover:text-white">Política de Privacidade</Link>
            <Link href="/cookies" className="hover:text-white">Cookies</Link>
            <Link href="/sobre" className="hover:text-white">Sobre</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
