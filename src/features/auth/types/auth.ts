import type { Session, User } from "@supabase/supabase-js";
import type { Profile } from "./profile";

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
  profile: Profile | null;
  permissions: string[];
  session: Session | null;
  isAuthenticated: boolean;
  isLocked: boolean;
  isLoading: boolean;
}

/**
 * Authentication actions
 */
export interface AuthActions {
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setPermissions: (permissions: string[]) => void;
  setLocked: (isLocked: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

/**
 * Complete auth store
 */
export type AuthStore = AuthState & AuthActions;

