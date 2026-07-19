import { AlertTriangle } from "lucide-react";

const ReceiveGoodsWarning = () => {
  return (
    <div className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50/70 p-3">
      <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-500" />

      <div className="text-[10px] font-semibold leading-relaxed text-amber-800">
        Receiving goods will immediately update inventory quantities and create
        inventory transaction records.
      </div>
    </div>
  );
};

export default ReceiveGoodsWarning;
