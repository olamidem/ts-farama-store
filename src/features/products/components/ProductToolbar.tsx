
import ProductCategoryFilter from "./ProductFilter";
import ProductSearch from "./ProductSearch";

interface ProductToolbarProps {
  search: string;
  category: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const ProductToolbar = ({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}: ProductToolbarProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <ProductSearch value={search} onChange={onSearchChange} />
        </div>

        <ProductCategoryFilter value={category} onChange={onCategoryChange} />
      </div>
    </div>
  );
};

export default ProductToolbar;
