import { useState } from "react";
import { toast } from "sonner";
import Button from "../../../../../components/ui/Button";
import ReceiveGoodsItem from "./ReceiveGoodsItem";
import type { Purchase } from "../../../types/purchase";
import type { ReceivePurchaseInput } from "../../../types/purchaseItem";
import ReceiveGoodsHeader from "./RecievGoodHeader";
import { useReceivePurchase } from "../../../hook/usePurchasesMutations";

interface ReceiveGoodsModalProps {
  purchase: Purchase;
  isOpen: boolean;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit?: (data: ReceivePurchaseInput) => Promise<void>;
}

const createInitialQuantities = (purchase: Purchase) =>
  Object.fromEntries((purchase.items ?? []).map((item) => [item.id, 0]));

const ReceiveGoodsModal = ({
  purchase,
  isOpen,
  isSubmitting = false,
  onClose,
  onSubmit,
}: ReceiveGoodsModalProps) => {
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    createInitialQuantities(purchase),
  );
  const receivePurchaseMutation = useReceivePurchase();
  
  if (!isOpen) return null;

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));
  };

  const handleReceiveGoods = async (data: ReceivePurchaseInput) => {
  try {
    await receivePurchaseMutation.mutateAsync(data);

    toast.success("Goods received successfully.");

    setIsReceiveModalOpen(false);
  } catch (error) {
    const err = error as Error;

    toast.error(err.message || "Failed to receive goods.");
  }
  };
  
  const handleSubmit = async () => {
    const receivedItems =
      purchase.items
        ?.filter((item) => (quantities[item.id] ?? 0) > 0)
        .map((item) => ({
          purchase_item_id: item.id,
          received_quantity: quantities[item.id],
        })) ?? [];

    if (!receivedItems.length) {
      toast.error("Please receive at least one item.");
      return;
    }

    try {
      await onSubmit?.({
        purchaseId: purchase.id,
        receivedItems,
      });

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
      <div className="flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        <ReceiveGoodsHeader
          purchaseNumber={purchase.purchase_number}
          onClose={onClose}
        />

        <div className="max-h-[60vh] space-y-4 overflow-y-auto p-5">
          {purchase.items?.map((item) => (
            <ReceiveGoodsItem
              key={item.id}
              item={item}
              value={quantities[item.id] ?? 0}
              onChange={(quantity) => handleQuantityChange(item.id, quantity)}
            />
          ))}
        </div>

        <div className="border-t border-slate-100 bg-white p-5">
          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleSubmit}
              loading={isSubmitting}
            >
              Confirm Receipt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiveGoodsModal;
