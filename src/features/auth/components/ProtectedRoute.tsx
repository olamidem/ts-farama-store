import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../store/authStore";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({
  children,
}: ProtectedRouteProps) => {
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

  const isLoading = useAuthStore(
    (state) => state.isLoading,
  );

  const isLocked = useAuthStore((state) => state.isLocked);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate({
        to: "/",
        replace: true,
      });
      return;
    }

    if (isLocked) {
      navigate({
        to: "/lock-screen",
        replace: true,
      });
    }
  }, [
    isAuthenticated,
    isLoading,
    isLocked,
    navigate,
  ]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />

          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Resolving Authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || isLocked) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;