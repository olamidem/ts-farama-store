import { CheckCircle2 } from "lucide-react";
import Button from "../../../components/ui/Button";
import type { ImportSummary } from "../types/import";

interface ImportFooterProps {
  summary: ImportSummary;
  onBack: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const ImportFooter = ({
  summary,
  onBack,
  onConfirm,
  loading
}: ImportFooterProps) => {
  return (
    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
      <p className="text-xs text-slate-400 font-medium">
        {summary.failed > 0 ? (
          <span className="text-rose-600 font-semibold">
            ⚠️ {summary.failed} invalid rows will be skipped. Only valid rows
            will be imported.
          </span>
        ) : (
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <CheckCircle2 size={14} />
            All records are valid and ready to import.
          </span>
        )}
      </p>

      <div className="flex gap-2">
        <Button variant="ghost" onClick={onBack}>
          Back to Upload
        </Button>

        <Button onClick={onConfirm} disabled={summary.valid === 0 || loading}>
          {loading ? "Importing..." : `Confirm Import (${summary.valid})`}
        </Button>
      </div>
    </div>
  );
};

export default ImportFooter;