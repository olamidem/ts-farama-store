import type { User } from "../../../types/user";

// Data sent when logging in
export interface LoginRequest {
  phone_number: string;
  password: string;
}

// Data returned after a successful login
export interface LoginResponse {
  user: User;
  token: string;
}

// Authentication state
export interface AuthState {
  user: User | null;
  token: string | null;
}

// Authentication actions
export interface AuthActions {
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

// Complete auth store type
export type AuthStore = AuthState & AuthActions;