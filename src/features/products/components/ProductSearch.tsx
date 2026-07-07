import { Search } from "lucide-react";
import Input from "../../../components/ui/Input";


interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const ProductSearch = ({
  value,
  onChange,
}: ProductSearchProps) => {
  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search product inventory by name or barcode..."
        className="w-full text-xs pl-9 pr-3 py-2.5 border border-slate-200 "
      />
    </div>
  );
};

export default ProductSearch;