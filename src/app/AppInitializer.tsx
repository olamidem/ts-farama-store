import type { PropsWithChildren } from "react";
import LoadingScreen from "../components/common/LoadingScreen";
import { useAuthStore } from "../store/authStore";
import { useRestoreSession } from "./useRestoreSession";

export default function AppInitializer({ children }: PropsWithChildren) {
  const token = useAuthStore((state) => state.token);
  const { isPending } = useRestoreSession();
  if (token && isPending) {
    return <LoadingScreen />;
  }
  return <>{children}</>;
}
