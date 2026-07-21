import { z } from "zod";

export const inventoryFilterSchema = z.object({
  search: z.string().optional(),
  type: z.string().optional(),
  product: z.string().optional(),
  dateRange: z.string().optional(),
  user: z.string().optional(),
});

export type InventoryFilterData = z.infer<typeof inventoryFilterSchema>;
