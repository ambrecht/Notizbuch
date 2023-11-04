import { create } from 'zustand';

interface SessionEntry {
  timestamp: number;
  textInput: string;
}

interface SessionState {
  session: SessionEntry[];
  currentIndex: number;
  addSessionEntry: (textInput: string) => void;
  getCurrentIndexText: () => string;
  undo: () => void;
  redo: () => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  session: [],
  currentIndex: -1,

  addSessionEntry: (textInput) => {
    const trimmedText = textInput.trim();
    if (trimmedText) {
      set((state) => {
        const isDuplicate = state.session
          .slice(0, state.currentIndex + 1)
          .some((entry) => entry.textInput === trimmedText);
        if (!isDuplicate) {
          const newEntry = { timestamp: Date.now(), textInput: trimmedText };
          const newSession = [
            ...state.session.slice(0, state.currentIndex + 1),
            newEntry,
          ];
          return {
            session: newSession,
            currentIndex: newSession.length - 1,
          };
        }
        // Return an empty object when there's no update to the state
        return {};
      });
    }
  },

  getCurrentIndexText: () => {
    const { session, currentIndex } = get();
    return currentIndex >= 0 && currentIndex < session.length
      ? session[currentIndex].textInput
      : '';
  },

  undo: () => {
    set((state) => {
      if (state.currentIndex > 0) {
        return { currentIndex: state.currentIndex - 1 };
      }
      // Return an empty object when the currentIndex can't be decreased
      return {};
    });
  },

  redo: () => {
    set((state) => {
      if (state.currentIndex < state.session.length - 1) {
        return { currentIndex: state.currentIndex + 1 };
      }
      // Return an empty object when the currentIndex can't be increased
      return {};
    });
  },
  clearSession: () => {
    set(() => ({
      session: [],
      currentIndex: -1,
    }));
  },
}));
