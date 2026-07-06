import { useMutation } from "@tanstack/react-query";
import { login } from "../../../services/auth.service";
import { useAuthStore } from "../../../store/authStore";

export const useLogin = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const setUser = useAuthStore((state) => state.setUser);
  
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (!data.session || !data.user) {
        throw new Error("Login failed.");
      }
      setSession(data.session);
      setUser(data.user);
    },
  });
};
