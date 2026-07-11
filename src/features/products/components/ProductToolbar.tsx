import DataTableToolbar from "../../../components/ui/DataTable/DataTableToolbar";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import type { Category } from "../../categories/types/category";

interface ProductToolbarProps {
  search: string;
  category: string;
  status: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  categories: Category[];
}

const ProductToolbar = ({
  search,
  category,
  status,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  categories,
}: ProductToolbarProps) => {
  return (
    <DataTableToolbar
      left={
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      }
      right={
        <div className="flex items-center gap-3">
          <Select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            options={[
              { label: "All Categories", value: "" },
              ...categories.map((category) => ({
                label: category.name,
                value: category.id,
              })),
            ]}
          />

          <Select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            options={[
              { label: "All Status", value: "all" },
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
          />
        </div>
      }
    />
  );
};

export default ProductToolbar;
