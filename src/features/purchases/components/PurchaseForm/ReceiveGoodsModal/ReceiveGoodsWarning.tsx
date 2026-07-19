import { AlertTriangle } from "lucide-react";

export const ReceiveGoodsWarning = () => {
  return (
    <div className="p-3 bg-amber-50/75 border border-amber-100 rounded-xl flex gap-3 text-amber-800">
      <AlertTriangle size={16} className="shrink-0 mt-0.5" />
      <div className="text-[10px] font-semibold leading-relaxed">
        Receiving goods will instantly update active product inventory stock levels
        and create traceable transaction logs in the recent activity logs.
      </div>
    </div>
  );
};

export default ReceiveGoodsWarning;
