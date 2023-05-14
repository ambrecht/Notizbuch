'use client';

import { useSupabase } from '../supabase/supabase-provider';

// Supabase auth needs to be triggered client-side
export default function Login() {
  const { supabase, session } = useSupabase();

  const handleEmailLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'tino@ambrecht.de',
      password: 'ambrecht@1353',
    });

    if (error) {
      console.log({ error });
    }
  };

  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });

    if (error) {
      console.log({ error });
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log({ error });
    }
  };

  const fetchData = async () => {
    const { data, error } = await supabase.from('notes').select();
    console.log({ data, error });
  };

  // this `session` is from the root loader - server-side
  // therefore, it can safely be used to conditionally render
  // SSR pages without issues with hydration
  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleEmailLogin}>Email Login</button>
      <button onClick={handleGitHubLogin}>GitHub Login</button>
    </>
  );
}
