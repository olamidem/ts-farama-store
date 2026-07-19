export const PURCHASE_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  ORDERED: "ORDERED",
  PARTIALLY_RECEIVED: "PARTIALLY_RECEIVED",
  RECEIVED: "RECEIVED",
} as const;

export type PurchaseStatus =
  (typeof PURCHASE_STATUS)[keyof typeof PURCHASE_STATUS];

export const PURCHASE_STATUS_OPTIONS = [
  { label: "Pending", value: PURCHASE_STATUS.PENDING },
  { label: "Approved", value: PURCHASE_STATUS.APPROVED },
  { label: "Ordered", value: PURCHASE_STATUS.ORDERED },
  { label: "Partially Received", value: PURCHASE_STATUS.PARTIALLY_RECEIVED },
  { label: "Received", value: PURCHASE_STATUS.RECEIVED },
];
