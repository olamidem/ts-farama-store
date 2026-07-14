import type { ValidatedImportRecord, ImportSummary } from "../types/import";

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
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="mb-3 font-semibold text-slate-900">Import Plan</h3>
      <div className="space-y-2 text-sm">
        <p>✅ Create {createCount} products</p>
        <p>🔄 Update {updateCount} products</p>
        <p>⏭ Skip {skipCount} products</p>
        <p>❌ Ignore {summary.failed} invalid rows</p>
      </div>
    </div>
  );
};

export default ImportPlan;
