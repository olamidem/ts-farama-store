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
import type { Product } from "../types/product";
import type { Category } from "../../categories/types/category";

interface ProductImportModalProps {
  open: boolean;
  onClose: () => void;
  existingProducts: Product[];
  categories: Category[];
}

const ProductImportModal = ({
  open,
  onClose,
  existingProducts,
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
  } = useProductImport(existingProducts, categories, onClose);

  const handleClose = () => {
    resetImportState();
    onClose();
  };

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
                <div className="flex gap-3 rounded-xl border border-blue-200/60 bg-blue-50/50 p-4 text-xs leading-relaxed text-blue-800">
                  <HelpCircle className="shrink-0 text-blue-500" size={18} />
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-blue-900">
                      Import Validation Guidelines
                    </p>
                    <ul className="list-disc space-y-1 pl-4">
                      <li>
                        <strong>Product Name</strong> is required.
                      </li>
                      <li>
                        <strong>Barcode</strong> must be unique if provided.
                        Empty values are auto-generated.
                      </li>
                      <li>
                        <strong>Category</strong> must exist in your product
                        categories.
                      </li>
                      <li>
                        <strong>Selling Price</strong> must be greater than
                        zero. Cost Price and Stock cannot be negative.
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

                {summary.failed > 0 && (
                  <ImportValidationTable records={records} />
                )}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Spreadsheet Row Preview
                  </h4>
                  <div className="rounded-xl border border-slate-200">
                    <div className="max-h-[350px] overflow-y-auto">
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
