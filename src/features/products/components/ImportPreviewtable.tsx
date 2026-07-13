import { AlertCircle, CheckCircle } from "lucide-react";
import type { ValidatedImportRecord } from "../types/import";
interface ImportPreviewTableProps {
  records: ValidatedImportRecord[];
}
export const ImportPreviewTable = ({
  records,
}: ImportPreviewTableProps) => {
  const previewRecords = records.slice(0, 50);

  return (
    <div className="max-h-[50vh] overflow-y-auto rounded-lg border border-slate-200">
      <table className="w-full border-collapse text-left text-xs">
        <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 text-slate-700">
          <tr className="uppercase tracking-wider">
            <th className="w-12 p-3 text-center">Row</th>
            <th className="p-3">Status</th>
            <th className="min-w-[180px] p-3">Product Name</th>
            <th className="p-3">Barcode</th>
            <th className="p-3">Category</th>
            <th className="p-3 text-right">Selling Price</th>
            <th className="p-3 text-right">Cost Price</th>
            <th className="p-3 text-right">Stock</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 bg-white">
          {previewRecords.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="p-8 text-center font-medium text-slate-400"
              >
                No preview records to display.
              </td>
            </tr>
          ) : (
            previewRecords.map((record) => (
              <tr
                key={record.rowNumber}
                className={`transition-colors hover:bg-slate-50 ${
                  !record.isValid ? "bg-rose-50/20" : ""
                }`}
              >
                <td className="p-3 text-center font-medium text-slate-400">
                  {record.rowNumber}
                </td>

                <td className="p-3">
                  {record.isValid ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      <CheckCircle size={10} />
                      Valid
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-700">
                      <AlertCircle size={10} />
                      Invalid
                    </span>
                  )}
                </td>

                <td
                  className="max-w-[220px] truncate p-3 font-medium text-slate-900"
                  title={record.name}
                >
                  {record.name || (
                    <span className="italic text-rose-500">
                      Missing name
                    </span>
                  )}
                </td>

                <td className="p-3 font-mono text-slate-600">
                  {record.barcode || (
                    <span className="italic text-slate-400">
                      Auto-generated
                    </span>
                  )}
                </td>

                <td className="p-3">
                  {record.category_name ? (
                    <span className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5">
                      {record.category_name}
                    </span>
                  ) : (
                    <span className="italic text-rose-500">
                      {String(
                        record.raw?.Category ??
                          record.raw?.category ??
                          "Missing Category"
                      )}
                    </span>
                  )}
                </td>

                <td
                  className={`p-3 text-right font-medium ${
                    record.selling_price <= 0
                      ? "font-semibold text-rose-600"
                      : "text-slate-700"
                  }`}
                >
                  ${record.selling_price.toFixed(2)}
                </td>

                <td
                  className={`p-3 text-right font-medium ${
                    record.cost_price < 0
                      ? "font-semibold text-rose-600"
                      : "text-slate-700"
                  }`}
                >
                  ${record.cost_price.toFixed(2)}
                </td>

                <td
                  className={`p-3 text-right font-semibold ${
                    record.stock < 0
                      ? "text-rose-600"
                      : "text-blue-600"
                  }`}
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

