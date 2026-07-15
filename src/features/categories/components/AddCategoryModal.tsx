import { toast } from "sonner";
import Modal from "../../../components/ui/Modal";
import { useCreateCategory } from "../hooks/useCategories";
import { checkSkuPrefixExists } from "../services/checkSkuPrefixExists.service";
import CategoryForm from "./CategoryForm";

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
}

const AddCategoryModal = ({ open, onClose }: AddCategoryModalProps) => {
  const createCategory = useCreateCategory();

  return (
    <Modal open={open} onClose={onClose} title="Add Category">
      <CategoryForm
        loading={createCategory.isPending}
        submitLabel="Create Category"
        onCancel={onClose}
        onSubmit={async (data) => {
          const exists = await checkSkuPrefixExists(data.sku_prefix);
          if (exists) {
            toast.error(
              `SKU Prefix "${data.sku_prefix}" already belongs to another category.`,
            );
            return;
          }
          await createCategory.mutateAsync(data);
          onClose();
        }}
      />
    </Modal>
  );
};

export default AddCategoryModal;