import { create } from "zustand";
import type { AuthStore } from "../features/auth/types/auth";

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem(ACCESS_TOKEN_KEY),
  setToken: (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    set({
      token,
    });
  },

  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    set({
      user: null,
      token: null,
    });
  },

  setUser: (user) => {
    set({
      user,
    });
  },
}));
