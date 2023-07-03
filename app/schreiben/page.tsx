// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
'use client';
import Writter from '../../components/writter';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Writter></Writter>
    </div>
  );
}
