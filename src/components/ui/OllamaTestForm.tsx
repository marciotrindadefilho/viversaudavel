'use client'

import { useState } from 'react';

export default function OllamaTestForm() {
  const [prompt, setPrompt] = useState('');
  const [resposta, setResposta] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/ollama', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResposta(data.response);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow max-w-lg">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Digite um prompt..."
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Enviar para Ollama
      </button>
      {resposta && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <strong>Resposta:</strong> {resposta}
        </div>
      )}
    </form>
  );
}

