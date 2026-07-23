import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { getCurrentUser, getCurrentProfile } from "../services/auth.service";

export const useCurrentUser = () => {
  const session = useAuthStore((state) => state.session);
  const setUser = useAuthStore((state) => state.setUser);
  const setProfile = useAuthStore((state) => state.setProfile);
  const setPermissions = useAuthStore((state) => state.setPermissions);

  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const user = await getCurrentUser();
      if (!user) {
        setUser(null);
        setProfile(null);
        setPermissions([]);
        return null;
      }
      setUser(user);

      const profile = await getCurrentProfile(user.id, user.email);
      if (profile) {
        setProfile(profile);
        const rawPermissions = profile.role?.role_permissions || [];
        const permissions = rawPermissions
          .map((rp) => rp.permission?.code)
          .filter((code): code is string => typeof code === "string");
        setPermissions(permissions);
      } else {
        setProfile(null);
        setPermissions([]);
      }

      return { user, profile };
    },
    enabled: !!session,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
export default useCurrentUser;
