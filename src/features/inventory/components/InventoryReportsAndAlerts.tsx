import { useState, useMemo } from "react";
import {
  Printer,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../../utils/cn";
import * as XLSX from "xlsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type {
  ProductStockOverviewItem,
  InventorySummary,
  InventorySettings,
} from "../types/inventory";
import type { InventoryTransactionWithRelations } from "../types/inventoryTransaction";


// ==========================================
// 1. Inventory Valuation & Reports Panel
// ==========================================
interface InventoryReportsPanelProps {
  transactions: InventoryTransactionWithRelations[];
  stockOverview: ProductStockOverviewItem[];
  summary: InventorySummary | undefined;
}

export const InventoryReportsPanel = ({
  transactions,
  stockOverview,
  summary,
}: InventoryReportsPanelProps) => {
  // Compute chart of top 8 products by total stock value
  const topStockValueChart = useMemo(() => {
    return stockOverview
      .map((item) => {
        const unitVal = 45; // base unit estimation
        return {
          name:
            item.name.substring(0, 15) + (item.name.length > 15 ? "..." : ""),
          StockValue: item.stock * unitVal,
          Qty: item.stock,
        };
      })
      .sort((a, b) => b.StockValue - a.StockValue)
      .slice(0, 8);
  }, [stockOverview]);

  // Compute transaction types breakdown pie chart
  const transactionBreakdownChart = useMemo(() => {
    const types: Record<string, number> = {};
    transactions.forEach((tx) => {
      types[tx.transaction_type] = (types[tx.transaction_type] || 0) + 1;
    });

    const colors = [
      "#4F46E5",
      "#10B981",
      "#EF4444",
      "#F59E0B",
      "#8B5CF6",
      "#EC4899",
    ];
    return Object.entries(types).map(([name, val], idx) => ({
      name,
      value: val,
      color: colors[idx % colors.length],
    }));
  }, [transactions]);

  // Export to spreadsheet XLSX using sheetjs
  const handleSpreadsheetExport = () => {
    if (stockOverview.length === 0) {
      toast.error("No active stock records available to export.");
      return;
    }

    try {
      // 1. Stock sheet
      const stockData = stockOverview.map((item) => ({
        "Product Name": item.name,
        SKU: item.sku,
        "System Stock (Pcs)": item.stock,
        "Min Stock Threshold": item.min_stock_alert,
        Status: item.status,
      }));

      // 2. Transaction Logs sheet
      const txData = transactions.map((tx) => ({
        Timestamp: new Date(tx.created_at).toLocaleString(),
        "Product Name": tx.product?.name || "N/A",
        "SKU Code": tx.product?.sku || "N/A",
        "Tx Type": tx.transaction_type,
        "Quantity Transacted": tx.quantity,
        "Balance Post-Tx": tx.balance_after,
        "Document Ref": tx.reference,
        Remarks: tx.remarks || "",
      }));

      const wb = XLSX.utils.book_new();

      const wsStock = XLSX.utils.json_to_sheet(stockData);
      XLSX.utils.book_append_sheet(wb, wsStock, "Physical Stock Summary");

      if (txData.length > 0) {
        const wsTx = XLSX.utils.json_to_sheet(txData);
        XLSX.utils.book_append_sheet(wb, wsTx, "Transaction Ledger");
      }

      XLSX.writeFile(wb, `Farama_Inventory_Report_${Date.now()}.xlsx`);
      toast.success("Excel Spreadsheet generated and downloaded successfully!");
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Spreadsheet generation failed.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner Toolbar */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
        >
          <Printer size={14} />
          <span>Print Statement</span>
        </button>

        <button
          onClick={handleSpreadsheetExport}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
        >
          <FileSpreadsheet size={14} />
          <span>Export Excel Ledger</span>
        </button>
      </div>

      {/* Reports Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-slate-100 bg-slate-50 p-4 rounded-2xl">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Unique SKUs Catalogued
          </span>
          <span className="block text-xl font-black text-slate-900 mt-1">
            {stockOverview.length}
          </span>
        </div>

        <div className="border border-slate-100 bg-slate-50 p-4 rounded-2xl">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Audited Logs
          </span>
          <span className="block text-xl font-black text-slate-900 mt-1">
            {transactions.length}
          </span>
        </div>

        <div className="border border-slate-100 bg-slate-50 p-4 rounded-2xl">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Estimated Inventory Value
          </span>
          <span className="block text-xl font-black text-emerald-600 mt-1">
            $
            {summary?.totalInventoryValue ||
              stockOverview.reduce((acc, c) => acc + c.stock * 45, 0)}
          </span>
        </div>

        <div className="border border-slate-100 bg-slate-50 p-4 rounded-2xl">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Low Stock Ratio
          </span>
          <span className="block text-xl font-black text-amber-500 mt-1">
            {stockOverview.length
              ? Math.round(
                  (stockOverview.filter((s) => s.stock <= s.min_stock_alert)
                    .length /
                    stockOverview.length) *
                    100,
                )
              : 0}
            %
          </span>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar chart */}
        <div className="border border-slate-100 p-5 rounded-3xl bg-white space-y-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Estimated Stock Asset Valuation
            </h4>
            <p className="text-[11px] text-slate-400 font-semibold">
              Top products ranked by cumulative financial valuation.
            </p>
          </div>
          <div className="h-64 w-full">
            {topStockValueChart.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs font-semibold">
                No stock valuation data.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topStockValueChart}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#F1F5F9"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#94A3B8"
                    fontSize={10}
                    tickLine={false}
                  />
                  <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                  <Tooltip />
                  <Bar
                    dataKey="StockValue"
                    fill="#4F46E5"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Pie chart */}
        <div className="border border-slate-100 p-5 rounded-3xl bg-white space-y-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Transaction Type Distribution
            </h4>
            <p className="text-[11px] text-slate-400 font-semibold">
              Proportional share of transactional operations.
            </p>
          </div>
          <div className="h-64 w-full flex flex-col md:flex-row items-center justify-center gap-4">
            {transactionBreakdownChart.length === 0 ? (
              <div className="text-slate-400 text-xs font-semibold">
                No transactions registered.
              </div>
            ) : (
              <>
                <div className="h-48 w-48 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={transactionBreakdownChart}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {transactionBreakdownChart.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-1 text-xs">
                  {transactionBreakdownChart.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="font-bold text-slate-700">
                        {entry.name}:
                      </span>
                      <span className="font-mono font-semibold text-slate-500">
                        {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. Low Stock Alerts Panel
// ==========================================
interface LowStockAlertsPanelProps {
  stockOverview: ProductStockOverviewItem[];
  isLoading: boolean;
  onReplenish: () => void;
}

export const LowStockAlertsPanel = ({
  stockOverview,
  isLoading,
  onReplenish,
}: LowStockAlertsPanelProps) => {
  const lowStockItems = useMemo(() => {
    return stockOverview.filter((item) => item.stock <= item.min_stock_alert);
  }, [stockOverview]);

  if (isLoading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center space-y-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
        <p className="text-xs text-slate-400 font-semibold">
          Loading stock table...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      {lowStockItems.length === 0 ? (
        <div className="py-16 text-center border-2 border-dashed border-emerald-100 rounded-3xl bg-emerald-50/10 space-y-3">
          <CheckCircle className="mx-auto text-emerald-500" size={32} />
          <h4 className="text-sm font-bold text-slate-900">
            All Stock Levels Balanced
          </h4>
          <p className="text-xs text-slate-400 font-semibold">
            Every product catalogued has a physical stock level safe above
            reorder threshold limits.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Alerts List */}
          <div className="md:col-span-2 border border-slate-100 rounded-2xl overflow-hidden shadow-xs bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Product Details
                  </th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                    Stock
                  </th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                    Alert Threshold
                  </th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs">
                {lowStockItems.map((item) => {
                  const isOut = item.stock === 0;
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/50 transition"
                    >
                      <td className="p-4">
                        <p className="font-bold text-slate-800">{item.name}</p>
                        <p className="text-[10px] font-mono font-semibold text-slate-400 mt-0.5">
                          SKU: {item.sku}
                        </p>
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={cn(
                            "inline-flex items-center font-mono font-bold px-2 py-0.5 rounded text-[10px]",
                            isOut
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700",
                          )}
                        >
                          {isOut ? "OUT OF STOCK" : `${item.stock} left`}
                        </span>
                      </td>
                      <td className="p-4 text-center font-mono font-semibold text-slate-500">
                        {item.min_stock_alert}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={onReplenish}
                          className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold rounded-lg border border-indigo-200 transition cursor-pointer"
                        >
                          Replenish
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Quick guide card */}
          <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-5 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <AlertTriangle className="text-amber-500" size={16} />
              <span>Safety Reorder Guide</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              Reorder stock levels immediately when products fall into warning
              mode. Low stock items are also automatically populated in order
              recommendation worksheets.
            </p>
            <div className="space-y-2 pt-2 border-t border-amber-100 text-xs text-slate-700">
              <div className="flex justify-between">
                <span>Total Catalog Items:</span>
                <span className="font-bold">{stockOverview.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Alerts Triggered:</span>
                <span className="font-bold text-amber-600">
                  {lowStockItems.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 3. Inventory Settings Panel
// ==========================================
interface InventorySettingsFormPanelProps {
  settings: InventorySettings;
  onSave: (payload: InventorySettings) => void;
}

export const InventorySettingsFormPanel = ({
  settings,
  onSave,
}: InventorySettingsFormPanelProps) => {
  const [minAlert, setMinAlert] = useState(settings.defaultMinAlert);
  const [prefix, setPrefix] = useState(settings.refPrefix);
  const [operator, setOperator] = useState(settings.operatorName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      defaultMinAlert: Number(minAlert),
      refPrefix: prefix.toUpperCase().trim(),
      operatorName: operator.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4 text-left"
    >
      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Default Minimum Stock Alert level
        </label>
        <input
          type="number"
          min={1}
          value={minAlert}
          onChange={(e) => setMinAlert(Number(e.target.value))}
          required
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-mono font-bold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
        />
        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
          Default threshold applied during product creation when no custom min
          limit is entered.
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Document reference Prefix
        </label>
        <input
          type="text"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          required
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-mono font-bold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Default Operator Profile
        </label>
        <input
          type="text"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          required
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-sm cursor-pointer mt-4"
      >
        Save Inventory Preferences
      </button>
    </form>
  );
};
