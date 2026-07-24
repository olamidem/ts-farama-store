import { z } from "zod";

export const resetPinSchema = z.object({
  pin: z
    .string()
    .trim()
    .min(4, "PIN must be between 4 and 6 digits")
    .max(6, "PIN must be between 4 and 6 digits")
    .regex(/^\d+$/, "PIN must contain only numbers"),
});

export type ResetPinFormData = z.infer<typeof resetPinSchema>;
