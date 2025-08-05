'use client'

import type { Database } from '@/types/supabase'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Star, Headphones } from 'lucide-react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

type Produto = Database['public']['Tables']['produtos']['Row'] & {
    duracao?: string | null;
    avaliacao?: number | null;
    ouvintes?: number | null;
    audio_url?: string | null;
};

export default function AudiobookCard({ audiobook }: { audiobook: Produto }) {
    return (
        <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-56 w-full">
                <Image
                    src={audiobook.imagem || '/placeholder.svg'}
                    alt={audiobook.titulo || 'Capa do Audiobook'}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-yellow-400 text-black shadow-md border-none">
                    Audiobook
                </Badge>
            </div>
            <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 flex-grow">{audiobook.titulo}</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" /> {audiobook.duracao || 'N/A'}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-yellow-400" /> {audiobook.avaliacao || 'N/A'}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Headphones className="w-4 h-4" /> {audiobook.ouvintes || 'N/A'}
                    </div>
                </div>
                {audiobook.audio_url && (
                    <div className="mt-auto pt-4">
                       <AudioPlayer 
                         src={audiobook.audio_url} 
                         className="rounded-xl"
                         layout="horizontal-reverse"
                         showJumpControls={false}
                         customAdditionalControls={[]}
                       />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
