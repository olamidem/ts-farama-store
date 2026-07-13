import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import Button from "../../../components/ui/Button";

interface ImportDropzoneProps {
  onFileSelected: (file: File) => void;
}

export const ImportDropzone = ({ onFileSelected }: ImportDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      onFileSelected(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onFileSelected(selectedFile);
    }
  };

  const triggerSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={triggerSelect}
      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
        isDragging
          ? "border-blue-500 bg-blue-50/40"
          : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/50"
      }`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        className="hidden"
      />
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="p-4 bg-slate-100 rounded-full text-slate-500 shadow-inner">
          <Upload size={32} />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">
            Drag and drop your spreadsheet here
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Supports Microsoft Excel (.xlsx) or CSV files
          </p>
        </div>
        <Button variant="secondary" size="sm" type="button" className="mt-2">
          Browse Files
        </Button>
      </div>
    </div>
  );
};

export default ImportDropzone;
