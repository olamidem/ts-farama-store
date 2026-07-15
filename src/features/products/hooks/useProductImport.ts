import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Category } from "../../categories/types/category";
import type {
  ValidatedImportRecord,
  ImportSummary,
  DuplicateStrategy,
} from "../types/import";
import { parseImportFile } from "../utils/parseImportFiles";
import { validateImportRecords } from "../utils/ValidateImport";
import { getExistingProductsForImport } from "../services/getExistingProductsForImport.service";
import { mapRowToProduct } from "../utils/mapRowToProduct";
import {
  bulkCreateImportProducts,
  bulkUpdateImportProducts,
} from "../services/product.service";

export const useProductImport = (
  categories: Category[],
  onSuccess?: () => void,
) => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [records, setRecords] = useState<ValidatedImportRecord[]>([]);
  const [summary, setSummary] = useState<ImportSummary | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importCompleted, setImportCompleted] = useState(false);
  const [duplicateStrategy, setDuplicateStrategy] =
    useState<DuplicateStrategy>("skip");

  const resetImportState = () => {
    setFile(null);
    setRecords([]);
    setSummary(null);
    setIsProcessing(false);
    setImportCompleted(false);
  };
  /**
   * Parse + Validate
   */
  const processImportFile = async (selectedFile: File) => {
    try {
      setIsProcessing(true);
      setFile(selectedFile);

      // 1. Read spreadsheet
      const rawRows = await parseImportFile(selectedFile);

      // 2. Normalize spreadsheet columns
      const parsedRows = rawRows.map(mapRowToProduct);

      // 3. Fetch existing products by imported names
      const names = [
        ...new Set(
          parsedRows.map((row) => row.name).filter((name) => name.length > 0),
        ),
      ];
      const existingDatabaseProducts =
        await getExistingProductsForImport(names);

      // 4. Validate
      const { validatedRecords, summary: importSummary } =
        validateImportRecords(parsedRows, existingDatabaseProducts, categories);

      // 5. Store results
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
      const productsToCreate = records
        .filter((record) => record.isValid && record.action === "create")
        .map((record) => ({
          name: record.name,
          barcode: record.barcode,
          selling_price: record.selling_price,
          cost_price: record.cost_price,
          stock: record.stock,
          sku: record.sku,
          category_id: record.category_id,
          min_stock_alert: record.min_stock_alert,
          is_active: true,
        }));

      const productsToUpdate = records.filter(
        (record) => record.isValid && record.action === "update",
      );

      if (productsToCreate.length > 0) {
        await bulkCreateImportProducts(productsToCreate, categories);
      }

      if (productsToUpdate.length > 0) {
        await bulkUpdateImportProducts(productsToUpdate);
      }
    },
    onSuccess: async () => {
      const created = records.filter(
        (r) => r.action === "create" && r.isValid,
      ).length;

      const updated = records.filter(
        (r) => r.action === "update" && r.isValid,
      ).length;

     const skipped = records.filter(
       (r) => r.isValid && r.action === "skip",
     ).length;

      toast.success(
        `Import completed. ${created} created, ${updated} updated, ${skipped} skipped.`,
      );
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      setImportCompleted(true);
      onSuccess?.();
    },
    onError: (error) => {
    console.error(error);
    toast.error(
        error instanceof Error
            ? error.message
            : "Failed to import products."
    );
},
  });

  const updateImportAction = (
    rowNumber: number,
    action: "create" | "update" | "skip",
  ) => {
    setRecords((previous) =>
      previous.map((record) =>
        record.rowNumber === rowNumber
          ? {
              ...record,
              action,
            }
          : record,
      ),
    );
  };

  const applyDuplicateStrategy = (strategy: DuplicateStrategy) => {
    setDuplicateStrategy(strategy);
    setRecords((current) =>
      current.map((record) => {
        if (!record.duplicateProduct) {
          return record;
        }
        return {
          ...record,
          action: strategy,
        };
      }),
    );
  };

  return {
    file,
    records,
    summary,
    loading: isProcessing || importMutation.isPending,
    processImportFile,
    confirmImport: importMutation.mutate,
    resetImportState,
    importCompleted,
    updateImportAction,
    duplicateStrategy,
    applyDuplicateStrategy,
  };
};


