import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { supabase } from "../../../api/supabase";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

export const useSession = () => {
  const session = useAuthStore((state) => state.session);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLocked = useAuthStore((state) => state.isLocked);
  const setLocked = useAuthStore((state) => state.setLocked);
  const initialize = useAuthStore((state) => state.initialize);
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, newSession: Session | null) => {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          setSession(newSession);
          if (newSession) {
            await initialize();
          }
        } else if (event === "SIGNED_OUT") {
          setSession(null);
        }
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [initialize, setSession]);

  const lock = () => setLocked(true);
  const unlock = () => setLocked(false);

  return {
    session,
    isAuthenticated,
    isLocked,
    lock,
    unlock,
  };
};
export default useSession;
