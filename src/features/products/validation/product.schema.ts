import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(2, "Product name must be at least 2 characters"),
  barcode: z.string().trim().optional(),
  price: z.number().positive("Price must be greater than 0"),
  costPrice: z.number().nonnegative("Cost price cannot be negative"),
  stock: z
    .number()
    .int("Stock must be a whole number")
    .nonnegative("Stock cannot be negative"),
  categoryId: z.string().min(1, "Category is required"),
  minStockAlert: z.number().int().nonnegative(),
});

export type ProductFormData = z.infer<typeof productSchema>;
