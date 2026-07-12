import * as XLSX from "xlsx";
import type { Product } from "../types/product";
import type { Category } from "../../categories/types/category";

export const exportProducts = (
  products: Product[],
  categories: Category[],
  format: "csv" | "xlsx",
) => {
  const data = products.map((product) => {
    const category = categories.find((c) => c.id === product.category_id);

    return {
      "Product Name": product.name,
      Barcode: product.barcode || "",
      Category: category?.name ?? "Uncategorized",
      "Selling Price": product.selling_price,
      "Cost Price": product.cost_price,
      Stock: product.stock,
      "Min Stock Alert": product.min_stock_alert,
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
  const filename = `products_export_${new Date().toISOString().split("T")[0]}`;

  if (format === "xlsx") {
    XLSX.writeFile(workbook, `${filename}.xlsx`);
    return;
  }

  const csv = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
