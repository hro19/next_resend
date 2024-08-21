'use client'

import { useState } from 'react'

export default function SendPage() {
  const [status, setStatus] = useState<string>('')

  const handleSend = async () => {
    setStatus('送信中...')
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Hello from the client!' }),
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
      <button 
        onClick={handleSend}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        送信ボタン
      </button>
      {status && <p className="mt-4">{status}</p>}
    </div>
  )
}