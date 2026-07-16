import Button from "../../../../components/ui/Button";

interface ProductUnitFooterProps {
  loading: boolean;
  onCancel: () => void;
}

const ProductUnitFooter = ({ loading, onCancel }: ProductUnitFooterProps) => {
  return (
    <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
      <Button type="button" variant="secondary" onClick={onCancel}>
        Cancel
      </Button>

      <Button type="submit" variant="primary" loading={loading}>
        Add Selling Unit
      </Button>
    </div>
  );
};

export default ProductUnitFooter;
