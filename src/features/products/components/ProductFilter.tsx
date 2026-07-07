import Select from "../../../components/ui/Select";

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
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="All Categories"
        options={[
          {
            label: "All Categories",
            value: "",
          },
        ]}
        className="min-w-52"
      />
    </div>
  );
};

export default ProductCategoryFilter;
