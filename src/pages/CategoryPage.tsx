import { useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import CategoryGrid from "../features/categories/components/CategoryGrid";
import AddCategoryModal from "../features/categories/components/AddCategoryModal";
import { useCategories } from "../features/categories/hooks/useCategories";
import { useProducts } from "../features/products/hooks/useProducts";



const CategoryPage = () => {
  const [open, setOpen] = useState(false);
  const { data: categories = [], isLoading } =useCategories();
  const { data: products = [] } = useProducts();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Categories"
        description="Organize store catalogue items into custom filters."
      >
        <Button
          onClick={() => setOpen(true)}
        >
          Add Category
        </Button>
      </PageHeader>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <CategoryGrid
          categories={categories}
          products={products}
        />
      )}

      <AddCategoryModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default CategoryPage;