import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(2, "Product name must be at least 2 characters"),
  barcode: z.string().trim().optional(),
  sellingPrice: z.coerce
    .number({
      error: "Selling price is required",
    })
    .int()
    .positive("Selling price must be greater than zero"),
  costPrice: z.coerce.number().int().nonnegative("Cost price cannot be negative"),
  stock: z.coerce
    .number({
      error: "Stock is required",
    })
    .int()
    .nonnegative("Stock cannot be negative"),
  minStockAlert: z.coerce.number().int().nonnegative().default(10),
  categoryId: z.string(),
});
export type ProductFormData = z.infer<typeof productSchema>;