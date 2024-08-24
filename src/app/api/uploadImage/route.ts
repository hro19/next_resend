// app/api/uploadImage/route.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from 'next/server';

// 環境変数の存在を確認
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if (!region || !accessKeyId || !secretAccessKey) {
  throw new Error("AWS credentials are not properly set in environment variables.");
}

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const fileName = `${Date.now()}-${file.name}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: Buffer.from(buffer),
      ContentType: file.type
    });

    await s3Client.send(command);

    return NextResponse.json({ message: 'File uploaded successfully', fileName });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}