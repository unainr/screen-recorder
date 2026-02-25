import { create } from "zustand";

interface UploadStore {
  videoUrl: string | null;
  setVideoUrl: (url: string) => void;
  reset: () => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  videoUrl: null,
  setVideoUrl: (url) => set({ videoUrl: url }),
  reset: () => set({ videoUrl: null }),
}));