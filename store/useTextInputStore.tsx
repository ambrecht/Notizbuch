import { create } from 'zustand';

interface TextInputState {
  textInput: string;
  setTextInput: (text: string) => void;
  clearTextInput: () => void;
}

export const useTextInputStore = create<TextInputState>((set) => ({
  textInput: '',
  setTextInput: (text) => set({ textInput: text }),
  clearTextInput: () => set({ textInput: '' }),
}));
