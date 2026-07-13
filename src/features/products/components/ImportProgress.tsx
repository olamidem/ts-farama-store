import { RefreshCw } from "lucide-react";

interface ImportProgressProps {
  message?: string;
}

const ImportProgress = ({
  message = "Processing spreadsheet and validating records...",
}: ImportProgressProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-14">
      <div className="mb-5 rounded-full bg-blue-50 p-4">
        <RefreshCw size={34} className="animate-spin text-blue-600" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900">
        Import in Progress
      </h3>
      <p className="mt-2 max-w-sm text-center text-sm text-slate-500">
        {message}
      </p>
    </div>
  );
};

export default ImportProgress;
