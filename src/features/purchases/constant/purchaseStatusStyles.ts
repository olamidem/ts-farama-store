import { STATUS_COLORS } from "../../../lib/statusColors";
import { PURCHASE_STATUS, type PurchaseStatus } from "./purchase.constants";

export const PURCHASE_STATUS_STYLES: Record<PurchaseStatus, string> = {
  [PURCHASE_STATUS.PENDING]: STATUS_COLORS.amber,
  [PURCHASE_STATUS.APPROVED]: STATUS_COLORS.violet,
  [PURCHASE_STATUS.ORDERED]: STATUS_COLORS.indigo,
  [PURCHASE_STATUS.PARTIALLY_RECEIVED]: STATUS_COLORS.sky,
  [PURCHASE_STATUS.RECEIVED]: STATUS_COLORS.emerald,

};
