export const QUERY_KEYS = {
  products: ["products"],
  categories: ["categories"],
  sales: ["sales"],
  users: ["users"],
  suppliers: ["suppliers"],
  units: ["units"],
  productUnits: ["product-units"],
  inventoryTransactions: ["inventory-transactions"],
  purchases: ["purchases"],
  purchase: (id: string) => ["purchase", id],
} as const;
