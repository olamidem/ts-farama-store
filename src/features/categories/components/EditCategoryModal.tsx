import { toast } from "sonner";
import Modal from "../../../components/ui/Modal";
import { useUpdateCategory } from "../hooks/useCategories";
import { checkSkuPrefixExists } from "../services/checkSkuPrefixExists.service";
import CategoryForm from "./CategoryForm";
import type { Category } from "../types/category";

interface EditCategoryModalProps {
  open: boolean;
  onClose: () => void;
  category: Category;
}

const EditCategoryModal = ({
  open,
  onClose,
  category,
}: EditCategoryModalProps) => {
  const updateCategory = useUpdateCategory();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Edit Category: ${category.name}`}
    >
      <CategoryForm
        defaultValues={category}
        loading={updateCategory.isPending}
        submitLabel="Save Changes"
        onCancel={onClose}
        onSubmit={async (data) => {
          const exists = await checkSkuPrefixExists(
            data.sku_prefix,
            category.id,
          );
          if (exists) {
            toast.error(
              `SKU Prefix "${data.sku_prefix}" already belongs to another category.`,
            );
            return;
          }
          await updateCategory.mutateAsync({
            id: category.id,
            category: data,
          });
          onClose();
        }}
      />
    </Modal>
  );
};

export default EditCategoryModal;
