import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../lib/queryKey";
import { getInventoryTransactions } from "../services/inventory.service";

export function useInventoryTransactions() {
  return useQuery({
    queryKey: QUERY_KEYS.inventoryTransactions,
    queryFn: getInventoryTransactions,
  });
}
