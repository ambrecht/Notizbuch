import { useRef, useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { useImageStore } from '@/store/useImageStore'; // Angenommen, das ist der neue Store für Bilder
import { useSessionStore } from '@/store/useSessionStore'; // Der neue Store für Session-Daten
import { useTextInputStore } from '@/store/useTextInputStore';
import { debounce } from '@/utils/debounce'; // Der neue Store für Texteingaben

export default function Markup() {
  const DEBOUNCE_TIME = 500;
  const { addSessionEntry, getCurrentIndexText } = useSessionStore();
  const debouncedAddSessionEntry = useMemo(() => {
    return debounce((text) => addSessionEntry(text), DEBOUNCE_TIME);
  }, [addSessionEntry]);

  const { imageUrls } = useImageStore(); // Verwendet den globalen State für Bilder
  // Funktionen aus dem Session-Store
  const { textInput, setTextInput } = useTextInputStore(); // Funktionen aus dem TextInput-Store

  const [fontSize, setFontSize] = useState(30);
  const [focus, setFocus] = useState(false);

  const inputElement = useRef<HTMLInputElement | null>(null);

  // Funktion, um den Cursor ans Ende des Textes zu setzen
  const setCursorToEnd = (inputEl: HTMLInputElement) => {
    const textLength = inputEl.value.length;
    inputEl.selectionStart = textLength;
    inputEl.selectionEnd = textLength;
    inputEl.focus();
  };

  const setCursorToStart = (inputEl: HTMLInputElement) => {
    inputEl.selectionStart = 0;
    inputEl.selectionEnd = 0;
    inputEl.focus();
  };

  // Event-Handler, um den Fokus und Cursor zu setzen, wenn mit der Maus über das Element gefahren wird
  const handleMouseEnter = () => {
    if (inputElement.current) {
      if (textInput) {
        setCursorToEnd(inputElement.current);
      } else {
        setCursorToStart(inputElement.current);
      }
    }
  };

  // Event-Handler, um die Session zu aktualisieren, wenn der Fokus verloren geht
  const handleBlur = () => {
    addSessionEntry(textInput);
    setFocus(false);
  };

  // Event-Handler, um den Fokus-Zustand zu toggeln
  const handleFocus = () => {
    setFocus(true);
  };

  // Setzen des initialen Texts und Fokus beim Laden der Komponente
  useEffect(() => {
    const sessionText = getCurrentIndexText();
    if (sessionText) {
      setTextInput(sessionText);
    }
  }, [getCurrentIndexText, setTextInput]);

  useEffect(() => {
    if (textInput) {
      debouncedAddSessionEntry(textInput);
    }
  }, [textInput, debouncedAddSessionEntry]);

  return (
    <div
      className="flex flex-col items-center mt-20 min-h-screen py-6"
      onMouseEnter={handleMouseEnter}
      onClick={handleMouseEnter}
    >
      <div className="grid grid-cols-6 gap-2">
        <div className="col-span-1">
          <div className="fixed right-0 top-0 mt-0 mr-0">
            Schriftgröße:{' '}
            <input
              type="number"
              min="4"
              step="1"
              max="120"
              value={fontSize}
              onChange={(e) => setFontSize(parseFloat(e.target.value))}
              className="border rounded p-1 bg-slate-600"
            />
          </div>
        </div>

        <div className="col-span-4 text-center">
          <p
            className={`font-mono text-sm leading-normal text-left pl-8 border-l-0 border-black`}
            style={{ fontSize: `${fontSize}px` }}
          >
            <input
              type="text"
              ref={inputElement}
              value={textInput}
              onChange={(event) => setTextInput(event.target.value)}
              onBlur={handleBlur}
              onFocus={handleFocus}
              className="focus:outline-none"
              placeholder="Beginne zu schreiben, lass die Maus los und schreibe!"
            />
            {textInput}
          </p>
          {imageUrls.map((url, index) => (
            <div key={index} id={`uploaded-image-${index}`}>
              <Image
                src={url}
                width={500}
                height={500}
                alt={`Uploaded Image ${index + 1}`}
              />
            </div>
          ))}
          {!focus && (
            <p className="text-sky-400/100">
              Fokus verloren? Klicke ins Fenster und schreibe weiter!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
