interface ProductCategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const ProductCategoryFilter = ({
  value,
  onChange,
}: ProductCategoryFilterProps) => {
  return (
    <div className="flex items-center gap-2">
      <label className="font-semibold text-slate-700">Category</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-lg border border-gray-300 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
      </select>
    </div>
  );
};

export default ProductCategoryFilter;
