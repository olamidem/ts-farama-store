import { useAuthStore } from "../store/authStore";

export const useCurrentUser = () => {
  return useAuthStore((state) => ({
    user: state.user,
    profile: state.profile,
    permissions: state.permissions,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    isLocked: state.isLocked,
  }));
};

export default useCurrentUser;
