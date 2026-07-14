import type { LucideIcon } from "lucide-react";

interface ImportSummaryCardProps {
  title: string;
  value: number;
  percentage?: number;
  percentageText?: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconTextColor: string;
  progressColor: string;
}

const ImportSummaryCard = ({
  title,
  value,
  percentage = 100,
  percentageText,
  icon: Icon,
  iconBgColor,
  iconTextColor,
  progressColor,
}: ImportSummaryCardProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`rounded-lg p-3 ${iconBgColor} ${iconTextColor}`}>
          <Icon size={22} />
        </div>

        <div className="flex-1">
          <p className="truncate text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>

          <p className="text-2xl font-bold text-slate-800">{value}</p>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {percentageText && (
            <span className="mt-1 inline-block text-[10px] font-medium text-slate-400">
              {percentageText}
            </span>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default ImportSummaryCard;
