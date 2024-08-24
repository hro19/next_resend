"use client"; 

import { useState } from 'react';

export default function ImageUploader() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e:any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert('File uploaded successfully: ' + data.fileName);
      } else {
        throw new Error(data.error || 'Failed to upload file');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to upload file');
    }
  };

return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <input type="file" onChange={handleFileChange} accept="image/*" className="mb-4" />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upload
        </button>
    </form>
);
}