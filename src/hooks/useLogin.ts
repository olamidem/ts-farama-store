import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth.service";
import { useAuthStore } from "../store/authStore";

export const useLogin = () => {
  const loginStore = useAuthStore((state) => state.login);
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      loginStore(data.user, data.token);
    },
  });
};
