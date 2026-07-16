import { z } from "zod";

export const createUnitSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Unit name must be at least 2 characters.")
    .max(50, "Unit name cannot exceed 50 characters."),

  symbol: z
    .string()
    .trim()
    .min(1, "Unit symbol is required.")
    .max(10, "Unit symbol cannot exceed 10 characters."),

  description: z
    .string()
    .trim()
    .max(255, "Description cannot exceed 255 characters.")
    .optional()
    .or(z.literal("")),
});

export type UnitFormData = z.infer<typeof createUnitSchema>;
