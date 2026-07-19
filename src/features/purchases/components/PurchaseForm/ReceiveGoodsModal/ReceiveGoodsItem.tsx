import type { PurchaseItem } from "../../../types/purchaseItem";

interface ReceiveGoodsItemProps {
  item: PurchaseItem;
  value: number;
  onChange: (value: number) => void;
}

const ReceiveGoodsItem = ({ item, value, onChange }: ReceiveGoodsItemProps) => {
  const ordered = item.quantity;
  const received = item.received_quantity ?? 0;
  const remaining = ordered - received;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex justify-between gap-6">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-800">
            {item.product?.name}
          </h4>

          <p className="text-xs text-slate-500">
            Unit: {item.product_unit?.unit?.name}
          </p>

          <div className="flex gap-4 text-xs text-slate-500">
            <span>
              Ordered:
              <strong className="ml-1 text-slate-700">{ordered}</strong>
            </span>

            <span>
              Received:
              <strong className="ml-1 text-emerald-600">{received}</strong>
            </span>

            <span>
              Remaining:
              <strong className="ml-1 text-orange-600">{remaining}</strong>
            </span>
          </div>
        </div>

        <div className="w-28">
          <label className="block mb-1 text-xs font-semibold text-slate-500">
            Receive
          </label>

          <input
            type="number"
            min={0}
            max={remaining}
            value={value}
            onChange={(e) =>
              onChange(Math.min(Number(e.target.value), remaining))
            }
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-center text-sm font-semibold focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ReceiveGoodsItem;
