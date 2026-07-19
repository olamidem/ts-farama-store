import {
  PURCHASE_STATUS,
  type PurchaseStatus,
} from "../constant/purchase.constants";
import { PURCHASE_STATUS_STYLES } from "../constant/purchaseStatusStyles";

const STATUS_TEXT: Record<PurchaseStatus, string> = {
  [PURCHASE_STATUS.PENDING]: "Pending",
  [PURCHASE_STATUS.APPROVED]: "Approved",
  [PURCHASE_STATUS.ORDERED]: "Ordered",
  [PURCHASE_STATUS.PARTIALLY_RECEIVED]: "Partially Received",
  [PURCHASE_STATUS.RECEIVED]: "Received",
};

export function formatPurchaseStatus(status: PurchaseStatus) {
  return STATUS_TEXT[status] || status;
}

export function formatStatusText(status: PurchaseStatus) {
  return STATUS_TEXT[status] || status;
}

export function getStatusBadgeStyle(status: PurchaseStatus) {
  return PURCHASE_STATUS_STYLES[status] || "";
}
