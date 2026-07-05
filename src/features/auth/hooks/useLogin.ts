import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/authStore";
import { login } from "../../../services/auth.service";

export const useLogin = () => {
  const loginStore = useAuthStore((state) => state.login);
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      loginStore(data.user, data.token);
    },
  });
};
