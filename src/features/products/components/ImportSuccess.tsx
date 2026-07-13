import { CheckCircle2 } from "lucide-react";
import Button from "../../../components/ui/Button";
import type { ImportSummary } from "../types/import";

interface ImportSuccessProps {
  summary: ImportSummary;
  onDone: () => void;
}

const ImportSuccess = ({ summary, onDone }: ImportSuccessProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <CheckCircle2 size={64} className="mb-5 text-emerald-600" />
      <h2 className="text-2xl font-bold text-slate-900">Import Completed</h2>
      <p className="mt-2 text-center text-slate-500">
        Your products have been imported successfully.
      </p>

      <div className="mt-8 grid w-full max-w-md grid-cols-2 gap-4">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="text-sm font-medium text-slate-500">Imported</p>
          <p className="mt-2 text-3xl font-bold text-emerald-700">
            {summary.valid}
          </p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-center">
          <p className="text-sm font-medium text-slate-500">Skipped</p>
          <p className="mt-2 text-3xl font-bold text-amber-700">
            {summary.failed}
          </p>
        </div>
      </div>

      <Button className="mt-8" onClick={onDone}>
        Done
      </Button>
    </div>
  );
};

export default ImportSuccess;
