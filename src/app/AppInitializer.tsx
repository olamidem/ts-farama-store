import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "../store/authStore";

interface AppInitializerProps {
  children: ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
};

export default AppInitializer;
