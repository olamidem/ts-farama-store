import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../services/supplier.service";
import { SUPPLIER_QUERY_KEYS } from "./useSuppliers";
import { toast } from "sonner";
import { getReadableError } from "../../../utils/error";
import type {
  CreateSupplierInput,
  UpdateSupplierInput,
} from "../types/supplier";

export const useCreateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateSupplierInput) => createSupplier(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SUPPLIER_QUERY_KEYS.all,
      });
      toast.success("Supplier created successfully");
    },
    onError: (error) => {
      toast.error(getReadableError(error));
    },
  });
};

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateSupplierInput }) =>
      updateSupplier(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: SUPPLIER_QUERY_KEYS.all,
      });
      queryClient.invalidateQueries({
        queryKey: SUPPLIER_QUERY_KEYS.details(variables.id),
      });
      toast.success("Supplier updated successfully");
    },
    onError: (error) => {
      toast.error(getReadableError(error));
    },
  });
};

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSupplier(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SUPPLIER_QUERY_KEYS.all,
      });
      toast.success("Supplier deleted successfully");
    },
    onError: (error) => {
      toast.error(getReadableError(error));
    },
  });
};
