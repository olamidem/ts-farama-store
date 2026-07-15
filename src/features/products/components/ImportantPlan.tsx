import type { ValidatedImportRecord, ImportSummary } from "../types/import";
import {
  PlusCircle,
  RefreshCw,
  SkipForward,
  AlertTriangle,
} from "lucide-react";

interface ImportPlanProps {
  records: ValidatedImportRecord[];
  summary: ImportSummary;
}

const ImportPlan = ({ records, summary }: ImportPlanProps) => {
  const createCount = records.filter(
    (r) => r.isValid && r.action === "create",
  ).length;

  const updateCount = records.filter(
    (r) => r.isValid && r.action === "update",
  ).length;

  const skipCount = records.filter(
    (r) => r.isValid && r.action === "skip",
  ).length;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden font-sans">
      <div className="bg-slate-50/60 border-b border-slate-100 px-5 py-3.5 flex items-center justify-between">
        <h3 className="font-semibold text-sm text-slate-800 tracking-tight flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          Execution Plan & Action Breakdown
        </h3>
        <span className="text-[11px] font-mono font-medium text-slate-400">
          Plan generated dynamically based on selected strategies
        </span>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Create Card */}
          <div className="relative overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50/20 p-4 transition-all hover:shadow-md hover:shadow-emerald-50/30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
                <PlusCircle className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Create New
                </span>
                <span className="text-xl font-bold text-slate-800 tracking-tight">
                  {createCount} {createCount === 1 ? "product" : "products"}
                </span>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500 leading-normal">
              Will be added as brand new items in your inventory with
              custom-assigned SKU prefixes.
            </p>
          </div>

          {/* Update Card */}
          <div className="relative overflow-hidden rounded-xl border border-sky-100 bg-sky-50/20 p-4 transition-all hover:shadow-md hover:shadow-sky-50/30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-sky-50 text-sky-600">
                <RefreshCw className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Update Existing
                </span>
                <span className="text-xl font-bold text-slate-800 tracking-tight">
                  {updateCount} {updateCount === 1 ? "product" : "products"}
                </span>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500 leading-normal">
              Will overwrite stock levels, cost price, selling price, and info
              for matching items.
            </p>
          </div>

          {/* Skip Card */}
          <div className="relative overflow-hidden rounded-xl border border-slate-200/60 bg-slate-50/40 p-4 transition-all hover:shadow-md hover:shadow-slate-100/30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-slate-100 text-slate-500">
                <SkipForward className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Skip / Omit
                </span>
                <span className="text-xl font-bold text-slate-800 tracking-tight">
                  {skipCount} {skipCount === 1 ? "product" : "products"}
                </span>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500 leading-normal">
              Already registered. These entries will be bypassed entirely to
              prevent duplication.
            </p>
          </div>

          {/* Ignore/Failed Card */}
          <div
            className={`relative overflow-hidden rounded-xl p-4 transition-all hover:shadow-md ${
              summary.failed > 0
                ? "border-rose-100 bg-rose-50/20 hover:shadow-rose-50/30"
                : "border-slate-100 bg-slate-50/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-lg ${
                  summary.failed > 0
                    ? "bg-rose-50 text-rose-600"
                    : "bg-slate-50 text-slate-400"
                }`}
              >
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Invalid Rows
                </span>
                <span
                  className={`text-xl font-bold tracking-tight ${
                    summary.failed > 0 ? "text-rose-700" : "text-slate-500"
                  }`}
                >
                  {summary.failed} {summary.failed === 1 ? "row" : "rows"}
                </span>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500 leading-normal">
              {summary.failed > 0
                ? "Failed formatting or category mapping. These will be skipped and reported in the table below."
                : "All spreadsheet rows passed structural constraints successfully."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportPlan;
