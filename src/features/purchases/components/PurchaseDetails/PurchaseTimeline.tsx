import { Check, Clock, Dot } from "lucide-react";

import { PURCHASE_STATUS } from "../../constant/purchase.constants";
import { formatDate } from "../../../../utils/formatDate";
import type { Purchase } from "../../types/purchase";

interface PurchaseTimelineProps {
  purchase: Purchase;
}

const PurchaseTimeline = ({ purchase }: PurchaseTimelineProps) => {
  const status = purchase.status;

  const steps = [
    {
      title: "Purchase Created",
      description: `Logged on ${formatDate(
        purchase.created_at,
        true,
      )} by Admin User`,
      isCompleted: true,
      isActive: false,
    },

    {
      title: "Vendor Ordered",
      description:
        status === PURCHASE_STATUS.DRAFT || status === PURCHASE_STATUS.PENDING
          ? "Awaiting vendor order confirmation"
          : `Sent to supplier on ${formatDate(purchase.updated_at, true)}`,

      isCompleted:
        status !== PURCHASE_STATUS.DRAFT && status !== PURCHASE_STATUS.PENDING,

      isActive: status === PURCHASE_STATUS.PENDING,
    },

    {
      title: "Goods Received",

      description:
        status === PURCHASE_STATUS.RECEIVED
          ? "Goods fully received and verified"
          : status === PURCHASE_STATUS.PARTIALLY_RECEIVED
            ? `Partially received (${purchase.received_percentage ?? 0}%)`
            : "Awaiting physical delivery receipt",

      isCompleted: status === PURCHASE_STATUS.RECEIVED,

      isActive:
        status === PURCHASE_STATUS.PARTIALLY_RECEIVED ||
        status === PURCHASE_STATUS.ORDERED,
    },

    {
      title: "Inventory Updated",

      description:
        status === PURCHASE_STATUS.RECEIVED
          ? "Inventory count automatically updated"
          : status === PURCHASE_STATUS.PARTIALLY_RECEIVED
            ? "Inventory count partially updated"
            : "Pending goods arrival",

      isCompleted: status === PURCHASE_STATUS.RECEIVED,

      isActive: status === PURCHASE_STATUS.PARTIALLY_RECEIVED,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs">
      <h4 className="mb-5 text-xs font-bold uppercase tracking-wide text-slate-700">
        Purchase Timeline
      </h4>

      <div className="relative ml-3 border-l border-slate-100 pl-6 space-y-6">
        {steps.map((step) => {
          let iconContainer =
            "bg-slate-100 text-slate-400 border border-slate-200";

          let icon = <Clock size={11} />;

          if (step.isCompleted) {
            iconContainer = "bg-emerald-500 text-white";

            icon = <Check size={11} strokeWidth={3} />;
          } else if (step.isActive) {
            iconContainer =
              "bg-indigo-50 text-indigo-600 border border-indigo-400";

            icon = <Dot size={20} className="animate-pulse" />;
          }

          return (
            <div key={step.title} className="relative">
              <div
                className={`absolute -left-10 top-0.5 flex h-7 w-7 items-center justify-center rounded-full ${iconContainer}`}
              >
                {icon}
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-800">
                  {step.title}
                </h5>

                <p className="mt-0.5 text-[10px] font-medium text-slate-500">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PurchaseTimeline;
