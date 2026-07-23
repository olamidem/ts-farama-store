import { Delete } from "lucide-react";

interface NumberPadProps {
  onDigit: (digit: string) => void;
  onDelete: () => void;
  onClear: () => void;
}

const NumberPad = ({
  onDigit,
  onDelete,
  onClear,
}: NumberPadProps) => {
  return (
    <div className="grid grid-cols-3 gap-5">

      {["1","2","3","4","5","6","7","8","9"].map((digit) => (
        <button
          key={digit}
          onClick={() => onDigit(digit)}
          className="h-16 w-16 rounded-full bg-slate-800 hover:bg-slate-700"
        >
          {digit}
        </button>
      ))}

      <button
        onClick={onClear}
        className="text-sm text-slate-400"
      >
        Clear
      </button>

      <button
        onClick={() => onDigit("0")}
        className="h-16 w-16 rounded-full bg-slate-800 hover:bg-slate-700"
      >
        0
      </button>

      <button
        onClick={onDelete}
        className="text-slate-400"
      >
        <Delete size={18} />
      </button>

    </div>
  );
};

export default NumberPad;