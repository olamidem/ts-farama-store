import { useState } from "react";
import type { Product } from "../../types/product";
import { ProductDetailsOverviewTab } from "./ProductDetailsOverviewTab";
import { ProductDetailsStockSummary } from "./ProductDetailsStockSummary";
import { ProductDetailsActivity } from "./ProductDetailsActivity";
import { Plus, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import ProductUnitsManager from "../../product-units/components/ProductUnitsManager";

interface ProductDetailsHistoryTabsProps {
  product: Product;
  categoryName?: string;
  onEdit: () => void;
  onAdjustStock: () => void;
  onDuplicate: () => void;
  onPrintBarcode: () => void;
  onArchive: () => void;
}

export const ProductDetailsHistoryTabs = ({
  product,
  categoryName = "General",
  onEdit,
  onAdjustStock,
  onDuplicate,
  onPrintBarcode,
  onArchive,
}: ProductDetailsHistoryTabsProps) => {
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "units"
    | "stock"
    | "sales"
    | "purchase"
    | "summary"
    | "activities"
  >("overview");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "units", label: "Selling Units 🧮" },
    { id: "stock", label: "Stock History" },
    { id: "sales", label: "Sales History" },
    { id: "purchase", label: "Purchase History" },
    { id: "summary", label: "Stock Summary" },
    { id: "activities", label: "Product Activities" },
  ] as const;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Tab Headers */}
      <div className="flex border-b border-slate-100 bg-slate-50/40 px-6 pt-3 gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-bold transition duration-150 border-b-2 relative -bottom-px ${
              activeTab === tab.id
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "overview" && (
          <ProductDetailsOverviewTab
            product={product}
            categoryName={categoryName}
            onEdit={onEdit}
            onAdjustStock={onAdjustStock}
            onDuplicate={onDuplicate}
            onPrintBarcode={onPrintBarcode}
            onArchive={onArchive}
          />
        )}

        {activeTab === "units" && <ProductUnitsManager product={product} />}

        {activeTab === "stock" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
              Stock Movements
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    <th className="pb-2">Date & Time</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Reference</th>
                    <th className="pb-2 text-right">Quantity</th>
                    <th className="pb-2 text-right">New Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  <tr>
                    <td className="py-2.5 font-medium text-slate-500">
                      15 Jul 2026, 02:40 PM
                    </td>
                    <td className="py-2.5">
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                        <ArrowUpRight size={12} /> Adjustment
                      </span>
                    </td>
                    <td className="py-2.5 font-semibold text-slate-800">
                      ADJ-0982
                    </td>
                    <td className="py-2.5 text-right font-bold text-emerald-600">
                      +24
                    </td>
                    <td className="py-2.5 text-right font-bold text-slate-800">
                      {product.stock}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium text-slate-500">
                      15 Jul 2026, 01:15 PM
                    </td>
                    <td className="py-2.5">
                      <span className="inline-flex items-center gap-1 text-rose-600 font-bold">
                        <ArrowDownLeft size={12} /> Sale deduction
                      </span>
                    </td>
                    <td className="py-2.5 font-semibold text-slate-800">
                      INV-2394
                    </td>
                    <td className="py-2.5 text-right font-bold text-rose-600">
                      -2
                    </td>
                    <td className="py-2.5 text-right font-bold text-slate-800">
                      {product.stock - 24}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium text-slate-500">
                      12 Jul 2026, 10:30 AM
                    </td>
                    <td className="py-2.5">
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                        <Plus size={12} /> Initial Stock
                      </span>
                    </td>
                    <td className="py-2.5 font-semibold text-slate-800">
                      PO-4820
                    </td>
                    <td className="py-2.5 text-right font-bold text-emerald-600">
                      +{product.stock - 22}
                    </td>
                    <td className="py-2.5 text-right font-bold text-slate-800">
                      {product.stock - 22}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "sales" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
              Recent Sales
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    <th className="pb-2">Invoice ID</th>
                    <th className="pb-2">Customer</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2 text-right">Qty Sold</th>
                    <th className="pb-2 text-right">Unit Price</th>
                    <th className="pb-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">
                      INV-2394
                    </td>
                    <td className="py-2.5 font-medium text-slate-500">
                      Walk-in Customer
                    </td>
                    <td className="py-2.5 font-medium text-slate-500">
                      15 Jul 2026, 01:15 PM
                    </td>
                    <td className="py-2.5 text-right font-bold text-slate-800">
                      2
                    </td>
                    <td className="py-2.5 text-right font-semibold text-slate-600 font-mono">
                      {formatCurrency(product.selling_price)}
                    </td>
                    <td className="py-2.5 text-right font-extrabold text-slate-900 font-mono">
                      {formatCurrency(product.selling_price * 2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">
                      INV-2381
                    </td>
                    <td className="py-2.5 font-medium text-slate-500">
                      Olamide Yusuf
                    </td>
                    <td className="py-2.5 font-medium text-slate-500">
                      14 Jul 2026, 11:20 AM
                    </td>
                    <td className="py-2.5 text-right font-bold text-slate-800">
                      5
                    </td>
                    <td className="py-2.5 text-right font-semibold text-slate-600 font-mono">
                      {formatCurrency(product.selling_price)}
                    </td>
                    <td className="py-2.5 text-right font-extrabold text-slate-900 font-mono">
                      {formatCurrency(product.selling_price * 5)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "purchase" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
              Recent Purchase Orders
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    <th className="pb-2">Order Ref</th>
                    <th className="pb-2">Supplier</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2 text-right">Qty Ordered</th>
                    <th className="pb-2 text-right">Cost Price</th>
                    <th className="pb-2 text-right">Total Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">PO-4820</td>
                    <td className="py-2.5 font-medium text-slate-500">
                      Coca-Cola Beverages Nigeria
                    </td>
                    <td className="py-2.5 font-medium text-slate-500">
                      12 Jul 2026, 10:30 AM
                    </td>
                    <td className="py-2.5 text-right font-bold text-slate-800">
                      100
                    </td>
                    <td className="py-2.5 text-right font-semibold text-slate-600 font-mono">
                      {formatCurrency(product.cost_price)}
                    </td>
                    <td className="py-2.5 text-right font-extrabold text-slate-900 font-mono">
                      {formatCurrency(product.cost_price * 100)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "summary" && (
          <ProductDetailsStockSummary product={product} />
        )}

        {activeTab === "activities" && (
          <ProductDetailsActivity product={product} />
        )}
      </div>
    </div>
  );
};
