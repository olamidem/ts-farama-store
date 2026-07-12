import { CheckCircle2, FileSpreadsheet, HelpCircle, X} from "lucide-react";
import Modal from "../../../components/ui/Modal";
import { useProductImport } from "../hooks/useProductImport";
import ImportDropzone from "./ImportDropzone";
import ImportSummaryCard from "./ImportSummaryCard";
import ImportValidationTable from "./ImportValidationTable";
import ImportFooter from "./ImportFooter";
import ImportProgress from "./ImportProgress";

import type { Product } from "../types/product";
import type { Category } from "../../categories/types/category";
import ImportFileInfo from "./ImportFileInfo";
import { ImportPreviewTable } from "./ImportPreviewtable";

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
  } = useProductImport(existingProducts, categories, onClose);

  const handleClose = () => {
    resetImportState();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Bulk Import Products"
      size="xl"
    >
      <div className="space-y-5" id="product-import-container">
        {/* Upload Step */}
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
                    <strong>Barcode</strong> must be unique if provided. Empty
                    values are auto-generated.
                  </li>

                  <li>
                    <strong>Category</strong> must exist in your product
                    categories.
                  </li>

                  <li>
                    <strong>Selling Price</strong> must be greater than zero.
                    Cost Price and Stock cannot be negative.
                  </li>
                </ul>
              </div>
            </div>

            <ImportDropzone onFileSelected={processImportFile} />
          </div>
        )}

        {/* Loading */}
        {loading && (
          <ImportProgress message="Processing data, validating row rules..." />
        )}

        {/* Preview */}
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
                percentage={Math.round((summary.valid / summary.total) * 100)}
                percentageText={`${Math.round((summary.valid / summary.total) * 100)}% valid`}
                icon={CheckCircle2}
                iconBgColor="bg-emerald-50"
                iconTextColor="text-emerald-600"
                progressColor="bg-emerald-500"
              />

              <ImportSummaryCard
                title="Validation Errors"
                value={summary.failed}
                percentage={Math.round((summary.failed / summary.total) * 100)}
                percentageText={`${Math.round((summary.failed / summary.total) * 100)}% failed`}
                icon={X}
                iconBgColor="bg-rose-50"
                iconTextColor="text-rose-600"
                progressColor="bg-rose-500"
              />
            </div>

            {summary.failed > 0 && <ImportValidationTable records={records} />}

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Spreadsheet Row Preview
              </h4>

              <ImportPreviewTable records={records} />
            </div>

            <ImportFooter
              summary={summary}
              onBack={resetImportState}
              onConfirm={confirmImport}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ProductImportModal;
