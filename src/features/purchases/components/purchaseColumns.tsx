import { Calendar, Download, Search, SlidersHorizontal } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Label from "../../../components/ui/Label";
import Select from "../../../components/ui/Select";
import { PURCHASE_STATUS_OPTIONS } from "../constant/purchase.constants";

interface PurchaseFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  supplierId: string;
  setSupplierId: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  onExport?: () => void;
}

export default function PurchaseFilters({
  search,
  setSearch,
  supplierId,
  setSupplierId,
  status,
  setStatus,
  onExport,
}: PurchaseFiltersProps) {
  const { data: suppliers = [] } = useSuppliers();

  const supplierOptions = [
    {
      label: "All Suppliers",
      value: "all",
    },
    ...suppliers.map((supplier) => ({
      label: supplier.name,
      value: supplier.id,
    })),
  ];

  const statusOptions = [
    {
      label: "All Status",
      value: "all",
    },
    ...PURCHASE_STATUS_OPTIONS,
  ];

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="grid flex-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <Label>Search</Label>

          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="PO Number or Supplier"
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label>Supplier</Label>
          <Select
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            options={supplierOptions}
          />
        </div>

        <div>
          <Label>Status</Label>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={statusOptions}
          />
        </div>

        <div>
          <Label>Date</Label>
          <Button
            variant="secondary"
            className="w-full justify-start"
            type="button"
          >
            <Calendar size={16} />
            All Dates
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button type="button" variant="secondary">
          <SlidersHorizontal size={16} />
          Filter
        </Button>

        <Button type="button" variant="secondary" onClick={onExport}>
          <Download size={16} />
          Export
        </Button>
      </div>
    </div>
  );
}
