export const PURCHASE_OVERVIEW_TABS = {
  OVERVIEW: "overview",
  ITEMS: "items",
  RECEIVE: "receive",
  HISTORY: "history",
} as const;

export type PurchaseOverviewTab =
  (typeof PURCHASE_OVERVIEW_TABS)[keyof typeof PURCHASE_OVERVIEW_TABS];
