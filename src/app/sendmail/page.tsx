'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Zodスキーマの定義
const schema = z.object({
  name: z.string().min(1, { message: '名前は必須です' }),
  email: z.string().email({ message: '有効なメールアドレスを入力してください' }),
})

type FormData = z.infer<typeof schema>

export default function SendPage() {
  const [status, setStatus] = useState<string>('')
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('送信中...')
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
        <input
          {...register('name')}
          placeholder="名前"
          className="px-4 py-2 text-slate-950 border border-gray-300 rounded mb-1"
        />
        {errors.name && <p className="text-red-500 mb-4">{errors.name.message}</p>}
        
        <input
          {...register('email')}
          placeholder="メールアドレス"
          className="px-4 py-2 text-slate-950 border border-gray-300 rounded mb-1"
        />
        {errors.email && <p className="text-red-500 mb-4">{errors.email.message}</p>}
        
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