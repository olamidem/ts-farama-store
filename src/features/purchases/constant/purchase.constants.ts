export const PURCHASE_STATUS = {
  DRAFT: "DRAFT",
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  ORDERED: "ORDERED",
  PARTIALLY_RECEIVED: "PARTIALLY_RECEIVED",
  RECEIVED: "RECEIVED",
  CLOSED: "CLOSED",
} as const;

export type PurchaseStatus =
  (typeof PURCHASE_STATUS)[keyof typeof PURCHASE_STATUS];

export const PURCHASE_STATUS_OPTIONS = [
  { label: "Draft", value: PURCHASE_STATUS.DRAFT },
  { label: "Pending", value: PURCHASE_STATUS.PENDING },
  { label: "Approved", value: PURCHASE_STATUS.APPROVED },
  { label: "Ordered", value: PURCHASE_STATUS.ORDERED },
  { label: "Partially Received", value: PURCHASE_STATUS.PARTIALLY_RECEIVED },
  { label: "Received", value: PURCHASE_STATUS.RECEIVED },
  { label: "Closed", value: PURCHASE_STATUS.CLOSED },
];
