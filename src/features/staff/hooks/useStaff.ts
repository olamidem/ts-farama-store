import { useQuery } from "@tanstack/react-query";
import { staffService } from "../services/staff.service";
import { staffKeys } from "../queryKeys";

export const useEmployees = () => {
  return useQuery({
    queryKey: staffKeys.employees,
    queryFn: staffService.getEmployees,
  });
};