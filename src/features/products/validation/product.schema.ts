import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  barcode: z.string().trim().optional(),
  sku: z.string(),
  selling_price: z.number().min(0, "Selling price cannot be negative"),
  cost_price: z.number().min(0, "Cost price cannot be negative"),
  stock: z.number().min(0, "Stock cannot be negative"),
  min_stock_alert: z.number().min(0),
  category_id: z.string().min(1, "Please select a category"),
});

export type ProductFormData = z.infer<typeof createProductSchema>;
