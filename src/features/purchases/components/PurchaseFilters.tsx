import { Search, SlidersHorizontal, Download, Calendar } from "lucide-react";
import type { Supplier } from "../types/supplier";
import { useSuppliers } from "../hook/usePurchases";

interface PurchaseFiltersProps {
  search: string;
  setSearch: (val: string) => void;
  supplierId: string;
  setSupplierId: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
  onExport?: () => void;
}

export const PurchaseFilters = ({
  search,
  setSearch,
  supplierId,
  setSupplierId,
  status,
  setStatus,
  onExport,
}: PurchaseFiltersProps) => {
  const { data: suppliers = [] } = useSuppliers();

  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white p-4.5 rounded-2xl border border-slate-100 shadow-2xs">
      {/* Search & Selectors Group */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 flex-1">
        {/* Search Input */}
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <Search size={15} />
          </span>
          <input
            type="text"
            placeholder="Search by PO number or supplier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9.5 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500/30 focus:border-indigo-500 font-medium text-slate-700 transition"
          />
        </div>

        {/* Suppliers Dropdown */}
        <div>
          <select
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-600 font-semibold cursor-pointer transition"
          >
            <option value="all">All Suppliers</option>
            {suppliers.map((s: Supplier) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status Dropdown */}
        <div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-600 font-semibold cursor-pointer transition"
          >
            <option value="all">All Status</option>
            <option value="DRAFT">Draft</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="ORDERED">Ordered</option>
            <option value="PARTIALLY_RECEIVED">Partially Received</option>
            <option value="RECEIVED">Received</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>

        {/* Date Filter Indicator */}
        <div className="relative flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2 bg-white text-xs font-semibold text-slate-500 cursor-pointer hover:bg-slate-50">
          <span className="flex items-center gap-2">
            <Calendar size={14} className="text-slate-400" />
            <span>All Dates</span>
          </span>
        </div>
      </div>

      {/* Filter and Export buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          className="flex items-center gap-1.5 px-4.5 py-2 text-xs border border-slate-200 bg-white text-slate-600 font-bold rounded-xl hover:bg-slate-50 cursor-pointer shadow-3xs hover:text-slate-800 transition"
        >
          <SlidersHorizontal size={13} />
          <span>Filter</span>
        </button>

        <button
          onClick={onExport}
          type="button"
          className="flex items-center gap-1.5 px-4.5 py-2 text-xs border border-slate-200 bg-white text-slate-600 font-bold rounded-xl hover:bg-slate-50 cursor-pointer shadow-3xs hover:text-slate-800 transition"
        >
          <Download size={13} />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
};

export default PurchaseFilters;
