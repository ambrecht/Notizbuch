'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSupabase } from '../supabase/supabase-provider';

export function SearchComponent() {
  const { supabase } = useSupabase();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('notes')
          .select()
          .ilike('content', `%${searchTerm}%`);

        if (error) {
          console.error('Fehler bei der Suche:', error);
        } else {
          setSearchResults(data || []);
        }
      } catch (error) {
        console.error('Fehler bei der Suche:', error);
      }
    };

    fetchSearchResults();
  }, [supabase, searchTerm]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Suchbegriff"
      />

      <ul>
        {searchResults.map((note) => (
          <li key={note.id}>
            <p>{note.content}</p>
            <p>Erstellt am: {note.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
