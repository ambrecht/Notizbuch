import { useSupabase } from '../supabase/supabase-provider';

const NoteList = () => {
  const { notes }: { notes: Array<any> } = useSupabase();

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Notizen</h2>
      <ol className="list-none">
        {notes
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map(
            (note: {
              id: string;
              content: string;
              created_at: string;
              word_count: number;
            }) => (
              <li key={note.id} className="border-b py-4">
                <p className="text-base">{note.content}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{new Date(note.created_at).toLocaleString()}</span>
                  <span>Wortzahl: {note.word_count}</span>
                </div>
              </li>
            ),
          )}
      </ol>
    </div>
  );
};

export default NoteList;
