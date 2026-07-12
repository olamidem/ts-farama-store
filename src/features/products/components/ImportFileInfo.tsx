import { FileSpreadsheet, FileText, RotateCcw } from "lucide-react";

interface ImportFileInfoProps {
  file: File;
  onReset: () => void;
}

const ImportFileInfo = ({ file, onReset }: ImportFileInfoProps) => {
  const isCsv = file.name.toLowerCase().endsWith(".csv");

  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="flex items-center gap-3">
        {isCsv ? (
          <FileText size={18} className="text-blue-600" />
        ) : (
          <FileSpreadsheet size={18} className="text-emerald-600" />
        )}
        <div>
          <p className="text-sm font-semibold text-slate-700">
            {file.name}
          </p>
          <p className="text-xs text-slate-500">
            {(file.size / 1024).toFixed(1)} KB
          </p>
        </div>
      </div>

      <button
        onClick={onReset}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
      >
        <RotateCcw size={16} />
        Reset Upload
      </button>
    </div>
  );
};

export default ImportFileInfo;