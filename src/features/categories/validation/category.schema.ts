import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name is too long"),

  description: z
    .string()
    .trim()
    .max(150, "Description cannot exceed 150 characters")
    .optional(),

  sku_prefix: z
    .string()
    .trim()
    .min(2, "SKU Prefix is required")
    .max(5, "Maximum 5 characters")
    .regex(/^[A-Za-z]+$/, "Letters only")
    .transform((value) => value.toUpperCase()),
});

export type CategoryFormData = z.infer<typeof createCategorySchema>;
