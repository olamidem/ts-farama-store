import type { ReactNode } from "react";
import { useAuthStore } from "../store/authStore";
import LockScreen from "./LockScreen";

interface SessionGuardProps {
  children: ReactNode;
}

export const SessionGuard = ({ children }: SessionGuardProps) => {
  const isLocked = useAuthStore((state) => state.isLocked);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated && isLocked) {
    return <LockScreen />;
  }

  return <>{children}</>;
};

export default SessionGuard;
