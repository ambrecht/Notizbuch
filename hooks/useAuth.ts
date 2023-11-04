import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '../supabase/supabase-provider';

export function useRequireAuth() {
  const { session } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && !session) {
      router.push('/login');
    }
  }, [session, router]);

  if (!session) {
    return false;
  }

  return true;
}
