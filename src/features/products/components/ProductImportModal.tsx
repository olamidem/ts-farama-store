import { CheckCircle2, FileSpreadsheet, HelpCircle, X } from "lucide-react";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import { useProductImport } from "../hooks/useProductImport";
import ImportDropzone from "./ImportDropzone";
import ImportSummaryCard from "./ImportSummaryCard";
import ImportValidationTable from "./ImportValidationTable";
import ImportFooter from "./ImportFooter";
import ImportProgress from "./ImportProgress";
import ImportFileInfo from "./ImportFileInfo";
import { ImportPreviewTable } from "./ImportPreviewtable";
import type { Category } from "../../categories/types/category";
import DuplicateHandling from "./DuplicateHandling";
import ImportPlan from "./ImportantPlan";
import { useEffect } from "react";

interface ProductImportModalProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
}

const ProductImportModal = ({
  open,
  onClose,
  categories,
}: ProductImportModalProps) => {
  const {
    file,
    loading,
    records,
    summary,
    processImportFile,
    confirmImport,
    resetImportState,
    importCompleted,
    duplicateStrategy,
    applyDuplicateStrategy
  } = useProductImport( categories, onClose);

  const handleClose = () => {
    resetImportState();
    onClose();
  };

  useEffect(() => {
  if (open) {
    resetImportState();
  }
}, [open]);

  const validPercentage =
    summary && summary.total > 0
      ? Math.round((summary.valid / summary.total) * 100)
      : 0;

  const failedPercentage =
    summary && summary.total > 0
      ? Math.round((summary.failed / summary.total) * 100)
      : 0;

      
  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Bulk Import Products"
      size="lg"
    >
      <div className="space-y-5">
        {/* ================= SUCCESS ================= */}
        {importCompleted ? (
          <div className="flex flex-col items-center justify-center py-14">
            <CheckCircle2 size={64} className="mb-5 text-emerald-600" />
            <h2 className="text-2xl font-bold text-slate-900">
              Import Completed
            </h2>
            <p className="mt-2 text-center text-slate-500">
              {summary?.valid} products have been imported successfully.
            </p>
            <Button className="mt-8" onClick={handleClose}>
              Done
            </Button>
          </div>
        ) : (
          <>
            {/* ================= Upload ================= */}
            {!file && (
              <div className="space-y-5">
                <div className="bg-linear-to-r from-blue-50/60 to-indigo-50/60 border border-blue-100 rounded-2xl p-5 text-slate-700 flex gap-4 leading-relaxed shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 shrink-0 shadow-xs">
                    <HelpCircle size={18} />
                  </div>
                  <div>
                    <p className="font-black uppercase tracking-wider text-[10px] text-blue-900 mb-1.5">
                      Spreadsheet Import Guidelines
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-600 font-medium">
                      <li className="flex items-start gap-1.5">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>
                          <strong className="text-slate-800">
                            Product Name:
                          </strong>{" "}
                          Required, must be unique.
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>
                          <strong className="text-slate-800">Barcode:</strong>{" "}
                          Left blank to auto-generate codes.
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>
                          <strong className="text-slate-800">
                            Category ID:
                          </strong>{" "}
                          Matches existing registered categories.
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>
                          <strong className="text-slate-800">
                            Pricing & Stock:
                          </strong>{" "}
                          Sell Price &gt; 0, and Stock &ge; 0.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <ImportDropzone onFileSelected={processImportFile} />
              </div>
            )}

            {/* ================= Loading ================= */}
            {loading && (
              <ImportProgress message="Processing data, validating row rules..." />
            )}
            {/* ================= Preview ================= */}
            {file && !loading && summary && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <ImportFileInfo file={file} onReset={resetImportState} />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <ImportSummaryCard
                    title="Total Rows"
                    value={summary.total}
                    percentage={100}
                    percentageText="Spreadsheet rows"
                    icon={FileSpreadsheet}
                    iconBgColor="bg-blue-50"
                    iconTextColor="text-blue-600"
                    progressColor="bg-blue-500"
                  />

                  <ImportSummaryCard
                    title="Ready to Import"
                    value={summary.valid}
                    percentage={validPercentage}
                    percentageText={`${validPercentage}% valid`}
                    icon={CheckCircle2}
                    iconBgColor="bg-emerald-50"
                    iconTextColor="text-emerald-600"
                    progressColor="bg-emerald-500"
                  />

                  <ImportSummaryCard
                    title="Validation Errors"
                    value={summary.failed}
                    percentage={failedPercentage}
                    percentageText={`${failedPercentage}% failed`}
                    icon={X}
                    iconBgColor="bg-rose-50"
                    iconTextColor="text-rose-600"
                    progressColor="bg-rose-500"
                  />
                </div>

                {summary.duplicateProducts > 0 && (
                  <DuplicateHandling
                    duplicateCount={summary.duplicateProducts}
                    strategy={duplicateStrategy}
                    onChange={applyDuplicateStrategy}
                  />
                )}
                <ImportPlan records={records} summary={summary} />
                {summary.failed > 0 && (
                  <ImportValidationTable records={records} />
                )}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Spreadsheet Row Preview
                  </h4>
                  <div className="rounded-xl border border-slate-200">
                    <div className="max-h-87.5 overflow-y-auto">
                      <ImportPreviewTable records={records} />
                    </div>
                  </div>
                </div>

                {summary.valid === 0 && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <p className="font-semibold text-amber-800">
                      No valid products found
                    </p>
                    <p className="mt-1 text-sm text-amber-700">
                      Please correct the highlighted rows and upload the file
                      again.
                    </p>
                  </div>
                )}

                <ImportFooter
                  summary={summary}
                  onBack={resetImportState}
                  onConfirm={confirmImport}
                  loading={loading}
                />
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};
export default ProductImportModal;
