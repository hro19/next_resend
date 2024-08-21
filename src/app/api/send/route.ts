import { NextResponse } from 'next/server'
import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json()
    const { data, error } = await resend.emails.send({
      from: 'next.js Resendアプリ <onboarding@resend.dev>',
      to: [email],
      subject: `Hello ${name}!`,
      react: EmailTemplate({ firstName: name }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}