import { useEffect } from 'react';
import { useSupabase } from '../supabase/supabase-provider';

const SupabaseNotesInsertListener = () => {
  const { supabase } = useSupabase();

  useEffect(() => {
    const handleInsert = (payload: any) => {
      console.log('Insert event:', payload);

      // Führe hier die gewünschte Aktion aus
      // Beispiel: Reload einer Komponente
      // window.location.reload();
    };

    const channel = supabase
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notes',
        },
        handleInsert,
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase]);

  return null;
};

export default SupabaseNotesInsertListener;
