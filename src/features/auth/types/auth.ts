import type { Session, User } from "@supabase/supabase-js";
import type { Profile } from "./profile";
import type { Permission } from "./permission";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  session: Session;
  user: User;
}

export interface AuthState {
  user: User | null;
  profile: Profile | null;
  permissions: Permission[];
  session: Session | null;
  isAuthenticated: boolean;
  isLocked: boolean;
  isLoading: boolean;
}

export interface AuthActions {
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setPermissions: (permissions: Permission[]) => void;
  setLocked: (isLocked: boolean) => void;
  setLoading: (isLoading: boolean) => void;

  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export type AuthStore = AuthState & AuthActions;