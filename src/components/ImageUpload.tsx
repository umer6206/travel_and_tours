import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadToCloudinary } from '@/lib/cloudinary';
import Image from 'next/image';

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  existingImages?: { url: string; alt: string }[];
  onImageDelete?: (index: number) => void;
  multiple?: boolean;
}

export default function ImageUpload({
  onImageUpload,
  existingImages = [],
  onImageDelete,
  multiple = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);
      setError('');

      try {
        for (const file of acceptedFiles) {
          const url = await uploadToCloudinary(file);
          onImageUpload(url);
        }
      } catch (err) {
        setError('Failed to upload image. Please try again.');
        console.error('Upload error:', err);
      } finally {
        setUploading(false);
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    multiple,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <p>Uploading...</p>
        ) : isDragActive ? (
          <p>Drop the images here...</p>
        ) : (
          <p>Drag & drop images here, or click to select files</p>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {existingImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {existingImages.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-w-16 aspect-h-9 relative">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              {onImageDelete && (
                <button
                  onClick={() => onImageDelete(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 