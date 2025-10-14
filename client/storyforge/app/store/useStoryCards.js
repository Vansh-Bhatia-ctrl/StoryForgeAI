import { create } from "zustand";

const useStoryCards = create((set, get) => ({
  createdStoryCard: false,
  loading: false,
  error: null,

  postStoryCards: async () => {
    try {
    } catch (error) {}
  },
}));

export default useStoryCards;
