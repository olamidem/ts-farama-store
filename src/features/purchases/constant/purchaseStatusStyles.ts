import type { PurchaseStatus } from "./purchase.constants";

export const PURCHASE_STATUS_STYLES: Record<PurchaseStatus, string> = {
  DRAFT: "bg-slate-50 text-slate-600 border border-slate-200/60",
  PENDING: "bg-amber-50 text-amber-600 border border-amber-200/60",
  APPROVED: "bg-violet-50 text-violet-600 border border-violet-200/60",
  ORDERED: "bg-indigo-50 text-indigo-600 border border-indigo-200/60",
  PARTIALLY_RECEIVED: "bg-sky-50 text-sky-600 border border-sky-200/60",
  RECEIVED: "bg-emerald-50 text-emerald-600 border border-emerald-200/60",
  CLOSED: "bg-rose-50 text-rose-600 border border-rose-200/60",
};
