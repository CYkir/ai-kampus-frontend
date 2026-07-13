import { BrainCircuit, ChevronDown, ChevronUp } from "lucide-react";

import { useState } from "react";

const DeveloperThinking = ({ thinking }) => {
  const [open, setOpen] = useState(false);

  if (!thinking) return null;

  return (
    <div className="rounded-xl border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between bg-violet-50 px-4 py-3"
      >
        <div className="flex items-center gap-3">
          <BrainCircuit size={18} className="text-violet-600" />

          <span className="font-medium">Developer Thinking</span>
        </div>

        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {open && (
        <pre className="max-h-96 overflow-auto bg-white p-4 text-xs whitespace-pre-wrap">
          {thinking}
        </pre>
      )}
    </div>
  );
};

export default DeveloperThinking;
