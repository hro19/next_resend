'use client'

import { useState, FormEvent } from 'react'

export default function SendPage() {
  const [status, setStatus] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('送信中...')
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })

      if (response.ok) {
        setStatus('送信成功!')
      } else {
        setStatus('送信失敗')
      }
    } catch (error) {
      setStatus('エラーが発生しました')
      console.error('送信エラー:', error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="名前"
          className="px-4 py-2 text-slate-950 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          className="px-4 py-2 text-slate-950 border border-gray-300 rounded mb-4"
          required
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          送信
        </button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </div>
  )
}