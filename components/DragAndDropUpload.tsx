'use client';
import React, { DragEvent, FC, useEffect, useState } from 'react';
import { useSupabase } from '../supabase/supabase-provider';
import { useImageStore } from '@/store/useImageStore';

const DragAndDropUpload = () => {
  const [dragging, setDragging] = useState(false);
  const { supabase } = useSupabase();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);

      for (const file of filesArray) {
        const timestamp = Date.now();
        const path = `upload/${timestamp}_${file.name}`;

        // Upload the file to the "uploads" bucket
        const { error: uploadError } = await supabase.storage
          .from('upload')
          .upload(path, file);

        if (uploadError) {
          console.error('Error uploading file:', uploadError.message);
          continue;
        }

        try {
          // Get the public URL for the uploaded file
          const { data } = await supabase.storage
            .from('upload')
            .getPublicUrl(path);

          // If the data object has a publicUrl, use it
          if (data?.publicUrl) {
            useImageStore.getState().addImageUrl(data.publicUrl);
          }
        } catch (error) {
          console.warn('Error getting public URL:');
        }
      }
    }
  };

  useEffect(() => {
    // Add event listeners to the window
    window.addEventListener('dragover', handleDragOver as any);
    window.addEventListener('dragleave', handleDragLeave as any);
    window.addEventListener('drop', handleDrop as any);

    return () => {
      // Remove event listeners from the window when the component is unloaded
      window.removeEventListener('dragover', handleDragOver as any);
      window.removeEventListener('dragleave', handleDragLeave as any);
      window.removeEventListener('drop', handleDrop as any);
    };
  }, []);

  return (
    <div
      className={`relative w-full h-full ${
        dragging ? 'bg-gray-200 bg-opacity-50' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {dragging && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-25">
          <p className="text-lg font-semibold text-white">
            Drop the files here...
          </p>
        </div>
      )}
      {!dragging && (
        <p className="text-sm text-center text-gray-700">
          Drag & drop to upload
        </p>
      )}
    </div>
  );
};

export default DragAndDropUpload;
