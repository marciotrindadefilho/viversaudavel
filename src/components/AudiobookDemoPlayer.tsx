// src/components/AudiobookDemoPlayer.tsx

'use client';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useRef } from 'react';

export default function AudiobookDemoPlayer({ src }: { src: string }) {
  const audioRef = useRef<any>(null);

  const handlePlay = () => {
    const player = audioRef.current?.audio?.current;
    if (player) {
      setTimeout(() => {
        if (!player.paused && player.currentTime > 0 && player.currentTime < 35) {
          player.pause();
        }
      }, 30000); // pausa após 30 segundos
    }
  };

  return (
    <AudioPlayer
      ref={audioRef}
      src={src}
      onPlay={handlePlay}
      autoPlayAfterSrcChange={false}
      showJumpControls={false}
      style={{ borderRadius: '10px' }}
    />
  );
}

