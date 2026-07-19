import DataTable from "../../../../components/ui/DataTable/DataTable";
import { formatCurrency } from "../../../../utils/formatCurrenty";
import type { Purchase } from "../../types/purchase";
import { purchaseItemsColumns } from "./purchaseItemsColums";

interface PurchaseItemsTableProps {
  purchase: Purchase;
}

const PurchaseItemsTable = ({ purchase }: PurchaseItemsTableProps) => {
  const items = purchase.items ?? [];

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs">
      <h4 className="mb-5 text-xs font-bold uppercase tracking-wide text-slate-700">
        Purchase Items
      </h4>

      <DataTable
        data={items}
        columns={purchaseItemsColumns}
        isLoading={false}
        emptyTitle="No Purchase Items"
        emptyDescription="This purchase does not contain any products."
      />

      {items.length > 0 && (
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-700">
            Grand Total
          </span>

          <span className="font-mono text-lg font-bold text-indigo-600">
            {formatCurrency(purchase.total_amount)}
          </span>
        </div>
      )}
    </div>
  );
};

export default PurchaseItemsTable;
