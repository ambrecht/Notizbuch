// useSaveNote.js
import { useCallback } from 'react';
import { useSession } from '../supabase/useSession';
import { useSupabase } from '../supabase/supabase-provider';
import { useImageStore } from '../store/useImageStore';
import { useSessionStore } from '@/store/useSessionStore';
import { useTextInputStore } from '@/store/useTextInputStore';
// Stellen Sie sicher, dass der Store hier richtig importiert wird.

export function useSaveNote() {
  const { session } = useSession();
  const { supabase } = useSupabase();
  const { imageUrls, clearImages } = useImageStore();
  const { clearSession } = useSessionStore();
  const { textInput, setTextInput } = useTextInputStore();

  const saveNote = useCallback(async () => {
    if (!session) {
      console.error('Benutzer ist nicht angemeldet.');
      return;
    }

    try {
      const { data, error } = await supabase.from('notes').insert([
        {
          content: textInput,
          user_id: session.user.id,
          image_urls: imageUrls.length > 0 ? JSON.stringify(imageUrls) : null,
        },
      ]);

      if (error) {
        throw error;
      }

      console.log('Notiz erfolgreich gespeichert:', data);
      clearImages();
      clearSession(); // Löschen Sie die Bilder aus dem Zustand nach dem Speichern
    } catch (error) {
      console.error('Fehler beim Speichern der Notiz:', error);
    }
  }, [session, supabase, textInput, imageUrls, clearImages, clearSession]);

  return { saveNote };
}
