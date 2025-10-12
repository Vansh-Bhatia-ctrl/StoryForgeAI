import { create } from "zustand";

const useAuthentication = create((set, get) => ({
  loggedIn: false,
  signedUp: false,
  loading: false,
  error: null,
  accessToken: null,

  clearError: () => {
    set({ error: null });
  },

  signUp: async (name, email, password) => {
    set({ loading: true, signedUp: false });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: email,
            username: name,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        set({ loading: false, error: errorData.message });
        throw new Error(
          errorData.message || "Unable to Sign Up, please try again."
        );
      }

      const data = await response.json();
      console.log("user successfully signed up.", data);
      set({ loading: false, signedUp: true, accessToken: data.accessToken });
    } catch (error) {
      console.log(`Error signingup: ${error} error message: ${error.message}`);
      set({ loading: false, signedUp: false, error: error });
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true, loggedIn: false });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        set({ loading: false, error: errorData.message });
        throw new Error(
          errorData.message || "Unable to Log In, please try again."
        );
      }

      const data = await response.json();
      console.log("user successfully logged in.", data);
      set({ loading: false, loggedIn: true, accessToken: data.accessToken });
    } catch (error) {
      console.log(`Error loggin in: ${error} error message: ${error.message}`);
      set({ loading: false, loggedIn: false, error: error });
    }
  },

  refreshAccessToken: async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/api/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        set({ error: errorData.message });
        throw new Error(errorData.message || "Token refresh failed");
      }

      const data = await response.json();

      set({ accessToken: data.accessToken });

      return data.accessToken;
    } catch (error) {
      console.log(
        `Error generating token: ${error}, error message: ${error.message}`
      );
      set({ accessToken: null, loggedIn: false, signedUp: false });
    }
  },
}));

export default useAuthentication;
