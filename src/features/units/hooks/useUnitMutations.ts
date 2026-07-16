import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../lib/queryKey";
import { createUnit, updateUnit, archiveUnit, restoreUnit } from "../services/unit.service";
import type { CreateUnitInput, UpdateUnitInput } from "../types/unit";
import { toast } from "sonner";
import { getReadableError } from "../../../utils/error";

const invalidateUnits = async (
  queryClient: ReturnType<typeof useQueryClient>,
) => {
  await queryClient.invalidateQueries({
    queryKey:  QUERY_KEYS.units ,
  });
};

export const useCreateUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (unit: CreateUnitInput) => createUnit(unit),
    onSuccess: async () => {
      await invalidateUnits(queryClient);
      toast.success("Unit created successfully");
    },
    onError: (error) => {
      toast.error(getReadableError(error));
    },
  });
};

export const useUpdateUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, unit }: { id: string; unit: UpdateUnitInput }) =>
      updateUnit(id, unit),
    onSuccess: async() => {
      await invalidateUnits(queryClient);
      toast.success("Unit updated successfully");
    },
    onError: (error) => {
      toast.error(getReadableError(error));
    },
  });
};

export const useArchiveUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => archiveUnit(id),
    onSuccess: async() => {
      await invalidateUnits(queryClient);
      toast.success("Unit archived successfully");
    },
    onError: (error) => {
      toast.error(getReadableError(error));
    },
  });
};

export const useRestoreUnit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreUnit,
    onSuccess: async () => {
      toast.success("Unit restored.");
      await invalidateUnits(queryClient);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
