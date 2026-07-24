export const USER_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED",
} as const;


export type RoleName =
  | "Administrator"
  | "Manager"
  | "Accountant"
  | "Storekeeper"
  | "Cashier";

  export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];