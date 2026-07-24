import { useQuery } from "@tanstack/react-query";
import { staffService } from "../services/staff.service";
import { staffKeys } from "../queryKeys";

export const useActivityLogs = () => {
  return useQuery({
    queryKey: staffKeys.logs,
    queryFn: staffService.getLogs,
  });
};