import Select from "../../../components/ui/Select";
import type { DuplicateStrategy } from "../types/import";

interface DuplicateHandlingProps {
  duplicateCount: number;
  strategy: DuplicateStrategy;
  onChange: (strategy: DuplicateStrategy) => void;
}

const DuplicateHandling = ({
  duplicateCount,
  strategy,
  onChange,
}: DuplicateHandlingProps) => {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
      <div className="mb-4">
        <h3 className="font-semibold text-amber-900">
          Duplicate Products Found
        </h3>

        <p className="mt-1 text-sm text-amber-700">
          {duplicateCount} existing product
          {duplicateCount === 1 ? "" : "s"} detected.
        </p>
      </div>

      <div className="grid gap-2 md:grid-cols-[180px_1fr] md:items-center">
        <label className="text-sm font-medium text-slate-700">
          Duplicate Handling
        </label>

        <Select
          placeholder=""
          value={strategy}
          onChange={(e) => onChange(e.target.value as DuplicateStrategy)}
          options={[
            {
              label: "Skip Existing",
              value: "skip",
            },
            {
              label: "Update Existing",
              value: "update",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default DuplicateHandling;
