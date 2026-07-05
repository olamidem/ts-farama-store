import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/authStore";
import { login } from "../../../services/auth.service";

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.access_token);
    },
  });
};
