import { useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Label from "../../../components/ui/Label";
import Select from "../../../components/ui/Select";

interface ProductFormProps {
  onCancel: () => void;
}

const categoryOptions = [
  {
    label: "Select Category",
    value: "",
  },
  {
    label: "Beverages",
    value: "beverages",
  },
  {
    label: "Groceries",
    value: "groceries",
  },
];

const ProductForm = ({ onCancel }: ProductFormProps) => {
  const [category, setCategory] = useState("");

  return (
    <form className="space-y-5">
      <div className="space-y-1">
        <Label className="block text-[10px] font-bold text-slate-400 uppercase">
          Product Name *
        </Label>

        <Input id="name" placeholder="e.g. Coca-Cola 50cl" />
      </div>

      <div className="space-y-1">
        <Label>Barcode</Label>

        <Input id="barcode" placeholder="Leave empty to auto-generate" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Selling Price</Label>

          <Input type="number" />
        </div>

        <div className="space-y-1">
          <Label>Cost Price</Label>

          <Input type="number" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Stock Quantity</Label>

          <Input type="number" />
        </div>

        <div className="space-y-1">
          <Label>Minimum Alert</Label>

          <Input type="number" />
        </div>
      </div>

      <div className="space-y-1">
        <Label>Category</Label>

        <Select
          options={categoryOptions}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit">Save Product</Button>
      </div>
    </form>
  );
};

export default ProductForm;
