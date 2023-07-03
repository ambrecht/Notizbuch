// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
'use client';
import NoteList from '@/components/notesList';
import { SearchComponent } from '@/components/searchNotes';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <NoteList />
      <SearchComponent />
    </div>
  );
}
