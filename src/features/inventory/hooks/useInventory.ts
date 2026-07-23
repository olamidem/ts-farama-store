import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../lib/queryKey";
import {
  getInventorySummary,
  getProductStockOverview,
} from "../services/inventory.service";
import type { InventorySummary, ProductStockOverviewItem } from "../types/inventory";

export const useInventorySummary = () => {
  return useQuery<InventorySummary>({
    queryKey: [...QUERY_KEYS.inventory, "summary"],
    queryFn: getInventorySummary,
  });
};

export const useProductStockOverview = () => {
  return useQuery<ProductStockOverviewItem[]>({
    queryKey: [...QUERY_KEYS.inventory, "stock-overview"],
    queryFn: getProductStockOverview,
  });
};

