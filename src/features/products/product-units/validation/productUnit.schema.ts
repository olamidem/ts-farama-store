import { z } from "zod";

export const createProductUnitSchema = z.object({
  unit_id: z.string().min(1, "Selling unit is required"),
  conversion_factor: z.number().min(1, "Conversion must be at least 1"),
  selling_price: z.number().min(0),
  cost_price: z.number().min(0),
  sku: z.string(),
  barcode: z.string().optional(),
});

export type ProductUnitFormData = z.infer<typeof createProductUnitSchema>;
