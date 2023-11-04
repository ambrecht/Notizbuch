// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
'use client';
import React from 'react';
import Writter from '../../components/writter';
import { useRequireAuth } from '@/hooks/useAuth';
import DragAndDropUpload from '@/components/DragAndDropUpload';
import UndoRedoInputComponent from '@/components/UndoRedo';

export default function Page() {
  const isAuthenticated = useRequireAuth();

  if (isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Writter />
        <DragAndDropUpload />
        <UndoRedoInputComponent></UndoRedoInputComponent>
      </div>
    );
  }
}
