import {
  ArrowDownLeft,
  ArrowUpRight,
  PackageCheck,
  TriangleAlert,
} from "lucide-react";


const icons = {
  Purchase: ArrowDownLeft,
  Sale: ArrowUpRight,
  Adjustment: PackageCheck,
  Damage: TriangleAlert,
};

const colors = {
  Purchase: "bg-green-100 text-green-700",
  Sale: "bg-red-100 text-red-700",
  Adjustment: "bg-blue-100 text-blue-700",
  Damage: "bg-amber-100 text-amber-700",
};

export default function InventoryTimeline() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold">Recent Activity</h2>
      <p className="mb-6 text-sm text-slate-500">Latest inventory movements</p>

      <div className="space-y-5">
        <p>nothing to show now</p>
        {/* {inventoryTimeline.map((item) => {
          const Icon = icons[item.type as keyof typeof icons];
          const color = colors[item.type as keyof typeof colors];

          return (
            <div key={item.id} className="flex gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${color}`}
              >
                <Icon size={18} />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-800">{item.type}</h4>
                  <span className="text-sm font-bold">{item.quantity}</span>
                </div>

                <p className="text-sm text-slate-600">{item.product}</p>
                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>{item.time}</span>
                  <span>{item.user}</span>
                </div>
              </div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
}
