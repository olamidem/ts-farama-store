import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth.service";
import { useAuthStore } from "../store/authStore";
import { toast } from "sonner";
import { getReadableError } from "../../../utils/error";

export const useLogin = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const setUser = useAuthStore((state) => state.setUser);
  const initialize = useAuthStore((state) => state.initialize);

  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      if (data.session) {
        setSession(data.session);
      }
      if (data.user) {
        setUser(data.user);
      }
      // Re-initialize to fetch profile & permissions from db
      await initialize();
    },
    onError: (error) => {
      toast.error(getReadableError(error));
    },
  });
};
export default useLogin;
