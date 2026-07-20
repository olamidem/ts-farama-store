import { useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useProduct } from "../hooks/useProducts";
import { useCategories } from "../../categories/hooks/useCategories";
import { ProductDetailsHeader } from "./components/ProductDetailsHeader";
import { ProductDetailsHistoryTabs } from "./components/ProductDetailsHistoryTabs";
import EditProductModal from "../components/EditProductModal";
import DeleteProductModal from "../components/DeleteProductModal";
import { toast } from "sonner";
import { motion } from "motion/react";
import { ArrowLeft, AlertTriangle, Landmark, Tag, TrendingUp, Package } from "lucide-react";

export const ProductDetailsPage = () => {
  const { productId } = useParams({ strict: false }) as { productId: string };
  const navigate = useNavigate();

  // Dialog & Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  // Queries
  const { data: product, isLoading: isProductLoading, isError } = useProduct(productId);
  const { data: categories = [] } = useCategories();

  if (isProductLoading) {
    return (
      <div className="space-y-6 animate-pulse w-full">
        <div className="h-10 bg-slate-200 rounded-xl w-1/4" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="h-28 bg-slate-200 rounded-2xl" />
          <div className="h-28 bg-slate-200 rounded-2xl" />
          <div className="h-28 bg-slate-200 rounded-2xl" />
          <div className="h-28 bg-slate-200 rounded-2xl" />
        </div>
        <div className="h-96 bg-slate-200 rounded-2xl" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 mb-4 border border-rose-100 shadow-sm">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Product Not Found</h2>
        <p className="text-base text-slate-500 mt-2">
          We couldn't find the product details you requested. The item may have been deleted.
        </p>
        <button
          onClick={() => navigate({ to: "/products" })}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-slate-200 bg-white text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition shadow-sm mt-6"
        >
          <ArrowLeft size={16} />
          <span>Back to Products</span>
        </button>
      </div>
    );
  }

  // Find Category Name
  const category = categories.find((c) => String(c.id) === String(product.category_id));
  const categoryName = category?.name || "General";

  const handlePrintBarcode = () => {
    toast.success(`Barcode labels printed successfully for ${product.name}`);
  };

  const handleAdjustStock = () => {
    toast.info("Adjust Stock wizard triggered. Modify stock values from details panels.");
  };

  const handleDuplicate = () => {
    toast.info(`Duplicating product: ${product.name}. Saving a new copy...`);
  };

  // KPIs Calculations
  const sellingPrice = product.selling_price || 0;
  const costPrice = product.cost_price || 0;
  const profit = sellingPrice - costPrice;
  const profitMargin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;
  const stock = product.stock || 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 w-full pb-12"
    >
      {/* Header */}
      <ProductDetailsHeader
        productId={product.id}
        onEdit={() => setIsEditOpen(true)}
        onPrintBarcode={handlePrintBarcode}
        onArchive={() => setIsArchiveOpen(true)}
      />

      {/* KPI Cards Header: Basic Unit Financials & Inventory */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Cost Price */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center gap-4 hover:shadow-md transition duration-200">
          <div className="p-3.5 rounded-xl bg-blue-50 text-blue-600 shrink-0">
            <Landmark size={24} />
          </div>
          <div>
            <span className="block text-sm font-bold text-slate-500 uppercase tracking-wide">Cost Price</span>
            <span className="text-xl md:text-2xl font-extrabold text-slate-900 font-mono block mt-1">
              {formatCurrency(costPrice)}
            </span>
          </div>
        </div>

        {/* Selling Price */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center gap-4 hover:shadow-md transition duration-200">
          <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
            <Tag size={24} />
          </div>
          <div>
            <span className="block text-sm font-bold text-slate-500 uppercase tracking-wide">Selling Price</span>
            <span className="text-xl md:text-2xl font-extrabold text-slate-900 font-mono block mt-1">
              {formatCurrency(sellingPrice)}
            </span>
          </div>
        </div>

        {/* Profit */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center gap-4 hover:shadow-md transition duration-200">
          <div className="p-3.5 rounded-xl bg-amber-50 text-amber-600 shrink-0">
            <TrendingUp size={24} />
          </div>
          <div>
            <span className="block text-sm font-bold text-slate-500 uppercase tracking-wide">Est. Unit Profit</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl md:text-2xl font-extrabold text-slate-900 font-mono">
                {formatCurrency(profit)}
              </span>
              <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                {profitMargin.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Current Stock */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center gap-4 hover:shadow-md transition duration-200">
          <div className="p-3.5 rounded-xl bg-violet-50 text-violet-600 shrink-0">
            <Package size={24} />
          </div>
          <div>
            <span className="block text-sm font-bold text-slate-500 uppercase tracking-wide">Current Stock</span>
            <span className="text-xl md:text-2xl font-extrabold text-slate-900 block mt-1">
              {stock} units
            </span>
          </div>
        </div>
      </div>

      {/* Main Tabbed Layout (History, Specifications, Actions, alternative selling units) */}
      <ProductDetailsHistoryTabs
        product={product}
        categoryName={categoryName}
        onEdit={() => setIsEditOpen(true)}
        onAdjustStock={handleAdjustStock}
        onDuplicate={handleDuplicate}
        onPrintBarcode={handlePrintBarcode}
        onArchive={() => setIsArchiveOpen(true)}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        product={product}
      />

      {/* Delete / Archive Product Modal */}
      <DeleteProductModal
        open={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        product={product}
      />
    </motion.div>
  );
};

export default ProductDetailsPage;
