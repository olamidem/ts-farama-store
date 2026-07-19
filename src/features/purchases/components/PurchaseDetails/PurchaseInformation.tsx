import { ClipboardList, User } from "lucide-react";
import type { Purchase } from "../../types/purchase";
import { formatDate } from "../../../../utils/formatDate";

interface PurchaseInformationProps {
  purchase: Purchase;
}

const PurchaseInformation = ({ purchase }: PurchaseInformationProps) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Supplier */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-3xs">
        <h4 className="mb-4 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-800">
          <User size={14} className="text-blue-500" />
          <span>Supplier Information</span>
        </h4>

        <div className="space-y-3.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-semibold">Supplier Name</span>
            <span className="font-bold text-slate-800 text-right">
              {purchase.supplier?.name ?? "Unknown"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-semibold">Phone</span>
            <span className="font-semibold text-slate-700 text-right">
              {purchase.supplier?.phone ?? "+234 810 123 4567"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-semibold">Email</span>
            <span className="font-semibold text-slate-700 break-all text-right max-w-50">
              {purchase.supplier?.email ?? "contact@nestle.com"}
            </span>
          </div>
        </div>
      </div>

      {/* Purchase */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-3xs">
        <h4 className="mb-4 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-800">
          <ClipboardList size={14} className="text-blue-500" />
          <span>Purchase Information</span>
        </h4>

        <div className="space-y-3.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-semibold">Purchase Date</span>
            <span className="font-bold text-slate-800 text-right">
              {formatDate(purchase.purchase_date)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-semibold">
              Expected Delivery
            </span>
            <span className="font-bold text-slate-800 text-right">
              {formatDate(purchase.expected_delivery_date)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-semibold">Created By</span>
            <span className="font-bold text-slate-800 text-right">
              {purchase.created_by || "Admin User"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseInformation;
