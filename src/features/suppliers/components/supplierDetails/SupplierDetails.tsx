import { useState } from "react";
import type { SupplierWithStats } from "../../types/supplier";
import SupplierInformation from "../SupplierInformation";
import SupplierStats from "../SupplierStats";
import SupplierOverview from "../SupplierOverview";
import SupplierActions from "../SupplierActions";
import PurchaseHistoryTab from "./PurchaseHistoryTab";
import ProductsSuppliedTab from "./ProductsSuppliedTab";
import ActivityTab from "./ActivityTab";
import OverviewTab from "./OverviewTab";
import {
  SUPPLIER_TABS,
  SUPPLIER_TAB_LIST,
  type SupplierTab,
} from "../../constants/supplierTabs";

interface SupplierDetailsProps {
  supplier: SupplierWithStats;
  onEdit: () => void;
  onDelete: () => void;
}

export default function SupplierDetails({
  supplier,
  onEdit,
  onDelete,
}: SupplierDetailsProps) {
  const [activeTab, setActiveTab] = useState<SupplierTab>(
    SUPPLIER_TABS.RECENT_PURCHASES,
  );

  // Helper to generate initials and color
  const getAvatarDetails = (name: string) => {
    const trimmed = name.trim();
    const parts = trimmed.split(" ");
    let initials: string;
    if (parts.length > 1) {
      initials = (parts[0][0] + parts[1][0]).toUpperCase();
    } else if (trimmed.length > 0) {
      initials = trimmed.slice(0, 2).toUpperCase();
    } else {
      initials = "SU";
    }

    // Assign a persistent color depending on supplier name character code
    const charCodeSum = trimmed
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      "bg-purple-100 text-purple-700",
      "bg-emerald-100 text-emerald-700",
      "bg-rose-100 text-rose-700",
      "bg-amber-100 text-amber-700",
      "bg-indigo-100 text-indigo-700",
      "bg-teal-100 text-teal-700",
      "bg-sky-100 text-sky-700",
      "bg-orange-100 text-orange-700",
    ];
    const colorClass = colors[charCodeSum % colors.length];

    return { initials, colorClass };
  };

  const { initials, colorClass } = getAvatarDetails(supplier.name);

  return (
    <div className="space-y-6 h-full flex flex-col min-w-0 text-left">
      {/* Top Header Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-4 min-w-0">
          <div
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-extrabold ${colorClass}`}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight truncate">
                {supplier.name}
              </h2>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold border ${
                  supplier.status === "Active"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                    : "bg-slate-50 text-slate-500 border-slate-200"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${supplier.status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`}
                />
                {supplier.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-semibold truncate max-w-md">
              {supplier.remarks_text || "Food and beverage supplier"}
            </p>
          </div>
        </div>

        <SupplierActions onEdit={onEdit} onDelete={onDelete} />
      </div>

      {/* Information grid cards */}
      <SupplierInformation supplier={supplier} />

      {/* Numerical Stats grid */}
      <SupplierStats supplier={supplier} />

      {/* Timeline Descriptive stats */}
      <SupplierOverview supplier={supplier} />

      {/* Tabs navigation */}
      <div className="border-b border-slate-100 flex items-center justify-between">
        <div className="flex gap-6 overflow-x-auto no-scrollbar">
          {SUPPLIER_TAB_LIST.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-3.5 text-xs font-bold transition-colors relative cursor-pointer whitespace-nowrap ${
                activeTab === tab
                  ? "text-indigo-600 font-extrabold"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Tab content pane */}
      <div className="flex-1 min-h-0">
        {activeTab === SUPPLIER_TABS.RECENT_PURCHASES && (
          <PurchaseHistoryTab supplierId={supplier.id} />
        )}
        {activeTab === SUPPLIER_TABS.PRODUCTS_SUPPLIED && (
          <ProductsSuppliedTab supplierId={supplier.id} />
        )}
        {activeTab === SUPPLIER_TABS.CONTACT_HISTORY && (
          <ActivityTab supplier={supplier} />
        )}
        {activeTab === SUPPLIER_TABS.NOTES && (
          <OverviewTab supplier={supplier} />
        )}
      </div>
    </div>
  );
}
