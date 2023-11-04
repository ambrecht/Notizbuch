import SupabaseListener from '../supabase/supabase-listener';
import SupabaseProvider from '../supabase/supabase-provider';
import Navigation from '../components/navigation';
import './globals.css';
import { createServerClient } from '../supabase/supabase-server';
import Logout from '@/components/logout';
import type { Database } from '../db_types';
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';

export type TypedSupabaseClient = SupabaseClient<Database>;

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="flex flex-col min-h-screen">
        <Navigation></Navigation>

        <div className="flex-grow flex flex-col items-center justify-center">
          <SupabaseProvider session={session}>
            <SupabaseListener serverAccessToken={session?.access_token} />

            {children}
            <footer className="flex items-center justify-center w-full h-24 border-t">
              Icke bin hier unten wa! Allet findet auf mir über mir staat
              {session ? <Logout /> : <div> LOGO </div>}
            </footer>
          </SupabaseProvider>
        </div>
      </body>
    </html>
  );
}
