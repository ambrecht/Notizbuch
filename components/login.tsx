import { useSupabase } from '../supabase/supabase-provider';
import LoginPopup from './loginPopUp';

export default function LoginParent() {
  const { supabase } = useSupabase();

  const handleEmailLogin = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Fehler beim E-Mail-Login:', error);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log('Fehler beim Logout:', error);
    }
  };

  return (
    <>
      <LoginPopup onLogin={handleEmailLogin} />
    </>
  );
}
