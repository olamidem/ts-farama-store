import type { ProductUnit } from "../types/productUnit";
import type { Unit } from "../../../units/types/unit";
import DataTable from "../../../../components/ui/DataTable/DataTable";
import Pagination from "../../../../components/ui/pagination/Pagination";
import { getProductUnitColumns } from "../columns/ProductUnitColumns";


interface ProductUnitsTableProps {
  productUnits: ProductUnit[];
  generalUnits: Unit[];

  page: number;
  pageSize: number;
  totalItems: number;
  isLoading: boolean;
  formatCurrency: (value: number) => string;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onEdit: (unit: ProductUnit) => void;
  onDelete: (id: string) => void;
}

export default function ProductUnitsTable({
  productUnits,
  generalUnits,
  page,
  pageSize,
  totalItems,
  isLoading,
  formatCurrency,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
}: ProductUnitsTableProps) {
  const columns = getProductUnitColumns({
    generalUnits,
    formatCurrency,
    onEdit,
    onDelete,
  });

  return (
    <div className="space-y-4">
      <DataTable
        data={productUnits}
        columns={columns}
        isLoading={isLoading}
        emptyTitle="No selling units"
        emptyDescription="Create the first selling unit for this product."
      />

      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        itemName="selling units"
      />
    </div>
  );
}
