import { useCallback } from "react";
import { exportProducts } from "../utils/exportProducts";
import type { Product } from "../types/product";
import type { Category } from "../../categories/types/category";
import { downloadImportTemplate } from "../utils/downloadTemplate";

export const useProductExport = () => {
  const handleExportProducts = useCallback(
    (products: Product[], categories: Category[], format: "csv" | "xlsx") => {
      exportProducts(products, categories, format);
    },
    [],
  );

  const handleDownloadTemplate = useCallback((format: "csv" | "xlsx") => {
    downloadImportTemplate(format);
  }, []);

  return {
    exportProducts: handleExportProducts,
    downloadTemplate: handleDownloadTemplate,
  };
};
