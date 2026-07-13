import {
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from "lucide-react";

import { useState } from "react";

const ReasoningPanel = ({ reasoning }) => {
  const [open, setOpen] = useState(false);

  if (!reasoning) return null;

  const planner = reasoning.planner || {};
  const retriever = reasoning.retriever || {};
  const evidence = reasoning.evidence || {};

  return (
    <div className="mb-2 overflow-hidden rounded-2xl border border-violet-200 bg-violet-50">
      {/* HEADER */}

      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-4 py-3 transition hover:bg-violet-100"
      >
        <div className="rounded-full bg-violet-100 p-2">
          <BrainCircuit className="text-violet-600" size={18} />
        </div>

        <div className="flex-1 text-left">
          <p className="font-semibold text-gray-800">AI Process</p>

          <p className="text-xs text-gray-500">
            Planner • Retriever • Evidence
          </p>
        </div>

        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* SUMMARY */}

      <div className="border-t border-violet-100 bg-white px-4 py-3">
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-green-500" size={16} />
            Planner
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-green-500" size={16} />
            Retriever
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-green-500" size={16} />
            LLM
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t bg-white p-4 space-y-5 text-sm">
          <section>
            <h4 className="mb-2 font-semibold text-violet-700">Planner</h4>

            <div className="grid grid-cols-2 gap-2">
              <Info label="Intent" value={planner.intent} />

              <Info label="Knowledge" value={planner.knowledge_source} />

              <Info label="Reason" value={planner.reason} />
            </div>
          </section>

          <section>
            <h4 className="mb-2 font-semibold text-violet-700">Retriever</h4>

            <div className="grid grid-cols-2 gap-2">
              <Info label="Source" value={retriever.knowledge_source} />

              <Info label="Documents" value={retriever.retrieved_documents} />
            </div>
          </section>

          <section>
            <h4 className="mb-2 font-semibold text-violet-700">Evidence</h4>

            <div className="space-y-2">
              {evidence.documents?.map((doc) => (
                <div
                  key={doc.document_id}
                  className="rounded-lg border bg-gray-50 p-3"
                >
                  <p className="font-medium">{doc.title}</p>

                  <p className="text-xs text-gray-500">
                    {doc.source_collection}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

function Info({ label, value }) {
  return (
    <div className="rounded-lg bg-gray-50 p-2">
      <div className="text-xs text-gray-500">{label}</div>

      <div className="font-medium">{value || "-"}</div>
    </div>
  );
}

export default ReasoningPanel;
