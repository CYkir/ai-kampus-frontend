import { BrainCircuit } from "lucide-react";

import { useState } from "react";

import ReasoningTimeline from "./ReasoningTimeline";
import SourceCard from "./SourceCard";
import DeveloperThinking from "./DeveloperThinking";

const ReasoningCard = ({ reasoning }) => {
  const [open, setOpen] = useState(false);

  if (!reasoning) return null;

  return (
    <div className="mb-3 overflow-hidden rounded-2xl border border-violet-200 bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 bg-violet-50 px-4 py-3 hover:bg-violet-100"
      >
        <BrainCircuit className="text-violet-600" size={20} />

        <div className="flex-1 text-left">
          <h3 className="font-semibold">AI Process</h3>

          <p className="text-xs text-gray-500">
            Lihat bagaimana AI menyusun jawaban
          </p>
        </div>
      </button>

      {open && (
        <div className="space-y-6 p-5">
          <ReasoningTimeline reasoning={reasoning} />

          <SourceCard evidence={reasoning.evidence} />

          <DeveloperThinking thinking={reasoning.llm?.thinking} />
        </div>
      )}
    </div>
  );
};

export default ReasoningCard;
