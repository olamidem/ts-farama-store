import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../lib/queryKey";

import {
  getPurchase,
  getPurchases,
  getPurchaseStats,
  getSuppliers,
} from "../services/purchase.service";

export function usePurchases() {
  return useQuery({
    queryKey: QUERY_KEYS.purchases,
    queryFn: getPurchases,
  });
}

export function usePurchase(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.purchases, id],
    queryFn: () => getPurchase(id),
    enabled: !!id,
  });
}

export function usePurchaseStats() {
  return useQuery({
    queryKey: [...QUERY_KEYS.purchases, "stats"],
    queryFn: getPurchaseStats,
  });
}

export function useSuppliers() {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: getSuppliers,
  });
}
