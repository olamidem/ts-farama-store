import { useState, useMemo } from "react";
import type { Product } from "../../types/product";
import { useUnits } from "../../../units/hooks/useUnits";
import { useProductUnits } from "../hooks/useProductUnits";
import {
  useCreateProductUnit,
  useUpdateProductUnit,
  useArchiveProductUnit,
  useRestoreProductUnit,
} from "../hooks/useProductUnitMutations";
import type { ProductUnit } from "../types/productUnit";
import type { ProductUnitFormData } from "../validation/productUnit.schema";
import { generateBarcode } from "../../utils/generateBarcode";
import { RefreshCw } from "lucide-react";

// Import modular sub-components
import { ProductUnitsHeader } from "./ProductUnitHeader";
import { ProductUnitsStats } from "./ProductUnitsStats";
import { ProductUnitsForm } from "./ProductUnitForm";
import { ProductUnitsTable } from "./ProductUnitsTable";
import { ProductInitEmptyState } from "./ProductInitEmptyState";
import { ProductUnitDeleteDialog } from "./ProductUnitDeleteDialog";
import Modal from "../../../../components/ui/Modal";

interface ProductUnitsManagerProps {
  product: Product;
}

export const ProductUnitsManager = ({ product }: ProductUnitsManagerProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [archiveUnit, setArchiveUnit] = useState<ProductUnit | null>(null);

  // Queries
  const { data: generalUnits = [] } = useUnits();
  const { data: productUnits = [], isLoading: isProductUnitsLoading } =
    useProductUnits(product.id);

  // Mutations
  const createMutation = useCreateProductUnit();
  const updateMutation = useUpdateProductUnit();
  const archiveMutation = useArchiveProductUnit();
  const restoreMutation = useRestoreProductUnit();

  // Get current editing unit object
  const editingUnit = useMemo(() => {
    return productUnits.find((pu) => pu.id === editingId) || null;
  }, [productUnits, editingId]);

  const handleEdit = (pu: ProductUnit) => {
    setEditingId(pu.id);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsFormOpen(false);
  };

  const onFormSubmit = async (data: ProductUnitFormData) => {
    try {
      const payload = {
        ...data,
        barcode: data.barcode?.trim() || generateBarcode(),
      };

      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          productId: product.id,
          data: payload,
        });
      } else {
        await createMutation.mutateAsync({
          product_id: product.id,
          ...payload,
        });
      }
      handleCancel();
    } catch {
      // Handled by mutation toast
    }
  };

  const handleToggleActive = (pu: ProductUnit) => {
    if (pu.is_active) {
      setArchiveUnit(pu);
    } else {
      restoreMutation.mutate({ id: pu.id, productId: product.id });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div id="product-units-manager" className="space-y-6">
      {/* Top Banner / Header */}
      <ProductUnitsHeader
        onAddClick={() => {
          setEditingId(null);
          setIsFormOpen(true);
        }}
      />

      {/* Stats Summary Panel */}
      {!isProductUnitsLoading && (
        <ProductUnitsStats
          productUnits={productUnits}
          product={product}
          generalUnits={generalUnits}
        />
      )}

      {/* Slide-Down Inline Form inside a Modal dialog */}
      <Modal
        open={isFormOpen}
        onClose={handleCancel}
        title={
          editingUnit
            ? `Edit Selling Unit (${editingUnit.sku})`
            : "Add Selling Unit"
        }
        size="lg"
      >
        <ProductUnitsForm
          product={product}
          generalUnits={generalUnits}
          editingUnit={editingUnit}
          onSubmit={onFormSubmit}
          onCancel={handleCancel}
          isPending={createMutation.isPending || updateMutation.isPending}
          formatCurrency={formatCurrency}
        />
      </Modal>

      {/* Selling Units List */}
      {isProductUnitsLoading ? (
        <div className="flex flex-col items-center justify-center py-10 space-y-2.5">
          <RefreshCw className="h-7 w-7 text-blue-500 animate-spin" />
          <p className="text-xs text-slate-500 font-medium">
            Loading selling units...
          </p>
        </div>
      ) : productUnits.length === 0 ? (
        <ProductInitEmptyState onAddClick={() => setIsFormOpen(true)} />
      ) : (
        <ProductUnitsTable
          productUnits={productUnits}
          generalUnits={generalUnits}
          product={product}
          formatCurrency={formatCurrency}
          onEdit={handleEdit}
          onToggleActive={handleToggleActive}
        />
      )}

      {/* Archive / Delete Dialog */}
      <ProductUnitDeleteDialog
        open={archiveUnit !== null}
        unitSymbol={
          archiveUnit
            ? `${generalUnits.find((u) => u.id === archiveUnit.unit_id)?.name || ""} (${archiveUnit.sku})`
            : ""
        }
        isPending={archiveMutation.isPending}
        onCancel={() => setArchiveUnit(null)}
        onConfirm={async () => {
          if (archiveUnit) {
            await archiveMutation.mutateAsync({
              id: archiveUnit.id,
              productId: product.id,
            });
            setArchiveUnit(null);
          }
        }}
      />
    </div>
  );
};
