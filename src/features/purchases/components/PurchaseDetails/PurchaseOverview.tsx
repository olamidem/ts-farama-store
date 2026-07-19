import { useState } from "react";
import { X, PackageCheck, AlertCircle } from "lucide-react";
import type { Purchase } from "../../types/purchase";
import {
  getStatusBadgeStyle,
  formatStatusText,
} from "../../utils/purchaseStatus";
import PurchaseInformation from "./PurchaseInformation";
import { PURCHASE_OVERVIEW_TABS, type PurchaseOverviewTab } from "../../constant/purchaseOverview.constants";
import PurchaseItemsTable from "./PurchaseItemsTable";
import PurchaseTimeline from "./PurchaseTimeline";
import PurchaseActions from "./PurchaseActions";
import ReceiveGoodsModal from "../PurchaseForm/ReceiveGoodsModal/ReceiveGoodModal";


interface PurchaseOverviewProps {
  purchase: Purchase;
  onClose: () => void;
  onEdit: (purchase: Purchase) => void;
}

export const PurchaseOverview = ({
  purchase,
  onClose,
  onEdit,
}: PurchaseOverviewProps) => {
const [activeTab, setActiveTab] = useState<PurchaseOverviewTab>(PURCHASE_OVERVIEW_TABS.OVERVIEW);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);

 const tabs = [
   {
     id: PURCHASE_OVERVIEW_TABS.OVERVIEW,
     label: "Overview",
   },
   {
     id: PURCHASE_OVERVIEW_TABS.ITEMS,
     label: "Items",
   },
   {
     id: PURCHASE_OVERVIEW_TABS.RECEIVE,
     label: "Receive Goods",
   },
   {
     id: PURCHASE_OVERVIEW_TABS.HISTORY,
     label: "History",
   },
 ] as const;

  return (
    <div className="h-full bg-slate-50 border-l border-slate-200 shadow-xl flex flex-col w-full">
      {/* Top Header */}
      <div className="px-5 py-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-extrabold text-slate-800">
            {purchase.purchase_number}
          </span>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wide uppercase ${getStatusBadgeStyle(
              purchase.status,
            )}`}
          >
            {formatStatusText(purchase.status)}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer"
          title="Close details"
        >
          <X size={15} />
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 bg-white px-5 shrink-0">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-3 text-xs font-bold border-b-2 transition cursor-pointer -mb-px ${
                isActive
                  ? "border-indigo-600 text-indigo-600 font-extrabold"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {activeTab === PURCHASE_OVERVIEW_TABS.OVERVIEW && (
          <div className="space-y-4">
            <PurchaseInformation purchase={purchase} />
            <PurchaseItemsTable purchase={purchase} />
            <PurchaseTimeline purchase={purchase} />
          </div>
        )}

        {activeTab === PURCHASE_OVERVIEW_TABS.ITEMS && (
          <div className="space-y-4">
            <PurchaseItemsTable purchase={purchase} />
          </div>
        )}

        {activeTab === PURCHASE_OVERVIEW_TABS.RECEIVE && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-2xs">
              <h4 className="text-xs font-extrabold text-slate-800 mb-2 uppercase tracking-wider flex items-center gap-2">
                <PackageCheck size={14} className="text-emerald-500" />
                <span>Receive Goods Workflow</span>
              </h4>
              <p className="text-[10px] font-semibold text-slate-400 leading-relaxed mb-4">
                Record actual stock arrived at the warehouse. This increments
                real system stock counts automatically.
              </p>

              {purchase.status === "RECEIVED" ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 flex gap-3 text-xs">
                  <PackageCheck size={16} className="shrink-0" />
                  <div className="font-semibold">
                    All items on this purchase order have been fully received.
                    Stock balances have been updated.
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/50 flex gap-3 text-indigo-800">
                    <AlertCircle size={15} className="shrink-0 mt-0.5" />
                    <span className="text-[10px] font-semibold leading-relaxed">
                      This purchase is currently{" "}
                      <span className="font-bold">
                        {purchase.received_percentage}%
                      </span>{" "}
                      received. Click below to register more items.
                    </span>
                  </div>

                  <button
                    onClick={() => setIsReceiveModalOpen(true)}
                    type="button"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold rounded-xl transition cursor-pointer shadow-sm shadow-indigo-500/10 hover:shadow-indigo-500/20"
                  >
                    Open Receive Dialog
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === PURCHASE_OVERVIEW_TABS.HISTORY && (
          <div className="space-y-4">
            <PurchaseTimeline purchase={purchase} />
          </div>
        )}
      </div>

      {/* Footer sticky actions */}
      <div className="p-5 bg-white border-t border-slate-200 shrink-0">
        <PurchaseActions
          purchase={purchase}
          onEdit={() => onEdit(purchase)}
          onReceive={() => setIsReceiveModalOpen(true)}
        />
      </div>

      {/* Receive Goods modal */}
      <ReceiveGoodsModal
        key={purchase.id}
        purchase={purchase}
        isOpen={isReceiveModalOpen}
        isSubmitting={receivePurchaseMutation.isPending}
        onClose={() => setIsReceiveModalOpen(false)}
        onSubmit={handleReceiveGoods}
      />
    </div>
  );
};

export default PurchaseOverview;
