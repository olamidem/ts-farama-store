import { useMutation } from "@tanstack/react-query";
import { login } from "../../../services/auth.service";
import { useAuthStore } from "../../../store/authStore";
import { toast } from "sonner";
import { getReadableError } from "../../../utils/error";

export const useLogin = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: login,
    onSuccess: ({ session, user }) => {
      setSession(session);
      setUser(user);
      toast.success("Login successful");
    },
    onError: (error) => {
      toast.error(getReadableError(error));
    },
  });
};
