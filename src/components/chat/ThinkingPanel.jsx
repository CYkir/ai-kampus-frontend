import { BrainCircuit, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const ThinkingPanel = ({ thinking }) => {
  const [open, setOpen] = useState(false);

  if (!thinking) return null;

  return (
    <div className="mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border bg-gray-50 px-3 py-2 text-sm hover:bg-gray-100"
      >
        <BrainCircuit size={16} />
        AI sedang berpikir
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {open && (
        <div className="mt-2 rounded-xl border bg-white p-4">
          <pre className="whitespace-pre-wrap text-sm text-gray-700">
            {thinking}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ThinkingPanel;
