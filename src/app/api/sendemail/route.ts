import { SESClient, SendEmailCommand, SESClientConfig } from "@aws-sdk/client-ses";
import { NextRequest, NextResponse } from 'next/server';

// SESクライアントの設定
const sesConfig: SESClientConfig = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ''
  }
};

// SESクライアントの初期化
const sesClient = new SESClient(sesConfig);

export async function POST(request: NextRequest) {
  try {
    // リクエストボディからデータを取得（必要に応じて）
    const { to, subject, body } = await request.json() as {
      to?: string;
      subject?: string;
      body?: string;
    };

    const params = {
      Destination: { 
        ToAddresses: [to || process.env.DEFAULT_RECIPIENT_EMAIL || '']
      },
      Message: {
        Body: {
          Text: { Data: body || "This is a test email from Amazon SES" }
        },
        Subject: { Data: subject || "Test Email" }
      },
      Source: process.env.SENDER_EMAIL || ''
    };

    const command = new SendEmailCommand(params);
    const result = await sesClient.send(command);

    return NextResponse.json({ 
      success: true, 
      message: "Email sent successfully", 
      messageId: result.MessageId 
    }, { status: 200 });

  } catch (error: unknown) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to send email", 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}