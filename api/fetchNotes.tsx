import { useEffect, useState } from 'react';
import { useSupabase } from '../supabase/supabase-provider';

export function useNotes() {
  const { supabase } = useSupabase();
  const [notes, setNotes] = useState<any[]>([]); // Explizit den Typ als "any[]" angeben

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data, error } = await supabase.from('notes').select();
        console.log('Notizen:', data);

        if (error) {
          console.error('Fehler beim Abrufen der Notizen:', error);
        } else {
          setNotes(data || []);
        }
      } catch (error) {
        console.error('Fehler beim Abrufen der Notizen:', error);
      }
    };

    fetchNotes();
  }, [supabase]);

  return notes;
}
