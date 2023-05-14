import { useRef, useEffect, useState } from 'react';
import { useSaveNote } from '@/api/saveNote';
import { useSupabase } from '../supabase/supabase-provider';

export default function MARKUP() {
  const [inputValue, setInputValue] = useState('');
  const [focusMessage, setMessage] = useState('Du bist fokusiert!');
  const [focus, setFocus] = useState(true);
  const [count, setCount] = useState({ blur: 0, focus: 0 });
  const [wordCount, setWordCount] = useState(0);
  const [fontSize, setFontsize] = useState(30);
  const { noteText, setNoteText, saveNote } = useSaveNote();
  const { supabase, setNotes } = useSupabase();

  const inputElement = useRef<HTMLInputElement | null>(null);

  const WordCount = (input: string) => {
    const regEx = input
      .replace(/(^\s*)|(\s*$)/gi, '')
      .replace(/[ ]{2,}/gi, ' ')
      .replace(/\n /, '\n');

    return regEx.split(' ').length;
  };

  useEffect(() => {
    if (inputElement.current !== null) {
      inputElement.current.focus();
    }
  }, []);

  useEffect(() => {
    const wordCounter = WordCount(inputValue);
    inputValue && setWordCount(wordCounter);
  }, [inputValue]);

  const handleClick = () => {
    if (inputElement.current !== null) {
      inputElement.current.focus();
    }
  };

  const handleBlur = async () => {
    setFocus(false);
    setCount({ blur: count.blur + 1, focus: count.focus });
    await saveNote();
    const { data } = await supabase.from('notes').select();
    console.log('writter', data);
    setNotes(data ?? []);
  };

  const handleFocus = () => {
    setFocus(true);
    setCount({ blur: count.blur, focus: count.focus + 1 });
  };

  const handleWheelScroll = (event: React.WheelEvent<HTMLInputElement>) => {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    const newValue = fontSize + delta;
    setFontsize(newValue);
  };

  return (
    <div className="flex flex-col items-center mt-20 min-h-screen py-6">
      <div className="grid grid-cols-6 gap-2">
        <div className="col-span-1">
          <div className="fixed right-0 top-0 mt-4 mr-4">
            Schriftgröße:{' '}
            <input
              type="number"
              min="4"
              step="1"
              max="120"
              value={fontSize}
              onChange={(e) => setFontsize(parseFloat(e.target.value))}
              className="border rounded p-1 bg-slate-600"
            ></input>
          </div>
        </div>
        <div className="col-span-4 text-center">
          <p
            className={`font-mono text-sm leading-normal text-left pl-8 border-l-2 border-black text-${fontSize}`}
            style={{ fontSize: `${fontSize}px ` }}
          >
            <input
              type="text"
              ref={inputElement}
              value={noteText}
              onChange={(event) => setNoteText(event.target.value)}
              onBlur={handleBlur}
              onFocus={handleFocus}
              className="focus:outline-none h-0 w-0"
            />
            {noteText
              ? noteText
              : focus
              ? 'Beginne zu schreiben, lass die Maus los und schreibe!'
              : 'Du hast den Fokus verloren, klicke auf disen Button um weiter zu schreiben!'}
          </p>
        </div>

        {!focus && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClick}
          >
            Weiter Schreiben
          </button>
        )}
      </div>
    </div>
  );
}
