import Button from "../ui/Button";

interface FormActionsProps {
  submitText: string;
  cancelText?: string;
  loading?: boolean;
  onCancel: () => void;
}

const FormActions = ({
  submitText,
  cancelText = "Cancel",
  loading = false,
  onCancel,
}: FormActionsProps) => {
  return (
    <div className="flex justify-end items-center gap-3 border-t border-slate-100 pt-3">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 h-9 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition"
      >
        {cancelText}
      </button>

      <Button
        type="submit"
        size="sm"
        loading={loading}
        className="flex items-center gap-1 font-semibold"
      >
        {submitText}
      </Button>
    </div>
  );
};

export default FormActions;
