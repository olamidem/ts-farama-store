import { useAuthStore } from "../store/authStore";

export const useSession = () => {
  return useAuthStore((state) => ({
    session: state.session,
    isAuthenticated: state.isAuthenticated,
  }));
};

export default useSession;