import { X, Sliders } from "lucide-react";
import { StockAdjustmentFormPanel } from "./StockAdjustmentFormPanel";
import { useCreateStockAdjustment } from "../hooks/useInventoryMutations";
import { useProductStockOverview } from "../hooks/useInventory";
import type {
  ProductStockOverviewItem,
  InventorySettings,
  StockAdjustmentInput,
} from "../types/inventory";

interface StockAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  productsList: { id: string; name: string; sku: string }[];
  stockOverview?: ProductStockOverviewItem[];
  settings?: InventorySettings;
}

export const StockAdjustmentModal = ({
  isOpen,
  onClose,
  productsList,
  stockOverview: stockOverviewProp,
  settings: settingsProp,
}: StockAdjustmentModalProps) => {
  const createAdjustmentMutation = useCreateStockAdjustment();
  const { data: fetchedStockOverview = [] } = useProductStockOverview();

  const stockOverview = stockOverviewProp || fetchedStockOverview;

  const settings: InventorySettings =
    settingsProp ||
    (() => {
      const saved = localStorage.getItem("farama_inventory_settings");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // Fallback to default settings
        }
      }
      return {
        defaultMinAlert: 5,
        refPrefix: "FARAMA",
        operatorName: "Admin Operator",
      };
    })();

  if (!isOpen) return null;

  const handleSubmit = async (payload: StockAdjustmentInput) => {
    try {
      await createAdjustmentMutation.mutateAsync(payload);
      onClose();
    } catch {
      // Toast error is handled inside mutation / service
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      {/* Modal Card */}
      <div className="relative w-full max-w-xl rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
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

        {/* Reusable Stock Adjustment Form Panel */}
        <StockAdjustmentFormPanel
          productsList={productsList}
          stockOverview={stockOverview}
          settings={settings}
          onSubmit={handleSubmit}
          isPending={createAdjustmentMutation.isPending}
        />
      </div>
    </div>
  );
};

export default StockAdjustmentModal;
