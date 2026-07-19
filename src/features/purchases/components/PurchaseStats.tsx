import {
  ShoppingCart,
  Clock,
  CheckCircle2,
  DollarSign,
} from "lucide-react";
import { usePurchaseStats } from "../hook/usePurchases";
import { formatCurrency } from "../../../utils/formatCurrenty";

export default function PurchaseStats() {
  const { data: stats, isLoading } = usePurchaseStats();

  const cards = [
    {
      title: "Total Orders",
      value: isLoading ? "..." : stats?.totalOrders ?? 0,
      label: "All Orders",
      icon: ShoppingCart,
      color:
        "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Draft",
      value: isLoading ? "..." : stats?.draftOrders ?? 0,
      label: "Not Submitted",
      icon: Clock,
      color:
        "text-slate-600 bg-slate-50 border-slate-100",
    },
    {
      title: "Pending",
      value: isLoading
        ? "..."
        : stats?.pendingOrders ?? 0,
      label: "Awaiting Delivery",
      icon: Clock,
      color:
        "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      title: "Partially Received",
      value: isLoading
        ? "..."
        : stats?.partiallyReceivedOrders ?? 0,
      label: "Receiving In Progress",
      icon: ShoppingCart,
      color:
        "text-cyan-600 bg-cyan-50 border-cyan-100",
    },
    {
      title: "Received",
      value: isLoading
        ? "..."
        : stats?.receivedOrders ?? 0,
      label: "Completed",
      icon: CheckCircle2,
      color:
        "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Purchase Value",
      value: isLoading
        ? "..."
        : formatCurrency(
            stats?.totalPurchaseValue ?? 0,
          ),
      label: "All Time",
      icon: DollarSign,
      color:
        "text-purple-600 bg-purple-50 border-purple-100",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`rounded-2xl border p-4 ${card.color}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">
                  {card.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {card.value}
                </h3>

                <p className="mt-1 text-xs opacity-70">
                  {card.label}
                </p>
              </div>

              <div className="rounded-xl bg-white/60 p-3">
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}