import { useQuery } from "@tanstack/react-query";
import { staffService } from "../services/staff.service";
import { staffKeys } from "../queryKeys";

export const useRoles = () => {
  return useQuery({
    queryKey: staffKeys.roles,
    queryFn: staffService.getRoles,
  });
};