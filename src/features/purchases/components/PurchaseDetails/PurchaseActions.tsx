import { Edit, Truck, Lock } from "lucide-react";
import type { Purchase } from "../../types/purchase";
import { canClosePurchase } from "../../utils/purchaseStatus";

interface PurchaseActionsProps {
  purchase: Purchase;
  onEdit: () => void;
  onReceive: () => void;
  onClosePurchase: () => void;
}

const PurchaseActions = ({
  purchase,
  onEdit,
  onReceive,
  onClosePurchase,
}: PurchaseActionsProps) => {
  const isLocked = purchase.status === "CLOSED";
  const isFullyReceived = purchase.status === "RECEIVED" || isLocked;
  const canEdit = purchase.status === "PENDING" && !isLocked;
  const canClose = canClosePurchase(purchase);

  return (
    <div
      className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full"
      id={`purchase-actions-${purchase.id}`}
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Edit Purchase Button */}
        <button
          onClick={onEdit}
          disabled={!canEdit}
          type="button"
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4.5 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition shadow-3xs"
        >
          <Edit size={13} className="text-slate-500" />
          <span>Edit Purchase</span>
        </button>

        {/* Close Purchase Button */}
        {canClose && (
          <button
            onClick={onClosePurchase}
            type="button"
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4.5 py-2.5 text-xs font-bold text-rose-600 bg-rose-50/50 border border-rose-200 rounded-xl hover:bg-rose-50 cursor-pointer transition shadow-3xs"
            title="Mark purchase order as closed and lock further changes"
          >
            <Lock size={13} className="text-rose-500" />
            <span>Close Order</span>
          </button>
        )}
      </div>

      {/* Receive Goods Button (Single, with Truck Icon) */}
      <button
        onClick={onReceive}
        disabled={isFullyReceived}
        type="button"
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition shadow-3xs border-0 cursor-pointer"
      >
        <Truck size={14} />
        <span>Receive Goods</span>
      </button>
    </div>
  );
};

export default PurchaseActions;
