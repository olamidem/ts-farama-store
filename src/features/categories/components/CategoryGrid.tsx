import { FolderOpen } from "lucide-react";
import CategoryCard from "./CategoryCard";
import type { Category } from "../types/category";
import type { Product } from "../../products/types/product";

interface CategoryGridProps {
  categories: Category[];
  products: Product[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

const CategoryGrid = ({
  categories,
  products,
  onEdit,
  onDelete,
}: CategoryGridProps) => {
  const categoryStats = products.reduce<
    Record<string, { count: number; stock: number; valuation: number }>
  >((acc, product) => {
    const catId = product.category_id || "uncategorized";
    if (!acc[catId]) {
      acc[catId] = { count: 0, stock: 0, valuation: 0 };
    }
    acc[catId].count += 1;
    acc[catId].stock += product.stock;
    acc[catId].valuation += product.stock * product.selling_price;

    return acc;
  }, {});

  if (categories.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <FolderOpen size={28} className="text-blue-600" />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-slate-900">
            No Categories Found
          </h2>

          <p className="mt-2 max-w-sm text-sm text-slate-500">
            No categories match your search or filter. Try clearing filters or
            create a new category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => {
        const stats = categoryStats[category.id] || {
          count: 0,
          stock: 0,
          valuation: 0,
        };
        return (
          <CategoryCard
            key={category.id}
            category={category}
            productCount={stats.count}
            totalStock={stats.stock}
            totalValuation={stats.valuation}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default CategoryGrid;
