import type { Session, User } from "@supabase/supabase-js";

/**
 * Data sent when logging in
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Authentication state
 */
export interface AuthState {
  user: User | null;
  session: Session | null;
}

/**
 * Authentication actions
 */
export interface AuthActions {
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

/**
 * Complete auth store
 */
export type AuthStore = AuthState & AuthActions;
