import {
  ShoppingCart,
  Receipt,
  RotateCcw,
  Sliders,
  AlertTriangle,
  ArrowRightLeft,
  PackagePlus,
} from "lucide-react";

export const TransactionTypesCard = () => {
  const types = [
    {
      label: "PURCHASE",
      desc: "Stock received from supplier",
      icon: PackagePlus,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      label: "SALE",
      desc: "Stock sold to customer",
      icon: ShoppingCart,
      color: "text-rose-600 bg-rose-50 border-rose-100",
    },
    {
      label: "RETURN",
      desc: "Customer returned item",
      icon: RotateCcw,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      label: "ADJUSTMENT",
      desc: "Manual stock adjustment",
      icon: Sliders,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      label: "DAMAGE",
      desc: "Damaged or expired items",
      icon: AlertTriangle,
      color: "text-red-600 bg-red-50 border-red-100",
    },
    {
      label: "TRANSFER",
      desc: "Stock transferred",
      icon: ArrowRightLeft,
      color: "text-violet-600 bg-violet-50 border-violet-100",
    },
    {
      label: "OPENING STOCK",
      desc: "Initial stock entry",
      icon: Receipt,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
      <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-3 text-sm">
        Transaction Types
      </h4>
      <div className="space-y-4">
        {types.map((t, idx) => {
          const Icon = t.icon;
          return (
            <div key={idx} className="flex items-center gap-3">
              <div className={`rounded-full p-2 border shrink-0 flex items-center justify-center h-9 w-9 ${t.color}`}>
                <Icon size={14} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-extrabold tracking-wider text-slate-700 block uppercase">
                  {t.label}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 block leading-tight">
                  {t.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionTypesCard;
