import React from 'react';
import { useSessionStore } from '@/store/useSessionStore';
import { useTextInputStore } from '@/store/useTextInputStore';
import { useSaveNote } from '@/api/saveNote';
import Draggable from 'react-draggable';

const UndoRedoInputComponent = () => {
  const { undo, redo, getCurrentIndexText } = useSessionStore((state) => ({
    undo: state.undo,
    redo: state.redo,
    getCurrentIndexText: state.getCurrentIndexText,
  }));

  const setTextInput = useTextInputStore((state) => state.setTextInput);

  const { saveNote } = useSaveNote();

  // Handler for undo action
  const handleUndo = () => {
    undo();
    setTextInput(getCurrentIndexText()); // Set the text from the current index in session
  };

  // Handler for redo action
  const handleRedo = () => {
    redo();
    setTextInput(getCurrentIndexText()); // Set the text from the current index in session
  };

  // Handler for delete action
  const handleDelete = () => {
    setTextInput(''); // Clear the current text input
  };

  // Handler for save action
  const handleSave = async () => {
    await saveNote(); // Verwenden Sie saveNote aus useSaveNote
  };

  // Determine the ability to undo and redo based on the session state
  const canUndo = useSessionStore((state) => state.currentIndex > 0);
  const canRedo = useSessionStore(
    (state) => state.currentIndex < state.session.length - 1,
  );

  return (
    <Draggable>
      <div className="p-4 bg-white shadow-sm rounded-lg cursor-move">
        <div className="flex justify-between items-center mb-2">
          <div className="flex-grow border-t border-dashed border-gray-200"></div>
          <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full text-center line-through">
            :::
          </div>
          <div className="flex-grow border-t border-dashed border-gray-200"></div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            className={`px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md ${
              !canUndo && 'opacity-50 cursor-not-allowed'
            }`}
          >
            Undo
          </button>
          <button
            onClick={handleRedo}
            disabled={!canRedo}
            className={`px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md ${
              !canRedo && 'opacity-50 cursor-not-allowed'
            }`}
          >
            Redo
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md"
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </Draggable>
  );
};

export default UndoRedoInputComponent;
