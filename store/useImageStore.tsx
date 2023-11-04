import { create } from 'zustand';

export interface useImageStore {
  imageUrls: string[];
  addImageUrl: (url: string) => void;
  clearImages: () => void;
}

export const useImageStore = create<useImageStore>((set) => ({
  imageUrls: [],
  addImageUrl: (url) =>
    set((state) => ({ imageUrls: [...state.imageUrls, url] })),
  clearImages: () => set({ imageUrls: [] }),
}));
