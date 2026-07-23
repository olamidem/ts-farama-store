import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const useLogout = () => {
  const logoutStore = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await logoutStore();
    },
    onSuccess: () => {
      queryClient.clear();
      toast.success("Successfully logged out.");
      navigate({ to: "/" });
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to log out.",
      );
    },
  });
};
export default useLogout;
