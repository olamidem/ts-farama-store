import {  useState } from "react";
import Modal from "../../../components/ui/Modal";
import type { Product } from "../types/product";
import BulkUpdateForm from "./BulkUpdateForm";
import BulkUpdatePreview from "./BulkUpdatePreview";
import BulkUpdateActions from "./BulkUpdateActions";
import { useBulkPricePreview } from "../hooks/useBulkPricePreview";

const BulkUpdateModal = ({
  open,
  onClose,
  selectedProducts,
}: {
  open: boolean;
  onClose: () => void;
  selectedProducts: Product[];
}) => {
  const [amount, setAmount] = useState("");
  const [updateType, setUpdateType] = useState<"selling" | "cost" | "both">(
    "selling",
  );
  const [method, setMethod] = useState<"percentage" | "fixed">("percentage");
  const [operation, setOperation] = useState<"increase" | "decrease">(
    "increase",
  );

  const previewProducts = useBulkPricePreview({
    products: selectedProducts,
    amount: Number(amount) || 0,
    updateType,
    method,
    operation,
  });

  const handleApply = () => {
    console.log({
      updateType,
      method,
      operation,
      amount,
      selectedProducts,
    });
      setAmount("")
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      title={`Bulk Update Prices (${selectedProducts.length} ${
        selectedProducts.length === 1 ? "Item" : "Items"
      })`}
    >
      <div className="space-y-5">
        <BulkUpdateForm
          amount={amount}
          method={method}
          operation={operation}
          updateType={updateType}
          onAmountChange={setAmount}
          onMethodChange={setMethod}
          onOperationChange={setOperation}
          onUpdateTypeChange={setUpdateType}
        />

        <BulkUpdatePreview products={previewProducts} updateType={updateType} operation={operation} />
        <BulkUpdateActions onCancel={onClose} onApply={handleApply} />
      </div>
    </Modal>
  );
};

export default BulkUpdateModal;
