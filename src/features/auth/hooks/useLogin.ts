import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { login } from "../services/auth.service";
import { useAuthStore } from "../store/authStore";
import { getReadableError } from "../../../utils/error";

export const useLogin = () => {
  const initialize = useAuthStore((state) => state.initialize);

  return useMutation({
    mutationFn: login,

    onSuccess: async () => {
      // Refresh the entire auth state
      await initialize();
      toast.success("Welcome back!");
    },
    onError: (error) => {
      toast.error(getReadableError(error));
    },
  });
};

export default useLogin;