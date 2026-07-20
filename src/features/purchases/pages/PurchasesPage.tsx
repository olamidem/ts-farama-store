import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import type { Purchase } from "../types/purchase";
import type { ItemRowValue } from "../components/PurchaseForm/PurchaseItemRow";
import SupplierInformation from "../components/PurchaseForm/SupplierInformation";
import PurchaseItemsTable from "../components/PurchaseForm/PurchaseItemsTable";
import PurchaseSummary from "../components/PurchaseForm/PurchaseSummary";
import { getFutureDate, getToday } from "../utils/date";


interface PurchaseFormProps {
  purchase?: Purchase;
  onSuccess?: () => void;
  onCancel?: () => void;
  isModal?: boolean;
}

const createEmptyItem = (): ItemRowValue => ({
  product_id: "",
  product_unit_id: "",
  quantity: 1,
  cost_price: 0,
});

const PurchaseForm = ({
  purchase,
  onSuccess,
  onCancel,
  isModal = false,
}: PurchaseFormProps) => {
  const router = useRouter();

  const createPurchaseMutation = useCreatePurchase();
  const updatePurchaseMutation = useUpdatePurchase();

  const { data: products = [], isLoading: loadingProducts } =
    useCatalogProducts();

  const { data: productUnits = [], isLoading: loadingUnits } =
    useCatalogProductUnits();

  const isCatalogLoading = loadingProducts || loadingUnits;

  // Form State
  const [supplierId, setSupplierId] = useState(purchase?.supplier_id ?? "");
  const [remarks, setRemarks] = useState(purchase?.remarks ?? "");

  const [purchaseDate, setPurchaseDate] = useState(purchase?.purchase_date ?? getToday());

  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(
    purchase?.expected_delivery_date ?? getFutureDate(5),
  );

  const [items, setItems] = useState<ItemRowValue[]>(
    purchase?.items?.map((item) => ({
      product_id: item.product_id,
      product_unit_id: item.product_unit_id,
      quantity: item.quantity,
      cost_price: item.unit_cost,
    })) ?? [createEmptyItem()]
  );

  // Prefill from search query parameter
  useEffect(() => {
    if (purchase) return;

    const searchParams = new URLSearchParams(window.location.search);
    const prefilledProductId = searchParams.get("productId");

    if (prefilledProductId && products.length > 0 && productUnits.length > 0) {
      const targetProduct = products.find((p: { id: string | number; cost_price?: number; base_unit_id?: string }) => String(p.id) === String(prefilledProductId));
      if (targetProduct) {
        const associatedUnits = productUnits.filter((pu: { product_id: string | number; id: string; conversion_factor?: number }) => String(pu.product_id) === String(prefilledProductId));
        let targetUnitId = targetProduct.base_unit_id || "";
        const baseUnit = associatedUnits.find((pu: { product_id: string | number; id: string; conversion_factor?: number }) => pu.conversion_factor === 1 || String(pu.id) === String(targetProduct.base_unit_id));
        if (baseUnit) {
          targetUnitId = baseUnit.id;
        } else if (associatedUnits.length > 0) {
          targetUnitId = associatedUnits[0].id;
        }

        setTimeout(() => {
          setItems((currentItems) => {
            if (currentItems.length === 1 && currentItems[0].product_id === "") {
              return [
                {
                  product_id: prefilledProductId,
                  product_unit_id: targetUnitId,
                  quantity: 1,
                  cost_price: targetProduct.cost_price || 0,
                },
              ];
            }
            return currentItems;
          });
        }, 0);
      }
    }
  }, [products, productUnits, purchase]);


  const handleItemChange = (index: number, updated: Partial<ItemRowValue>) => {
    setItems((previous) => {
      const copy = [...previous];

      copy[index] = {
        ...copy[index],
        ...updated,
      };

      return copy;
    });
  };

  const handleAddRow = () => {
    setItems((previous) => [...previous, createEmptyItem()]);
  };

  const handleRemoveRow = (index: number) => {
    if (items.length === 1) {
      toast.error("A purchase order must contain at least one item.");
      return;
    }

    setItems((previous) =>
      previous.filter((_, currentIndex) => currentIndex !== index),
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!supplierId) {
      toast.error("Please select a supplier.");
      return;
    }

    const validItems = items.filter(
      (item) => item.product_id && item.product_unit_id,
    );

    if (!validItems.length) {
      toast.error("Please add at least one product.");
      return;
    }

    try {
      if (purchase) {
        await updatePurchaseMutation.mutateAsync({
          id: purchase.id,
          data: {
            supplier_id: supplierId,
            purchase_date: purchaseDate,
            expected_delivery_date: expectedDeliveryDate,
            remarks,
            items: validItems.map((item) => ({
              product_id: item.product_id,
              product_unit_id: item.product_unit_id,
              quantity: item.quantity,
              unit_cost: item.cost_price,
            })),
          },
        });
      } else {
        await createPurchaseMutation.mutateAsync({
          supplier_id: supplierId,
          purchase_date: purchaseDate,
          expected_delivery_date: expectedDeliveryDate,
          remarks,
          items: validItems.map((item) => ({
            product_id: item.product_id,
            product_unit_id: item.product_unit_id,
            quantity: item.quantity,
            unit_cost: item.cost_price,
          })),
        });
      }

      if (onSuccess) {
        onSuccess();
        return;
      }

      router.navigate({
        to: "/purchases",
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save purchase order.",
      );
    }
  };

  return (
    <div
      className={`w-full space-y-6 ${
        isModal ? "py-2" : "mx-auto max-w-7xl py-4"
      }`}
    >
      {!isModal && (
        <>
          <div>
            <Link to="/purchases">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={16} />
                Back
              </Button>
            </Link>
          </div>

          <PageHeader
            title={purchase ? "Edit Purchase Order" : "Create Purchase Order"}
            description={purchase ? "Modify details of the pending purchase order." : "Create a new purchase order for your supplier."}
          />
        </>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        <div className="space-y-6 lg:col-span-2">
          <SupplierInformation
            selectedSupplierId={supplierId}
            onSupplierChange={setSupplierId}
          />

          <PurchaseItemsTable
            items={items}
            products={products}
            productUnits={productUnits}
            loading={isCatalogLoading}
            onChange={handleItemChange}
            onAddRow={handleAddRow}
            onRemoveRow={handleRemoveRow}
          />
        </div>

        <PurchaseSummary
          purchaseDate={purchaseDate}
          setPurchaseDate={setPurchaseDate}
          expectedDeliveryDate={expectedDeliveryDate}
          setExpectedDeliveryDate={setExpectedDeliveryDate}
          remarks={remarks}
          setRemarks={setRemarks}
          isSubmitting={purchase ? updatePurchaseMutation.isPending : createPurchaseMutation.isPending}
          buttonText={purchase ? "Save Changes" : "Create Purchase Order"}
          onCancel={
            onCancel ??
            (() =>
              router.navigate({
                to: "/purchases",
              }))
          }
        />
      </form>
    </div>
  );
};

export default PurchaseForm;
