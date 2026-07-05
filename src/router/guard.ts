import { redirect } from "@tanstack/react-router";
import { useAuthStore } from "../store/authStore";

/**
 * Redirects unauthenticated users to the login page.
 */
export function requireAuth() {
  const token = useAuthStore.getState().token;
  if (!token) {
    throw redirect({
      to: "/",
    });
  }
}
