import DataTable from "../../../../components/ui/DataTable/DataTable";
import { useInventoryTransactions } from "../../hooks/useInventoryQueries";
import { inventoryTransactionColumns } from "../inventoryTransactionColumns";

export default function InventoryTransactionsTable() {
  const { data: transactions = [], isLoading } = useInventoryTransactions();

  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Inventory Transactions</h2>

        <p className="text-sm text-slate-500">
          Complete inventory movement history
        </p>
      </div>

      <DataTable
        data={transactions}
        columns={inventoryTransactionColumns}
        isLoading={isLoading}
      />
    </div>
  );
}
