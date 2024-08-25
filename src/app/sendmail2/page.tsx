'use client'

import { useState } from 'react'

export default function SendMailPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSendMail = async () => {
    setStatus('sending');
    setMessage('Sending email...');

    try {
      const response = await fetch('/api/sendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'jatain19@gmail.com',
          subject: 'Test Email from Next.js',
          body: 'This is a test email sent from a Next.js application.'
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(`Email sent successfully. Message ID: ${result.messageId}`);
      } else {
        setStatus('error');
        setMessage(`Failed to send email: ${result.error}`);
      }
    } catch (error) {
      setStatus('error');
      setMessage(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Send Test Email</h1>
      <button 
        onClick={handleSendMail}
        disabled={status === 'sending'}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending...' : 'Send Test Email'}
      </button>
      {message && (
        <p className={`mt-4 ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  )
}