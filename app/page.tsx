'use client';

import { useSupabase } from '../supabase/supabase-provider';
import { useRouter as useNextRouter } from 'next/navigation';
import Logout from '../components/logout';

const HomePage = () => {
  const router = useNextRouter();
  const { session } = useSupabase();

  // Hier kannst du den eigentlichen Inhalt der Startseite rendern
  return (
    <div>
      <h1>Willkommen auf der Startseite!</h1>
      <Logout></Logout>
      {/* Füge hier den Rest deines Seiteninhalts hinzu */}
    </div>
  );
};

export default HomePage;
