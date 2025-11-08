import { create } from "zustand";
import { persist } from "zustand/middleware";
import fetchWithAuth from "../utils/fetchWithAuth";

const useChatStore = create((set, get) => ({
  receivedData: false,
  error: null,
  loading: false,

  fetchCharacterFronDB: async (storyId, characterId) => {
    set({
      loading: true,
      error: null,
    });

    if (!storyId || !characterId) {
      throw new Error("Missing storyId or characterId");
    }

    try {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/api/fetch/single-character/${storyId}/${characterId}`,
        {
          method: "GET",
        }
      );

      if (response.ok || response.success || response.data) {
        const data = response;
        set({ receivedData: true, loading: false, error: null });
        return data;
      } else {
        set({ receivedData: false, loading: false, error: response.message });
        throw new Error(response.message);
      }
    } catch (error) {
      set({ receivedData: false, loading: false, error: error.message });
      console.log(
        `Error fetching character details: ${error} error message:${error.message}`
      );
      throw new Error("Something went wrong, please try agin.");
    }
  },
}));

export default useChatStore;
