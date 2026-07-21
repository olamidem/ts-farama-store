import { useState, useEffect, useCallback } from "react";
import { X, Sliders, AlertCircle, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stockAdjustmentSchema, type StockAdjustmentFormData } from "../validation/stockAdjustment.schema";
import { useCreateStockAdjustment } from "../hooks/useInventoryMutations";
import { useProductUnits } from "../../products/product-units/hooks/useProductUnits";

interface StockAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  productsList: { id: string; name: string; sku: string }[];
}

export const StockAdjustmentModal = ({
  isOpen,
  onClose,
  productsList,
}: StockAdjustmentModalProps) => {
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [adjustmentDirection, setAdjustmentDirection] = useState<"+" | "-">("+");

  const createAdjustmentMutation = useCreateStockAdjustment();
  const year = new Date().getFullYear();
  const ref = Math.random().toString(36).substring(2, 8).toUpperCase();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<StockAdjustmentFormData>({
    resolver: zodResolver(stockAdjustmentSchema),
    defaultValues: {
      quantity: 1,
      transaction_type: "ADJUSTMENT",
      reference: `ADJ-${year}-${ref}`,
      remarks: "",
    },
  });

  const watchedType = watch("transaction_type");
  const watchedProductId = watch("product_id");

  // Fetch product units for selected product
  const { data: productUnits = [], isLoading: isLoadingUnits } = useProductUnits(selectedProductId);

  // Auto set product_id and select first product unit
  useEffect(() => {
    if (watchedProductId) {
      setSelectedProductId(watchedProductId);
    } else {
      setSelectedProductId("");
    }
  }, [watchedProductId]);

  // Handle setting product unit value when units are loaded
  useEffect(() => {
    if (productUnits.length > 0) {
      setValue("product_unit_id", productUnits[0].id);
    } else {
      setValue("product_unit_id", "");
    }
  }, [productUnits, setValue]);

  // Auto-set adjustment direction based on transaction type
  useEffect(() => {
    if (watchedType === "PURCHASE" || watchedType === "RETURN" || watchedType === "OPENING STOCK") {
      setAdjustmentDirection("+");
    } else if (watchedType === "SALE" || watchedType === "DAMAGE") {
      setAdjustmentDirection("-");
    }
  }, [watchedType]);

  // Generate reference number based on type
  const handleRegenRef = useCallback(() => {
    const prefix =
      watchedType === "PURCHASE"
        ? "PO"
        : watchedType === "SALE"
        ? "INV"
        : watchedType === "RETURN"
        ? "RTN"
        : "ADJ";
    setValue("reference", `${prefix}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
  }, [watchedType, setValue]);

  useEffect(() => {
    handleRegenRef();
  }, [handleRegenRef]);

  const onSubmit = async (data: StockAdjustmentFormData) => {
    try {
      // Compute final quantity based on direction
      const finalQuantity = adjustmentDirection === "+" ? Math.abs(data.quantity) : -Math.abs(data.quantity);
      
      await createAdjustmentMutation.mutateAsync({
        product_id: data.product_id,
        product_unit_id: data.product_unit_id,
        quantity: finalQuantity,
        transaction_type: data.transaction_type,
        reference: data.reference,
        remarks: data.remarks,
      });

      reset();
      onClose();
    } catch {
      // Error is already toasted by hook
    }
  };

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      {/* Modal Card */}
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
              <Sliders size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Create Stock Adjustment
              </h3>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">
                Adjust inventory balance and log transaction audits.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Product Select */}
          <div className="space-y-1.5 text-left">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Select Product
            </label>
            <select
              {...register("product_id")}
              className={`w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition cursor-pointer ${
                errors.product_id ? "border-red-500" : "border-slate-200"
              }`}
            >
              <option value="">-- Choose a Product --</option>
              {productsList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.sku})
                </option>
              ))}
            </select>
            {errors.product_id && (
              <p className="text-red-500 text-[10px] font-semibold flex items-center gap-1">
                <AlertCircle size={10} />
                <span>{errors.product_id.message}</span>
              </p>
            )}
          </div>

          {/* Unit Select (dependent on selected product) */}
          <div className="space-y-1.5 text-left">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>Select Unit</span>
              {isLoadingUnits && <span className="text-[9px] text-slate-400 lowercase animate-pulse">Loading units...</span>}
            </label>
            <select
              {...register("product_unit_id")}
              disabled={!selectedProductId || isLoadingUnits || productUnits.length === 0}
              className={`w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition cursor-pointer ${
                errors.product_unit_id ? "border-red-500" : "border-slate-200"
              }`}
            >
              {!selectedProductId ? (
                <option value="">Please select a product first</option>
              ) : productUnits.length === 0 ? (
                <option value="">No units configured</option>
              ) : (
                productUnits.map((pu: { id: string; conversion_factor: number; unit?: { name: string; symbol: string } | null }) => (
                  <option key={pu.id} value={pu.id}>
                    {pu.unit?.name || "Piece"} ({pu.unit?.symbol || "pcs"}) - Conversion: {pu.conversion_factor}x
                  </option>
                ))
              )}
            </select>
            {errors.product_unit_id && (
              <p className="text-red-500 text-[10px] font-semibold flex items-center gap-1">
                <AlertCircle size={10} />
                <span>{errors.product_unit_id.message}</span>
              </p>
            )}
          </div>

          {/* Transaction Type */}
          <div className="space-y-1.5 text-left">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Transaction Type
            </label>
            <select
              {...register("transaction_type")}
              className={`w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition cursor-pointer ${
                errors.transaction_type ? "border-red-500" : "border-slate-200"
              }`}
            >
              <option value="ADJUSTMENT">ADJUSTMENT (Manual Correction)</option>
              <option value="PURCHASE">PURCHASE (Stock In)</option>
              <option value="SALE">SALE (Stock Out)</option>
              <option value="RETURN">RETURN (Customer Return)</option>
              <option value="DAMAGE">DAMAGE (Waste/Expiry)</option>
              <option value="TRANSFER">TRANSFER (Movement)</option>
              <option value="OPENING STOCK">OPENING STOCK (Initial Entry)</option>
            </select>
            {errors.transaction_type && (
              <p className="text-red-500 text-[10px] font-semibold flex items-center gap-1">
                <AlertCircle size={10} />
                <span>{errors.transaction_type.message}</span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Quantity */}
            <div className="space-y-1.5 text-left">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                step="1"
                {...register("quantity", { valueAsNumber: true })}
                className={`w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-xs font-mono font-bold text-slate-700 focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                  errors.quantity ? "border-red-500" : "border-slate-200"
                }`}
              />
              {errors.quantity && (
                <p className="text-red-500 text-[10px] font-semibold flex items-center gap-1">
                  <AlertCircle size={10} />
                  <span>{errors.quantity.message}</span>
                </p>
              )}
            </div>

            {/* Adjustment Direction Toggle */}
            <div className="space-y-1.5 text-left">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Adjustment Direction
              </label>
              <div className="flex border border-slate-200 rounded-xl overflow-hidden p-1 bg-slate-50">
                <button
                  type="button"
                  disabled={watchedType !== "ADJUSTMENT" && watchedType !== "TRANSFER"}
                  onClick={() => setAdjustmentDirection("+")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer disabled:opacity-80 ${
                    adjustmentDirection === "+"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  Increase (+)
                </button>
                <button
                  type="button"
                  disabled={watchedType !== "ADJUSTMENT" && watchedType !== "TRANSFER"}
                  onClick={() => setAdjustmentDirection("-")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer disabled:opacity-80 ${
                    adjustmentDirection === "-"
                      ? "bg-rose-600 text-white shadow-xs"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  Decrease (-)
                </button>
              </div>
            </div>
          </div>

          {/* Reference */}
          <div className="space-y-1.5 text-left">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>Reference / Document Code</span>
              <button
                type="button"
                onClick={handleRegenRef}
                className="text-indigo-600 hover:text-indigo-800 transition flex items-center gap-0.5 cursor-pointer font-bold"
              >
                <RefreshCw size={10} />
                <span>regenerate</span>
              </button>
            </label>
            <input
              type="text"
              {...register("reference")}
              className={`w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-xs font-mono font-bold text-slate-700 focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                errors.reference ? "border-red-500" : "border-slate-200"
              }`}
            />
            {errors.reference && (
              <p className="text-red-500 text-[10px] font-semibold flex items-center gap-1">
                <AlertCircle size={10} />
                <span>{errors.reference.message}</span>
              </p>
            )}
          </div>

          {/* Remarks */}
          <div className="space-y-1.5 text-left">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Remarks / Notes
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Discrepancy checked during stock audit..."
              {...register("remarks")}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none placeholder:text-slate-400"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createAdjustmentMutation.isPending}
              className="flex-1 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-sm hover:shadow-indigo-500/10 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {createAdjustmentMutation.isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Submit Adjustment</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockAdjustmentModal;
