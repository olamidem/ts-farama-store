import type { User } from "../../../types/user";

// Data sent when logging in
export interface LoginRequest {
  email: string;
  password: string;
}

// Data returned after a successful login
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

// Authentication state
export interface AuthState {
  user: User | null;
  token: string | null;
}

// Authentication actions
export interface AuthActions {
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
}


// Complete auth store type
export type AuthStore = AuthState & AuthActions;