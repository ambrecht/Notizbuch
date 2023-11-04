'use client';

import { useSupabase } from '@/supabase/supabase-provider';

export default function Logout() {
  const { supabase } = useSupabase();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log({ error });
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
