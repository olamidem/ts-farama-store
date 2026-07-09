import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name is too long"),

  description: z
    .string()
    .max(150, "Description cannot exceed 150 characters")
    .optional(),
});

export type CategoryFormData = z.infer<typeof createCategorySchema>;
