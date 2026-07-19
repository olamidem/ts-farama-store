import { Calendar, FileText } from "lucide-react";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import Label from "../../../../components/ui/Label";

interface PurchaseSummaryProps {
  purchaseDate: string;
  setPurchaseDate: (value: string) => void;

  expectedDeliveryDate: string;
  setExpectedDeliveryDate: (value: string) => void;

  remarks: string;
  setRemarks: (value: string) => void;

  isSubmitting: boolean;
  onCancel: () => void;
}

const PurchaseSummary = ({
  purchaseDate,
  setPurchaseDate,
  expectedDeliveryDate,
  setExpectedDeliveryDate,
  remarks,
  setRemarks,
  isSubmitting,
  onCancel,
}: PurchaseSummaryProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-base font-bold text-slate-800">
        Logistics & Metadata
      </h3>

      <div className="space-y-5">
        <div>
          <Label className="flex items-center gap-2">
            <Calendar size={14} />
            Purchase Date
          </Label>

          <Input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </div>

        <div>
          <Label className="flex items-center gap-2">
            <Calendar size={14} />
            Expected Delivery Date
          </Label>

          <Input
            type="date"
            value={expectedDeliveryDate}
            onChange={(e) =>
              setExpectedDeliveryDate(e.target.value)
            }
          />
        </div>

        <div>
          <Label className="flex items-center gap-2">
            <FileText size={14} />
            Remarks
          </Label>

          <textarea
            rows={4}
            value={remarks}
            onChange={(e) =>
              setRemarks(e.target.value)
            }
            placeholder="Additional notes..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="space-y-3 pt-4">
          <Button
            type="submit"
            fullWidth
            loading={isSubmitting}
          >
            Create Purchase Order
          </Button>

          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSummary;