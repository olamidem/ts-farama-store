import { AlertCircle } from "lucide-react";
import type { ValidatedImportRecord } from "../types/import";

interface ImportValidationTableProps {
  records: ValidatedImportRecord[];
}

export const ImportValidationTable = ({
  records,
}: ImportValidationTableProps) => {
  const invalidRecords = records.filter((r) => !r.isValid);

  if (invalidRecords.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3" id="import-validation-errors-section">
      <div className="flex items-center gap-2 text-rose-700">
        <AlertCircle size={18} />
        <h4 className="text-xs font-bold uppercase tracking-wider">
          Validation Failures & Fix Instructions
        </h4>
      </div>
      <div className="border border-rose-100 rounded-lg overflow-hidden max-h-60 overflow-y-auto bg-rose-50/10">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-rose-50 text-rose-800 font-semibold uppercase tracking-wider">
            <tr>
              <th className="p-3 w-16 text-center">Row</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Identified Errors</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rose-100">
            {invalidRecords.map((record) => (
              <tr
                key={record.rowNumber}
                className="hover:bg-rose-50/20 transition-colors"
              >
                <td className="p-3 text-center font-bold text-rose-700">
                  {record.rowNumber}
                </td>
                <td
                  className="p-3 font-semibold text-slate-800 truncate max-w-[200px]"
                  title={record.name}
                >
                  {record.name || (
                    <span className="text-rose-500 italic">Empty Name</span>
                  )}
                </td>
                <td className="p-3">
                  <ul className="list-disc pl-4 text-rose-600 font-medium space-y-1">
                    {record.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImportValidationTable;
