import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import PageHeader from "../../../../components/ui/PageHeader";
import Button from "../../../../components/ui/Button";
import { useCreatePurchase } from "../../hook/usePurchasesMutations";
import { useCatalogProducts, useCatalogProductUnits } from "../../hook/useCatalog";

interface PurchaseFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  isModal?: boolean;
}

const getToday = () =>
  new Date().toISOString().split("T")[0];

const getFutureDate = (days: number) => {
  const date = new Date();

  date.setDate(date.getDate() + days);

  return date.toISOString().split("T")[0];
};

const PurchaseForm = ({
  onSuccess,
  onCancel,
  isModal = false,
}: PurchaseFormProps) => {
  const router = useRouter();

  const createPurchaseMutation = useCreatePurchase();

  const {
    data: products = [],
    isLoading: loadingProducts,
  } = useCatalogProducts();

  const {
    data: productUnits = [],
    isLoading: loadingUnits,
  } = useCatalogProductUnits();

  const [supplierId, setSupplierId] =
    useState("");

  const [warehouseId, setWarehouseId] =
    useState("");

  const [remarks, setRemarks] =
    useState("");

  const [purchaseDate, setPurchaseDate] =
    useState(getToday());

  const [
    expectedDeliveryDate,
    setExpectedDeliveryDate,
  ] = useState(getFutureDate(5));

  const [items, setItems] = useState<
    ItemRowValue[]
  >([
    {
      product_id: "",
      product_unit_id: "",
      quantity: 1,
      cost_price: 0,
    },
  ]);

  const handleItemChange = (
    index: number,
    updated: Partial<ItemRowValue>,
  ) => {
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
    setItems((previous) => [
      ...previous,
      {
        product_id: "",
        product_unit_id: "",
        quantity: 1,
        cost_price: 0,
      },
    ]);
  };

  const handleRemoveRow = (
    index: number,
  ) => {
    if (items.length === 1) {
      toast.error(
        "A purchase must contain at least one item.",
      );

      return;
    }

    setItems((previous) =>
      previous.filter((_, i) => i !== index),
    );
  };

  const handleSubmit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (!supplierId) {
      toast.error(
        "Please select a supplier.",
      );

      return;
    }

    const validItems = items.filter(
      (item) =>
        item.product_id &&
        item.product_unit_id,
    );

    if (!validItems.length) {
      toast.error(
        "Please add at least one product.",
      );

      return;
    }

    try {
      await createPurchaseMutation.mutateAsync({
        supplier_id: supplierId,
        warehouse_id: warehouseId,
        purchase_date: purchaseDate,
        expected_delivery_date:
          expectedDeliveryDate,
        remarks,

        items: validItems.map((item) => ({
          product_id: item.product_id,
          product_unit_id:
            item.product_unit_id,
          quantity: item.quantity,
          unit_cost: item.cost_price,
        })),
      });
      toast.success(
        "Purchase created successfully.",
      );
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
          : "Failed to create purchase.",
      );
    }
  };

  return (
    <div className="space-y-6">
      {!isModal && (
        <PageHeader
          title="Create Purchase Order"
          description="Create a new purchase order."
        >
          <Link to="/purchases">
            <Button
              variant="secondary"
              size="sm"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
          </Link>
        </PageHeader>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        <div className="space-y-6 lg:col-span-2">
          <SupplierInformation
            supplierId={supplierId}
            setSupplierId={setSupplierId}
          />

          <PurchaseItemsTable
            items={items}
            products={products}
            productUnits={productUnits}
            loading={
              loadingProducts ||
              loadingUnits
            }
            onChange={handleItemChange}
            onAddRow={handleAddRow}
            onRemoveRow={handleRemoveRow}
          />
        </div>

        <PurchaseSummary
          warehouseId={warehouseId}
          setWarehouseId={setWarehouseId}
          purchaseDate={purchaseDate}
          setPurchaseDate={
            setPurchaseDate
          }
          expectedDeliveryDate={
            expectedDeliveryDate
          }
          setExpectedDeliveryDate={
            setExpectedDeliveryDate
          }
          remarks={remarks}
          setRemarks={setRemarks}
          isSubmitting={
            createPurchaseMutation.isPending
          }
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