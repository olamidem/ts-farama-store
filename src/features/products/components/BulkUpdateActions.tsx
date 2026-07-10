import Button from "../../../components/ui/Button";

interface BulkUpdateActionsProps {
  loading?: boolean;
  onCancel: () => void;
  onApply: () => void;
}

const BulkUpdateActions = ({
  loading = false,
  onCancel,
  onApply,
}: BulkUpdateActionsProps) => {
  return (
    <div className="flex gap-2.5 pt-2">
      <Button variant="secondary" className="flex-1" onClick={onCancel}>
        Cancel
      </Button>

      <Button className="flex-1" loading={loading} onClick={onApply}>
        Apply Update
      </Button>
    </div>
  );
};

export default BulkUpdateActions;
