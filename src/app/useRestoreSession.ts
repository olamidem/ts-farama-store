import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { getCurrentUser } from "../services/auth.service";

export const useRestoreSession = () => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const user = await getCurrentUser();
      useAuthStore.getState().setUser(user);
      return user;
    },
    enabled: !!token,
    retry: false,
    staleTime: Infinity,
  });
};
