import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { useDeleteCategory } from "../hooks/useCategories";
import type { Category } from "../types/category";

interface DeleteCategoryModalProps {
  open: boolean;
  onClose: () => void;
  category: Category;
}

const DeleteCategoryModal = ({
  open,
  onClose,
  category,
}: DeleteCategoryModalProps) => {
  const deleteMutation = useDeleteCategory();

  return (
    <ConfirmDialog
      open={open}
      title="Delete Category"
      subtitle="This action is irreversible"
      description={`Are you sure you want to permanently delete the category "${category.name}"? This will clean up its record from the database.`}
      confirmationKeyword="DELETE"
      confirmText="Delete Category"
      cancelText="Cancel"
      loading={deleteMutation.isPending}
      variant="danger"
      onCancel={onClose}
      onConfirm={async () => {
        try {
          await deleteMutation.mutateAsync(category.id);
          onClose();
        } catch {
          // Error toast is handled automatically by the hook
        }
      }}
    />
  );
};

export default DeleteCategoryModal;
