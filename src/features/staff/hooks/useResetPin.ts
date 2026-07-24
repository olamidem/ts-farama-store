import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { staffService } from "../services/staff.service";
import { staffKeys } from "../queryKeys";

interface ResetPinPayload {
  id: string;
  pin_hash: string;
}

export const useResetPin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, pin_hash }: ResetPinPayload) =>
      staffService.resetPin(id, pin_hash),

    onSuccess: () => {
      toast.success("PIN reset successfully.");

      queryClient.invalidateQueries({
        queryKey: staffKeys.employees,
      });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};