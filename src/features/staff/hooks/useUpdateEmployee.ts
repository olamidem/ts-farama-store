import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { staffService } from "../services/staff.service";
import { staffKeys } from "../queryKeys";
import type { UpdateEmployeeDto } from "../types/staff-query.types";

interface UpdatePayload {
  id: string;
  updates: UpdateEmployeeDto;
}

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: UpdatePayload) =>
      staffService.updateEmployee(id, updates),

    onSuccess: () => {
      toast.success("Employee updated successfully.");

      queryClient.invalidateQueries({
        queryKey: staffKeys.employees,
      });

      queryClient.invalidateQueries({
        queryKey: staffKeys.roles,
      });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};