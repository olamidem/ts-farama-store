import { ClipboardList, User } from "lucide-react";
import type { Purchase } from "../../types/purchase";
import { formatDate } from "../../../../utils/formatDate";

interface PurchaseInformationProps {
  purchase: Purchase;
}

const PurchaseInformation = ({ purchase }: PurchaseInformationProps) => {
  
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Supplier */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs">
        <h4 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-700">
          <User size={14} className="text-indigo-500" />
          Supplier Information
        </h4>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Supplier Name</span>

            <span className="font-semibold text-slate-800">
              {purchase.supplier?.name ?? "Unknown"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Phone</span>

            <span className="font-medium text-slate-700">
              {purchase.supplier?.phone ?? "N/A"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Email</span>

            <span className="font-medium text-slate-700">
              {purchase.supplier?.email ?? "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Purchase */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs">
        <h4 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-700">
          <ClipboardList size={14} className="text-indigo-500" />
          Purchase Information
        </h4>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Purchase Date</span>

            <span className="font-semibold text-slate-800">
              {formatDate(purchase.purchase_date)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Expected Delivery</span>

            <span className="font-semibold text-slate-800">
              {formatDate(purchase.expected_delivery_date)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Created By</span>

            <span className="font-semibold text-slate-800">
              {purchase.created_by}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseInformation;
