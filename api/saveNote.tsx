import { useState } from 'react';
import { useSession } from '../supabase/useSession';
import { useSupabase } from '../supabase/supabase-provider';

export function useSaveNote() {
  const { session } = useSession();
  const { supabase } = useSupabase();
  const [noteText, setNoteText] = useState('');

  const saveNote = async () => {
    if (!session) {
      // Benutzer ist nicht angemeldet
      return;
    }

    try {
      const { data, error } = await supabase
        .from('notes')
        .insert([{ content: noteText, user_id: session.user.id }]);

      if (error) {
        console.error('Fehler beim Speichern der Notiz:', error);
      } else {
        console.log('Notiz erfolgreich gespeichert:', data);
        setNoteText('');
      }
    } catch (error) {
      console.error('Fehler beim Speichern der Notiz:', error);
    }
  };

  return { noteText, setNoteText, saveNote };
}
