import type { Supplier, SupplierWithStats } from "../types/supplier";


// Parse remarks column. If it's structured JSON, extract values. Otherwise, treat as plain text.
export function parseSupplierRemarks(remarksStr: string | undefined): {
  contact_person: string;
  payment_terms: string;
  status: "Active" | "Inactive";
  remarks_text: string;
} {
  const defaultResult = {
    contact_person: "",
    payment_terms: "Net 30",
    status: "Active" as const,
    remarks_text: remarksStr || "",
  };

  if (!remarksStr) {
    return defaultResult;
  }

  try {
    const trimmed = remarksStr.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      const parsed = JSON.parse(trimmed);
      return {
        contact_person: parsed.contact_person || "",
        payment_terms: parsed.payment_terms || "Net 30",
        status: parsed.status === "Inactive" ? "Inactive" : "Active",
        remarks_text: parsed.remarks_text || "",
      };
    }
  } catch {
    // Treat as plain text
  }

  // Attempt to parse standard key-values if plain text has certain formatting
  return defaultResult;
}

// Package fields into a JSON string for the remarks column
export function serializeSupplierRemarks(
  remarks_text: string,
  contact_person: string,
  payment_terms: string,
  status: "Active" | "Inactive",
): string {
  const payload = {
    contact_person,
    payment_terms,
    status,
    remarks_text,
  };
  return JSON.stringify(payload);
}

interface HelperPurchaseItem {
  id: string;
  product_id?: string;
  unit_cost?: number;
  received_quantity?: number;
  product?: {
    id: string;
    name: string;
    sku?: string;
    cost_price?: number;
    stock?: number;
  };
}

interface HelperPurchase {
  id: string;
  supplier_id: string | null | undefined;
  total_amount?: number;
  status: string;
  purchase_date?: string;
  created_at: string;
  updated_at?: string;
  items?: HelperPurchaseItem[];
}

// Compute supplier metrics using the actual loaded purchases
export function computeSupplierStats(
  supplier: Supplier,
  purchases: HelperPurchase[],
): SupplierWithStats {
  const parsedRemarks = parseSupplierRemarks(supplier.remarks);

  // Filter purchases for this supplier
  const supplierPurchases = purchases.filter(
    (p) =>
      p.supplier_id !== null &&
      p.supplier_id !== undefined &&
      String(p.supplier_id) === String(supplier.id),
  );

  const totalPurchases = supplierPurchases.length;

  // Total Spend is sum of total_amount of purchases that are not cancelled (e.g. status in PENDING, RECEIVED, PARTIALLY_RECEIVED, etc.)
  const totalSpend = supplierPurchases.reduce(
    (sum, p) => sum + (p.total_amount || 0),
    0,
  );

  const pendingPurchases = supplierPurchases.filter(
    (p) => p.status === "PENDING" || p.status === "PARTIALLY_RECEIVED",
  ).length;

  // Unique products supplied
  const productIds = new Set<string>();
  supplierPurchases.forEach((p) => {
    if (p.items && Array.isArray(p.items)) {
      p.items.forEach((item) => {
        if (item.product_id) {
          productIds.add(String(item.product_id));
        }
      });
    }
  });
  const productsSupplied = productIds.size;

  // Last purchase date
  let lastPurchaseDate: string | undefined = undefined;
  if (supplierPurchases.length > 0) {
    // Sort descending by date or created_at
    const sorted = [...supplierPurchases].sort(
      (a, b) =>
        new Date(b.purchase_date || b.created_at).getTime() -
        new Date(a.purchase_date || a.created_at).getTime(),
    );
    lastPurchaseDate = sorted[0].purchase_date || sorted[0].created_at;
  }

  const averageOrderValue =
    totalPurchases > 0 ? totalSpend / totalPurchases : 0;

  return {
    ...supplier,
    ...parsedRemarks,
    totalPurchases,
    totalSpend,
    pendingPurchases,
    productsSupplied,
    lastPurchaseDate,
    averageOrderValue,
    supplierSince: supplier.created_at,
  };
}
