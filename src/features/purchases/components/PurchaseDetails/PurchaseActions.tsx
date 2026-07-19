import { ChevronDown, Edit, PackageOpen } from "lucide-react";
import type { Purchase } from "../../types/purchase";

interface PurchaseActionsProps {
  purchase: Purchase;
  onEdit: () => void;
  onReceive: () => void;
}

const PurchaseActions = ({
  purchase,
  onEdit,
  onReceive,
}: PurchaseActionsProps) => {
  const isFullyReceived = purchase.status === "RECEIVED";

  return (
    <div
      className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full"
      id={`purchase-actions-${purchase.id}`}
    >
      {/* Edit Purchase Button */}
      <button
        onClick={onEdit}
        type="button"
        className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4.5 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition shadow-3xs"
      >
        <Edit size={13} className="text-slate-500" />
        <span>Edit Purchase</span>
      </button>

      {/* Receive Goods Button (Split) */}
      <div className="flex w-full sm:w-auto items-center">
        <button
          onClick={onReceive}
          disabled={isFullyReceived}
          type="button"
          className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 rounded-l-xl transition shadow-3xs border-0 cursor-pointer"
        >
          <PackageOpen size={13} />
          <span>Receive Goods</span>
        </button>
        <button
          disabled={isFullyReceived}
          type="button"
          className="flex items-center justify-center px-3 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 rounded-r-xl transition shadow-3xs border-l border-blue-500/50 border-0 cursor-pointer"
        >
          <ChevronDown size={13} />
        </button>
      </div>
    </div>
  );
};

export default PurchaseActions;
