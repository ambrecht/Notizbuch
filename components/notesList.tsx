import { useSupabase } from '../supabase/supabase-provider';

const NoteList = () => {
  const { notes } = useSupabase();

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Notizen</h2>
      <ol className="list-decimal space-y-2">
        {notes
          .reverse()
          .map(
            (note: {
              id: string;
              content: string;
              created_at: string;
              word_count: number;
            }) => (
              <li key={note.id} className="border-b py-2">
                <p className="text-lg">{note.content}</p>
                <p className="text-gray-500 text-sm">
                  Erstellt am: {new Date(note.created_at).toLocaleString()}
                </p>
                <p className="text-gray-500 text-sm">
                  Wortzahl: {note.word_count}
                </p>
              </li>
            ),
          )}
      </ol>
    </div>
  );
};

export default NoteList;
