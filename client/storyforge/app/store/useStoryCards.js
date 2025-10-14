import { create } from "zustand";
import fetchWithAuth from "../utils/fetchWithAuth";

const useStoryCards = create((set, get) => ({
  createdStoryCard: false,
  loading: false,
  error: null,
  fetchedStories: [],

  postStoryCards: async (title, description, genre) => {
    set({ loading: true, createdStoryCard: false });
    try {
      const data = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/api/save-story/storycard`,
        {
          method: "POST",
          body: JSON.stringify({
            title: title,
            description: description,
            genre: genre,
          }),
        }
      );

      console.log(`Created story successfully: ${data}`);
      set({ createdStoryCard: true, loading: false, error: null });
      return data;
    } catch (error) {
      console.log(
        `Error creating story: ${error} error message:${error.message}`
      );
      throw new Error("Something went wrong, please try agin.");
    }
  },

  fetchStoryCards: async () => {
    set({ loading: true, fetchedStories: [] });
    try {
      const data = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/api/fetch-story/fetch-story-cards`,
        { method: "GET" }
      );

      console.log("Story cards fetched successfully : ", data);
      set({ loading: false, fetchedStories: data.cards });
    } catch (error) {
      console.log(
        `Error fetching story: ${error} error message:${error.message}`
      );
      throw new Error("Something went wrong, please try agin.");
    }
  },
}));

export default useStoryCards;
