import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Product } from "../types/product";
import type { Category } from "../../categories/types/category";
import type { ValidatedImportRecord, ImportSummary } from "../types/import";
import { createProducts } from "../services/productImportExport.service";
import { parseImportFile } from "../utils/parseImportFiles";
import { validateImportRecords } from "../utils/ValidateImport";

export const useProductImport = (
  existingProducts: Product[],
  categories: Category[],
  onSuccess?: () => void,
) => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [records, setRecords] = useState<ValidatedImportRecord[]>([]);
  const [summary, setSummary] = useState<ImportSummary | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const resetImportState = () => {
    setFile(null);
    setRecords([]);
    setSummary(null);
    setIsProcessing(false)
  };

  /**
   * Parse + Validate
   */
const processImportFile = async (selectedFile: File) => {
  try {
    setIsProcessing(true);
    setFile(selectedFile);
    const rawRecords = await parseImportFile(selectedFile);

    const { validatedRecords, summary: importSummary } = validateImportRecords(
      rawRecords,
      existingProducts,
      categories,
    );
    setRecords(validatedRecords);
    setSummary(importSummary);

  } catch (error) {
    toast.error("Unable to read the selected file.");
    console.error("Product import failed:", error);
    resetImportState();
    
  } finally {
    setIsProcessing(false);
  }
};

  /**
   * Import Mutation
   */
  const importMutation = useMutation({
    mutationFn: async () => {
      const validProducts = records
        .filter((record) => record.isValid)
        .map((record) => ({
          name: record.name,
          barcode: record.barcode || undefined,
          selling_price: record.selling_price,
          cost_price: record.cost_price,
          stock: record.stock,
          category_id: record.category_id,
            min_stock_alert: record.min_stock_alert,
            is_active: true,
        }));
      if (validProducts.length === 0) {
        throw new Error("No valid products to import.");
      }

      await createProducts(validProducts);
    },
    onSuccess: async () => {
      toast.success(`${summary?.valid ?? 0} products imported successfully.`);
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      resetImportState();
      onSuccess?.();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to import products.");
    },
  });

  return {
    file,
    records,
    summary,
    loading: isProcessing || importMutation.isPending,
    processImportFile,
    confirmImport: importMutation.mutate,
    resetImportState,
  };
};
