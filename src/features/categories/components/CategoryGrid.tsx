import { FolderOpen } from "lucide-react";
import CategoryCard from "./CategoryCard";
import type { Category } from "../types/category";
import type { Product } from "../../products/types/product";


interface CategoryGridProps {
  categories: Category[];
  products: Product[];
}

const CategoryGrid = ({ categories, products }: CategoryGridProps) => {
  const productCountMap = products.reduce<Record<string, number>>(
    (acc, product) => {
      acc[product.category_id] = (acc[product.category_id] ?? 0) + 1;

      return acc;
    },
    {},
  );

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
            You haven't created any categories yet. Create your first category
            to organize your products.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          productCount={productCountMap[category.id] ?? 0}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;
