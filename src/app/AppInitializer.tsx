import type { PropsWithChildren } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/auth.service";
import { useAuthStore } from "../store/authStore";
import LoadingScreen from "../components/common/LoadingScreen";


export default function AppInitializer({
  children,
}: PropsWithChildren) {
  const token = useAuthStore((state) => state.token);
  const { isPending } = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      if (!token) return null;
      const user = await getCurrentUser();
      useAuthStore.getState().setUser(user);
      return user;
    },
    enabled: !!token,
    retry: false,
  });
  if (isPending) {
    return <LoadingScreen />;
  }
  return <>{children}</>;
}