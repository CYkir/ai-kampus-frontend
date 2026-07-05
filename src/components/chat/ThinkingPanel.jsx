import { BrainCircuit, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const ThinkingPanel = ({ thinking }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("ThinkingPanel render:", thinking);
  }, [thinking]);

  if (!thinking) return null;

  return (
    <div className="mb-3 overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm">
      {/* HEADER */}

      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 bg-violet-50 px-4 py-3 transition hover:bg-violet-100"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100">
          <BrainCircuit size={20} className="text-violet-600" />
        </div>

        <div className="flex-1 text-left">
          <h3 className="font-semibold text-gray-800">AI sedang berpikir</h3>

          <p className="text-xs text-gray-500">
            Klik untuk melihat proses berpikir
          </p>
        </div>

        {open ? (
          <ChevronUp size={18} className="text-gray-500" />
        ) : (
          <ChevronDown size={18} className="text-gray-500" />
        )}
      </button>

      {/* BODY */}

      {open && (
        <div className="border-t bg-white p-4">
          <pre className="whitespace-pre-wrap font-mono text-[13px] leading-6 text-gray-700">
            {thinking}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ThinkingPanel;
