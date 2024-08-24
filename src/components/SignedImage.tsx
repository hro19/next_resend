// app/components/SignedImage.js
'use client';

import { useState, useEffect } from 'react';

export default function SignedImage({ imageKey }:any) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    async function fetchSignedUrl() {
      try {
        const response = await fetch(`/api/getSignedUrl?key=${encodeURIComponent(imageKey)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch signed URL');
        }
        const data = await response.json();
        setImageUrl(data.signedUrl);
      } catch (error) {
        console.error('Error fetching signed URL:', error);
      }
    }

    fetchSignedUrl();
  }, [imageKey]);

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <img
      src={imageUrl}
    />
  );
}