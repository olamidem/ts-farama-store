import { useState } from "react";
import { Search, ChevronRight, SlidersHorizontal, Plus } from "lucide-react";
import type { SupplierWithStats } from "../types/supplier";

interface SupplierTableProps {
  suppliers: SupplierWithStats[];
  selectedSupplierId?: string;
  onSelectSupplier: (supplier: SupplierWithStats) => void;
  onAddSupplier?: () => void;
}

export default function SupplierTable({
  suppliers,
  selectedSupplierId,
  onSelectSupplier,
  onAddSupplier,
}: SupplierTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");
  const [showFilters, setShowFilters] = useState(false);

  // Filter suppliers by name, address, or email and by status
  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(search.toLowerCase()) ||
      (supplier.address || "").toLowerCase().includes(search.toLowerCase()) ||
      (supplier.email || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || supplier.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
      "bg-purple-100 text-purple-600 border-purple-200",
      "bg-emerald-100 text-emerald-600 border-emerald-200",
      "bg-rose-100 text-rose-600 border-rose-200",
      "bg-amber-100 text-amber-600 border-amber-200",
      "bg-indigo-100 text-indigo-600 border-indigo-200",
      "bg-teal-100 text-teal-600 border-teal-200",
      "bg-sky-100 text-sky-600 border-sky-200",
      "bg-orange-100 text-orange-600 border-orange-200",
    ];
    const colorClass = colors[charCodeSum % colors.length];

    return { initials, colorClass };
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-100 shadow-2xs p-5 overflow-hidden">
      {/* Title & Add Button */}
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Suppliers
        </h2>
        {onAddSupplier && (
          <button
            onClick={onAddSupplier}
            type="button"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 transition cursor-pointer select-none shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Supplier
          </button>
        )}
      </div>

      {/* Search & Filter */}
      <div className="space-y-2 pb-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search suppliers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2.5 rounded-xl border transition cursor-pointer shrink-0 ${
              showFilters || statusFilter !== "All"
                ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                : "border-slate-200 bg-white hover:bg-slate-50 text-slate-400"
            }`}
            title="Filter suppliers"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Status Pills Row */}
        {showFilters && (
          <div className="flex items-center gap-1.5 pt-1 animate-fadeIn">
            {(["All", "Active", "Inactive"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                className={`rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition ${
                  statusFilter === filter
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Supplier Count */}
      <div className="text-left py-1">
        <span className="text-xs font-bold text-slate-400">
          {filteredSuppliers.length} suppliers
        </span>
      </div>

      {/* Supplier List */}
      <div className="flex-1 overflow-y-auto mt-3 space-y-2 pr-1 no-scrollbar">
        {filteredSuppliers.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 italic">
            No suppliers match your criteria.
          </div>
        ) : (
          filteredSuppliers.map((supplier) => {
            const isSelected = supplier.id === selectedSupplierId;
            const { initials, colorClass } = getAvatarDetails(supplier.name);

            return (
              <div
                key={supplier.id}
                onClick={() => onSelectSupplier(supplier)}
                className={`flex items-center gap-3.5 p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer select-none relative ${
                  isSelected
                    ? "bg-[#EEF2FF] text-[#4F46E5]"
                    : "hover:bg-slate-50/70 text-slate-800 bg-transparent"
                }`}
              >
                {/* Avatar with Initials */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-extrabold border ${
                    isSelected
                      ? "bg-indigo-600 border-indigo-500 text-white"
                      : colorClass
                  }`}
                >
                  {initials}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs font-extrabold truncate ${isSelected ? "text-slate-900" : "text-slate-800"}`}
                  >
                    {supplier.name}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 truncate">
                    {supplier.address || "No Address"}
                  </p>
                </div>

                {/* Select icon indicator */}
                <ChevronRight
                  className={`h-4 w-4 shrink-0 transition-transform ${
                    isSelected
                      ? "text-indigo-600 translate-x-0.5"
                      : "text-slate-300"
                  }`}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
