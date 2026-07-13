import { useState, useRef, useEffect } from "react";
import { Download, FileSpreadsheet, FileText, ChevronDown } from "lucide-react";
import Button from "../../../components/ui/Button";
import type { Product } from "../types/product";
import type { Category } from "../../categories/types/category";
import { useProductExport } from "../hooks/useProductExport";


interface ExportProductDropdownProps {
  products: Product[];
  filteredProducts: Product[];
  categories: Category[];
}

export const ExportProductDropdown = ({
  products,
  filteredProducts,
  categories,
}: ExportProductDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { exportProducts, downloadTemplate } = useProductExport();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExport = (type: "all" | "filtered", format: "csv" | "xlsx") => {
    const list = type === "all" ? products : filteredProducts;
    exportProducts(list, categories, format);
    setIsOpen(false);
  };

  const handleDownloadTemplate = (format: "csv" | "xlsx") => {
    downloadTemplate(format);
    setIsOpen(false);
  };

  return (
    <div
      className="relative inline-block text-left"
      ref={menuRef}
      id="export-products-dropdown"
    >
      <Button
        variant="secondary"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5"
      >
        <Download size={18} />
        <span>Export / Templates</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-lg bg-white shadow-xl ring-1 ring-black/5 divide-y divide-slate-100 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="py-1">
            <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Export All ({products.length})
            </div>
            <button
              onClick={() => handleExport("all", "xlsx")}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
            >
              <FileSpreadsheet className="text-emerald-600" size={16} />
              <span>Export All as Excel (.xlsx)</span>
            </button>
            <button
              onClick={() => handleExport("all", "csv")}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
            >
              <FileText className="text-blue-600" size={16} />
              <span>Export All as CSV</span>
            </button>
          </div>

          <div className="py-1">
            <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Export Filtered ({filteredProducts.length})
            </div>
            <button
              onClick={() => handleExport("filtered", "xlsx")}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
            >
              <FileSpreadsheet className="text-emerald-500" size={16} />
              <span>Export Filtered as Excel (.xlsx)</span>
            </button>
            <button
              onClick={() => handleExport("filtered", "csv")}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
            >
              <FileText className="text-blue-500" size={16} />
              <span>Export Filtered as CSV</span>
            </button>
          </div>

          <div className="py-1">
            <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Import Templates
            </div>
            <button
              onClick={() => handleDownloadTemplate("xlsx")}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors text-left"
            >
              <FileSpreadsheet className="text-slate-400" size={16} />
              <span>Download Excel Template</span>
            </button>
            <button
              onClick={() => handleDownloadTemplate("csv")}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors text-left"
            >
              <FileText className="text-slate-400" size={16} />
              <span>Download CSV Template</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportProductDropdown;
