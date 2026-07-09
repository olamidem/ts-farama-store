import Modal from "../../../components/ui/Modal";
import { useCreateCategory } from "../hooks/useCategories";
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
          await createCategory.mutateAsync(data);

          onClose();
        }}
      />
    </Modal>
  );
};

export default AddCategoryModal;
