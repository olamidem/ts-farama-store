import { supabase } from "../../../api/supabase";
import { throwSupabaseError } from "../../../utils/supabaseError";
import type {
  InventorySummary,
  StockAdjustmentInput,
  ProductStockOverviewItem,
} from "../types/inventory";
import type {
  InventoryTransaction,
  InventoryTransactionWithRelations,
} from "../types/inventoryTransaction";

/**
 * Fetch list of inventory transactions with relations (product, product_unit, and creator profile)
 */
export const getInventoryTransactions = async (): Promise<
  InventoryTransactionWithRelations[]
> => {
  const { data, error } = await supabase
    .from("inventory_transactions")
    .select(
      `
      *,
      product:products(id, name, sku, barcode),
      product_unit:product_units(
        id,
        sku,
        conversion_factor,
        unit:units(name, symbol)
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    throwSupabaseError(error);
  }

  // Map and fill creator profile names since client auth profiles can be tricky
  // We'll also fetch the current user's details to match user IDs if possible
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const formatted = (data || []).map(
    (
      tx: {
        created_by: string | null;
        profiles?: { raw_user_meta_data?: { name?: string } } | null;
      } & Record<string, unknown>,
    ) => {
      let userName = "System Admin";
      if (user && tx.created_by === user.id) {
        userName =
          user.user_metadata?.name ||
          user.user_metadata?.full_name ||
          user.email?.split("@")[0] ||
          "Admin User";
      } else if (tx.created_by) {
        // General fallback or try to read raw data
        userName = tx.profiles?.raw_user_meta_data?.name || "Admin User";
      }

      return {
        ...tx,
        profiles: {
          raw_user_meta_data: {
            name: userName,
          },
          email: user?.email,
        },
      } as InventoryTransactionWithRelations;
    },
  );

  return formatted;
};

/**
 * Fetch inventory dashboard summary stats
 */
interface ProductRow {
  id: string;
  name?: string;
  sku?: string;
  stock?: number | null;
  selling_price?: number | null;
  min_stock_alert?: number | null;
  is_active?: boolean;
  base_unit_id?: string | null;
}

interface UnitRow {
  id: string;
  name: string;
  symbol: string;
}

export const getInventorySummary = async (): Promise<InventorySummary> => {
  const { data: products, error } = await supabase
    .from("products")
    .select("id, stock, selling_price, min_stock_alert, is_active");

  if (error) {
    throwSupabaseError(error);
  }

  const activeProducts = ((products || []) as unknown as ProductRow[]).filter(
    (p) => p.is_active !== false,
  );
  const totalProducts = activeProducts.length;
  const lowStockItems = activeProducts.filter(
    (p) => (p.stock || 0) <= (p.min_stock_alert || 0),
  ).length;
  const totalStockAllUnits = activeProducts.reduce(
    (sum: number, p) => sum + (p.stock || 0),
    0,
  );
  const totalInventoryValue = activeProducts.reduce(
    (sum: number, p) => sum + (p.stock || 0) * (p.selling_price || 0),
    0,
  );

  return {
    totalProducts,
    lowStockItems,
    totalStockAllUnits,
    totalInventoryValue,
  };
};

interface ProductUnitQueryResult {
  id: string;
  conversion_factor: number;
  unit: {
    id: string;
    name: string;
    symbol: string;
  } | null;
}

interface ProductQueryResult {
  id: string;
  name: string | null;
  sku: string | null;
  stock: number | null;
  min_stock_alert: number | null;
  is_active: boolean | null;
  base_unit_id: string | null;
  product_units: ProductUnitQueryResult[] | null;
}

/**
 * Fetch the product stock overview table items
 */
export const getProductStockOverview = async (): Promise<
  ProductStockOverviewItem[]
> => {
  // Query active products along with product_units and their related units
  const { data: products, error: prodErr } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      sku,
      stock,
      min_stock_alert,
      is_active,
      base_unit_id,
      product_units(
        id,
        conversion_factor,
        unit:units(
          id,
          name,
          symbol
        )
      )
    `,
    )
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (prodErr) {
    throwSupabaseError(prodErr);
  }

  // Fetch unit names for displaying base units
  const { data: units, error: unitErr } = await supabase
    .from("units")
    .select("id, name, symbol");

  if (unitErr) {
    throwSupabaseError(unitErr);
  }

  const unitSymbolsMap = new Map<string, string>();
  const unitNamesMap = new Map<string, string>();
  ((units || []) as unknown as UnitRow[]).forEach((u) => {
    unitSymbolsMap.set(u.id, u.symbol);
    unitNamesMap.set(u.id, u.name);
  });

  const overviewItems: ProductStockOverviewItem[] = (
    (products || []) as unknown as ProductQueryResult[]
  ).map((p) => {
    const stock = p.stock || 0;
    const minAlert = p.min_stock_alert || 0;
    let status: "In Stock" | "Low Stock" | "Out of Stock" = "In Stock";
    if (stock === 0) {
      status = "Out of Stock";
    } else if (stock <= minAlert) {
      status = "Low Stock";
    }

    const baseUnitSymbol =
      (p.base_unit_id && unitSymbolsMap.get(p.base_unit_id)) || "pcs";
    const baseUnitName =
      (p.base_unit_id && unitNamesMap.get(p.base_unit_id)) || "Piece";

    // Find first product unit with conversion factor > 1 (e.g. Carton of 24, Bag of 50)
    const packUnit = p.product_units?.find((pu) => pu.conversion_factor > 1);

    let unitDisplay = `${baseUnitName} (${baseUnitSymbol})`;
    if (packUnit && packUnit.unit) {
      unitDisplay = `${packUnit.unit.name} (${packUnit.conversion_factor} ${baseUnitSymbol})`;
    } else if (p.product_units && p.product_units.length > 0) {
      // If there's only factor 1 unit, use its name or fallback
      const firstUnit = p.product_units[0];
      if (firstUnit && firstUnit.unit) {
        unitDisplay = firstUnit.unit.name;
      }
    }

    return {
      id: p.id,
      name: p.name || "Unknown Product",
      sku: p.sku || "N/A",
      unit: unitDisplay,
      stock: stock,
      reserved: 0, // Placeholder as in standard mockup
      available: stock,
      status,
      min_stock_alert: minAlert,
      default_product_unit_id: p.product_units?.[0]?.id || "",
    };
  });

  return overviewItems;
};

/**
 * Create a new stock adjustment transaction and update product stock balance
 */
export const createStockAdjustment = async (
  input: StockAdjustmentInput,
): Promise<InventoryTransaction> => {
  // 1. Fetch product unit to find conversion factor
  const { data: productUnit, error: puErr } = await supabase
    .from("product_units")
    .select("id, conversion_factor, sku")
    .eq("id", input.product_unit_id)
    .single();

  if (puErr) {
    throwSupabaseError(puErr);
  }

  const conversionFactor = productUnit?.conversion_factor || 1;

  // 2. Compute the base unit stock change
  // input.quantity is the transaction quantity in the selected product unit
  const baseStockChange = input.quantity * conversionFactor;

  // 3. Fetch product current stock
  const { data: product, error: prodErr } = await supabase
    .from("products")
    .select("id, stock")
    .eq("id", input.product_id)
    .single();

  if (prodErr) {
    throwSupabaseError(prodErr);
  }

  const currentStock = product?.stock || 0;
  const newStock = currentStock + baseStockChange;

  if (newStock < 0) {
    throw new Error(
      `Insufficient stock. Current stock is ${currentStock} base units.`,
    );
  }

  // 4. Get authenticated user ID
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const createdBy = user ? user.id : null;

  // 5. Update the product stock in database
  const { error: updateErr } = await supabase
    .from("products")
    .update({ stock: newStock })
    .eq("id", input.product_id);

  if (updateErr) {
    throwSupabaseError(updateErr);
  }

  // 6. Insert the transaction into inventory_transactions
  const transactionPayload = {
    product_id: input.product_id,
    product_unit_id: input.product_unit_id,
    quantity: baseStockChange, // Record quantity change in base unit or standard display
    balance_after: newStock,
    transaction_type: input.transaction_type,
    reference: input.reference,
    remarks: input.remarks || null,
    created_by: createdBy,
  };

  const { error } = await supabase
    .from("inventory_transactions")
    .insert(transactionPayload)
    .select()
    .single();

  if (error) throw error;

  return {
    id: `adj-tx-${Math.random().toString(36).substr(2, 9)}`,
    product_id: input.product_id,
    product_unit_id: input.product_unit_id,
    quantity: baseStockChange,
    balance_after: newStock,
    transaction_type: input.transaction_type,
    reference: input.reference,
    remarks: input.remarks || null,
    created_by: createdBy,
    created_at: new Date().toISOString(),
  } as unknown as InventoryTransaction;
};
