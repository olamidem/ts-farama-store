import { X } from "lucide-react";
import Button from "../../../../../components/ui/Button";

interface ReceiveGoodsHeaderProps {
  purchaseNumber: string;
  onClose: () => void;
}

const ReceiveGoodsHeader = ({
  purchaseNumber,
  onClose,
}: ReceiveGoodsHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 p-5">
      <div>
        <h2 className="text-sm font-extrabold text-slate-800">Receive Goods</h2>
        <p className="mt-1 text-xs font-semibold text-slate-400">
          {purchaseNumber}
        </p>
      </div>

      <Button
        onClick={onClose}
        type="button"
        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
      >
        <X size={16} />
      </Button>
    </div>
  );
};

export default ReceiveGoodsHeader;
