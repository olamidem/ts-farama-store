import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/authStore";
import { getCurrentUser } from "../../../services/auth.service";

export const useCurrentUser = () => {
  const session = useAuthStore((state) => state.session);
  const setUser = useAuthStore((state) => state.setUser);
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const user = await getCurrentUser();
      setUser(user);
      return user;
    },
    enabled: !!session,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};