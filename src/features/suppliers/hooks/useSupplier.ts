import { useQuery } from "@tanstack/react-query";
import { getSupplier } from "../services/supplier.service";
import { getPurchases } from "../../purchases/services/purchase.service";
import { computeSupplierStats } from "../utils/supplierHelpers";
import { SUPPLIER_QUERY_KEYS } from "./useSuppliers";
import type { SupplierWithStats } from "../types/supplier";

export const useSupplier = (id: string | undefined) => {
  const supplierQuery = useQuery({
    queryKey: id ? SUPPLIER_QUERY_KEYS.details(id) : ["suppliers", "detail", "none"],
    queryFn: () => (id ? getSupplier(id) : Promise.reject("No id provided")),
    enabled: !!id,
  });

  const purchasesQuery = useQuery({
    queryKey: ["purchases", "list-for-supplier", id],
    queryFn: getPurchases,
    enabled: !!id,
  });

  const isLoading = supplierQuery.isLoading || purchasesQuery.isLoading;
  const isError = supplierQuery.isError || purchasesQuery.isError;
  const error = supplierQuery.error || purchasesQuery.error;

  let data: SupplierWithStats | undefined = undefined;

  if (supplierQuery.data && purchasesQuery.data) {
    data = computeSupplierStats(supplierQuery.data, purchasesQuery.data);
  } else if (supplierQuery.data) {
    data = computeSupplierStats(supplierQuery.data, []);
  }

  return {
    data,
    isLoading,
    isError,
    error,
    refetch: async () => {
      if (id) {
        await Promise.all([supplierQuery.refetch(), purchasesQuery.refetch()]);
      }
    },
  };
};
