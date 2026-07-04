import { create } from "zustand";
import type { User } from "../types/user";

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const AuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("ACCESS_TOKEN"),
  login: (user: User, token: string) => {
    localStorage.setItem("ACCESS_TOKEN", token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("ACCESS_TOKEN");
    set({ user: null, token: null });
  },
  setUser: (user: User) => set({ user }),
}));
