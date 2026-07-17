import {
  Package,
  MoreHorizontal,
  Pencil,
  Trash2,
  Layers,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";


import type { Category } from "../types/category";
import { formatCurrency } from "../../../utils/formatCurrenty";

interface CategoryCardProps {
  category: Category;
  productCount: number;
  totalStock: number;
  totalValuation: number;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

const CategoryCard = ({
  category,
  productCount,
  totalStock,
  totalValuation,
  onEdit,
  onDelete,
}: CategoryCardProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{
        duration: 0.15,
      }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative"
    >
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100/50">
              <Package size={20} className="text-blue-600" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">
                  {category.name}
                </h3>
                <span className="rounded bg-slate-100 border border-slate-200/50 px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-500 uppercase">
                  {category.sku_prefix}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {category.description || "No description"}
              </p>
            </div>
          </div>

          {/* Action Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="rounded-xl p-2 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer"
            >
              <MoreHorizontal size={18} className="text-slate-400" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-36 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg ring-1 ring-black/5 focus:outline-none z-10 animate-in fade-in slide-in-from-top-1 duration-100">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onEdit(category);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition duration-150 cursor-pointer"
                >
                  <Pencil size={13} className="text-slate-400" />
                  <span>Edit Category</span>
                </button>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onDelete(category);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50/50 hover:text-rose-700 transition duration-150 cursor-pointer"
                >
                  <Trash2 size={13} className="text-rose-400" />
                  <span>Delete Category</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Stats Block */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-slate-50 text-xs">
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
              Total Stock Handled
            </span>
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Layers size={14} className="text-slate-400" />
              <span>{totalStock} pcs</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
              Inventory Valuation
            </span>
            <div className="flex items-center gap-1.5 font-black text-blue-600 font-mono">
              <TrendingUp size={14} className="text-blue-400" />
              <span>{formatCurrency(totalValuation)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-xl bg-blue-50/50 border border-blue-100/40 px-3.5 py-2">
          <Package size={15} className="text-blue-600" />
          <span className="text-xs font-bold text-blue-700">
            {productCount} Products Registered
          </span>
        </div>
      </div>

      {/* Inventory Health Indicator */}
      <div className="mt-5 space-y-2 border-t border-slate-50 pt-4">
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider">
          <span className="text-slate-400">Inventory Health</span>
          <span
            className={
              totalStock > 10
                ? "text-emerald-600"
                : totalStock > 0
                  ? "text-amber-500"
                  : "text-rose-500"
            }
          >
            {totalStock > 10
              ? "Optimal"
              : totalStock > 0
                ? "Low Stock Alert"
                : "Out of Stock"}
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              totalStock > 10
                ? "bg-emerald-500"
                : totalStock > 0
                  ? "bg-amber-500"
                  : "bg-rose-500"
            }`}
            style={{ width: `${Math.min(100, Math.max(5, totalStock * 2))}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
