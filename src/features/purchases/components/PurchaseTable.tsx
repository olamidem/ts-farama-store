import { useMemo, useState } from "react";
import DataTable from "../../../components/ui/DataTable/DataTable";
import { createPurchaseColumns } from "./purchaseColumns";
import type { Purchase } from "../types/purchase";
import Pagination from "../../../components/ui/pagination/Pagination";

interface PurchaseTableProps {
  purchases: Purchase[];
  isLoading: boolean;
  onView: (purchase: Purchase) => void;
  onEdit: (purchase: Purchase) => void;
  onDelete: (id: string) => void;
  isCompact?: boolean;
}

const PurchaseTable = ({
  purchases,
  isLoading,
  onView,
  onEdit,
  onDelete,
  isCompact = false,
}: PurchaseTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const paginatedPurchases = useMemo(() => {
    const start = (page - 1) * pageSize;

    return purchases.slice(start, start + pageSize);
  }, [purchases, page, pageSize]);

  const columns = useMemo(
    () =>
      createPurchaseColumns({
        onView,
        onEdit,
        onDelete,
        isCompact,
      }),
    [onView, onEdit, onDelete, isCompact],
  );

  return (
    <div className="space-y-5">
      <DataTable
        data={paginatedPurchases}
        columns={columns}
        isLoading={isLoading}
        emptyTitle="No purchase orders"
        emptyDescription="Create your first purchase order to get started."
      />

      {!isLoading && purchases.length > 0 && (
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={purchases.length}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
          itemName="purchase orders"
        />
      )}
    </div>
  );
};

export default PurchaseTable;
