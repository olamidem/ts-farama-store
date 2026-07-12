import { CheckCircle, AlertCircle } from "lucide-react";
import type { ValidatedImportRecord } from "../types/import";

interface ImportPreviewTableProps {
  records: ValidatedImportRecord[];
}

export const ImportPreviewTable = ({ records }: ImportPreviewTableProps) => {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
      <table className="w-full text-left border-collapse text-xs">
        <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
          <tr>
            <th className="p-3 w-12 text-center">Row</th>
            <th className="p-3">Status</th>
            <th className="p-3 min-w-[150px]">Product Name</th>
            <th className="p-3">Barcode</th>
            <th className="p-3">Category</th>
            <th className="p-3 text-right">Selling Price</th>
            <th className="p-3 text-right">Cost Price</th>
            <th className="p-3 text-right">Stock</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {records.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="p-8 text-center text-slate-400 font-medium"
              >
                No preview records to display.
              </td>
            </tr>
          ) : (
            records.map((record) => (
              <tr
                key={record.rowNumber}
                className={`hover:bg-slate-50/50 transition-colors ${!record.isValid ? "bg-rose-50/10" : ""}`}
              >
                <td className="p-3 text-center font-medium text-slate-400">
                  {record.rowNumber}
                </td>
                <td className="p-3">
                  {record.isValid ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      <CheckCircle size={10} />
                      Valid
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-800">
                      <AlertCircle size={10} />
                      Invalid
                    </span>
                  )}
                </td>
                <td
                  className="p-3 font-medium text-slate-900 max-w-[200px] truncate"
                  title={record.name}
                >
                  {record.name || (
                    <span className="text-rose-500 italic">Missing name</span>
                  )}
                </td>
                <td className="p-3 font-mono text-slate-600">
                  {record.barcode || (
                    <span className="text-slate-400 italic">
                      Auto-generated
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {record.category_name ? (
                    <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-700">
                      {record.category_name}
                    </span>
                  ) : (
                    <span className="text-rose-500 italic">
                      {String(
                        record.raw?.Category ||
                          record.raw?.category ||
                          "Missing Category",
                      )}
                    </span>
                  )}
                </td>
                <td
                  className={`p-3 text-right font-medium ${record.selling_price <= 0 ? "text-rose-600 font-semibold" : "text-slate-700"}`}
                >
                  ${record.selling_price.toFixed(2)}
                </td>
                <td
                  className={`p-3 text-right font-medium ${record.cost_price < 0 ? "text-rose-600 font-semibold" : "text-slate-700"}`}
                >
                  ${record.cost_price.toFixed(2)}
                </td>
                <td
                  className={`p-3 text-right font-semibold ${record.stock < 0 ? "text-rose-600" : "text-blue-600"}`}
                >
                  {record.stock}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

