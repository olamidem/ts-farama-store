import { Plus } from "lucide-react";
import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/ui/PageHeader";

interface PurchaseHeaderProps {
  onNewClick: () => void;
}

export default function PurchaseHeader({ onNewClick }: PurchaseHeaderProps) {
  return (
    <PageHeader
      title="Purchase Orders"
      description="Manage supplier purchase orders and goods receiving."
    >
      <Button onClick={onNewClick}>
        <Plus size={16} />
        <span>New Purchase Order</span>
      </Button>
    </PageHeader>
  );
}
