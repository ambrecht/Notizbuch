'use client';
import Navigation from '@/components/navigation';

export default function ClientLayout({ children }) {
  return (
    <>
      <Navigation></Navigation>
      {children}
    </>
  );
}
