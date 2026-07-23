import { create } from "zustand";
import { supabase } from "../../../api/supabase";
import type { AuthStore } from "../types/auth";
import {
  getCurrentProfile,
  logout as apiLogout,
} from "../services/auth.service";
import { extractPermissions } from "./permissionHelpers";

export const useAuthStore = create<AuthStore>((set) => ({
  // ==========================
  // STATE
  // ==========================
  user: null,
  profile: null,
  permissions: [],
  session: null,

  isAuthenticated: false,
  isLocked: false,
  isLoading: true,

  // ==========================
  // SETTERS
  // ==========================
  setSession: (session) =>
    set({
      session,
      isAuthenticated: !!session,
    }),

  setUser: (user) =>
    set({
      user,
    }),

  setProfile: (profile) =>
    set({
      profile,
      permissions: profile ? extractPermissions(profile) : [],
    }),

  setPermissions: (permissions) =>
    set({
      permissions,
    }),

  setLocked: (isLocked) =>
    set({
      isLocked,
    }),

  setLoading: (isLoading) =>
    set({
      isLoading,
    }),

  // ==========================
  // LOGOUT
  // ==========================
  logout: async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.warn("Logout failed:", err);
    } finally {
      set({
        user: null,
        profile: null,
        permissions: [],
        session: null,
        isAuthenticated: false,
        isLocked: false,
        isLoading: false,
      });
    }
  },

  // ==========================
  // INITIALIZE
  // ==========================
  initialize: async () => {
    set({ isLoading: true });

    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      const session = data.session;
      if (!session) {
        set({
          session: null,
          user: null,
          profile: null,
          permissions: [],
          isAuthenticated: false,
          isLoading: false,
        });
        return;
      }

      const user = session.user;
      const profile = await getCurrentProfile(user.id);
      set({
        session,
        user,
        profile,
        permissions: profile ? extractPermissions(profile) : [],
        isAuthenticated: true,
      });
    } catch (err) {
      console.error("Failed to initialize auth:", err);
      set({
        session: null,
        user: null,
        profile: null,
        permissions: [],
        isAuthenticated: false,
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));

export default useAuthStore;
