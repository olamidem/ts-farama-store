import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../lib/queryKey";
import { getInventoryTransactions } from "../services/inventory.service";
import type { InventoryTransactionWithRelations } from "../types/inventoryTransaction";

export const useInventoryTransactions = () => {
  return useQuery<InventoryTransactionWithRelations[]>({
    queryKey: [...QUERY_KEYS.inventory, "transactions"],
    queryFn: getInventoryTransactions,
  });
};

