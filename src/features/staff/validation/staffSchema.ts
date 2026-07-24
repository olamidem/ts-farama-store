import { z } from "zod";
import { USER_STATUS } from "../../auth/types/enums";

const pinSchema = z
  .string()
  .trim()
  .min(4, "PIN must be between 4 and 6 digits")
  .max(6, "PIN must be between 4 and 6 digits")
  .regex(/^\d+$/, "PIN must contain only numbers");

export const staffSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters"),

  email: z.string().trim().email("Invalid email address"),

  phone: z.string().trim().min(5, "Phone number must be at least 5 digits"),

  role: z.string().min(1, "Please select a role"),

  pin: pinSchema,
});

export const editStaffSchema = staffSchema.omit({ pin: true }).extend({
  status: z.enum([
    USER_STATUS.ACTIVE,
    USER_STATUS.INACTIVE,
    USER_STATUS.SUSPENDED,
  ]),
});

export type StaffFormData = z.infer<typeof staffSchema>;
export type EditStaffFormData = z.infer<typeof editStaffSchema>;
