import { CheckCircle2 } from "lucide-react";
import Button from "../../../components/ui/Button";
import type { ValidatedImportRecord } from "../types/import";

interface ImportSuccessProps {
  records: ValidatedImportRecord[];
  onDone: () => void;
}

const ImportSuccess = ({ records, onDone }: ImportSuccessProps) => {
  const created = records.filter(
    (record) => record.isValid && record.action === "create",
  ).length;

  const updated = records.filter(
    (record) => record.isValid && record.action === "update",
  ).length;

  const skipped = records.filter(
    (record) => record.isValid && record.action === "skip",
  ).length;

  const invalid = records.filter((record) => !record.isValid).length;

  const totalProcessed = created + updated;

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <CheckCircle2 size={64} className="mb-5 text-emerald-600" />
      <h2 className="text-2xl font-bold text-slate-900">Import Completed</h2>
      <p className="mt-2 max-w-md text-center text-slate-500">
        Your import has finished successfully. Below is a summary of what
        happened during the import.
      </p>

      <div className="mt-8 grid w-full max-w-2xl grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="text-sm font-medium text-slate-500">Created</p>
          <p className="mt-2 text-3xl font-bold text-emerald-700">{created}</p>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-center">
          <p className="text-sm font-medium text-slate-500">Updated</p>
          <p className="mt-2 text-3xl font-bold text-blue-700">{updated}</p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-center">
          <p className="text-sm font-medium text-slate-500">Skipped</p>
          <p className="mt-2 text-3xl font-bold text-amber-700">{skipped}</p>
        </div>

        <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 text-center">
          <p className="text-sm font-medium text-slate-500">Invalid</p>
          <p className="mt-2 text-3xl font-bold text-rose-700">{invalid}</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 px-6 py-4 text-center">
        <p className="text-sm text-slate-500">Successfully processed</p>

        <p className="mt-1 text-2xl font-bold text-slate-900">
          {totalProcessed} product{totalProcessed !== 1 ? "s" : ""}
        </p>
      </div>

      <Button className="mt-8" onClick={onDone}>
        Done
      </Button>
    </div>
  );
};

export default ImportSuccess;
