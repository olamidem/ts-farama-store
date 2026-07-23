import { create } from "zustand";
import type { AuthStore } from "../types/auth";
import { supabase } from "../../../api/supabase";
import {
  getCurrentProfile,
  logout as apiLogout,
} from "../services/auth.service";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  profile: null,
  permissions: [],
  isAuthenticated: false,
  isLocked: false,
  session: null,
  isLoading: true,

  setSession: (session) => set({ session, isAuthenticated: !!session }),
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setPermissions: (permissions) => set({ permissions }),
  setLocked: (isLocked) => set({ isLocked }),
  setLoading: (isLoading) => set({ isLoading }),

  logout: async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.warn("Logout error:", err);
    } finally {
      set({
        user: null,
        profile: null,
        permissions: [],
        isAuthenticated: false,
        isLocked: false,
        session: null,
        isLoading: false,
      });
    }
  },

  initialize: async () => {
    set({ isLoading: true });
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const user = session.user;
        set({ session, user, isAuthenticated: true });

        const profile = await getCurrentProfile(user.id, user.email);
        if (profile) {
          set({ profile });
          const rawPermissions = profile.role?.role_permissions || [];
          const permissions = rawPermissions
            .map((rp) => rp.permission?.code)
            .filter((code): code is string => typeof code === "string");
          set({ permissions });
        }
      } else {
        set({
          session: null,
          user: null,
          profile: null,
          permissions: [],
          isAuthenticated: false,
        });
      }
    } catch (err) {
      console.warn("Auth initialization error:", err);
    } finally {
      set({ isLoading: false });
    }
  },
}));
export default useAuthStore;
