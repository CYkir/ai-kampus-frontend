import TimelineStep from "./TimelineStep";

const ReasoningTimeline = ({ reasoning }) => {
  if (!reasoning) return null;

  const planner = reasoning.planner;
  const retriever = reasoning.retriever;

  return (
    <div className="space-y-5">
      <TimelineStep
        title="Memahami Pertanyaan"
        description={`Intent : ${planner.intent}`}
      />

      <TimelineStep
        title="Memilih Knowledge Source"
        description={planner.knowledge_source}
      />

      <TimelineStep
        title="Menentukan Strategi Retrieval"
        description={planner.reason}
      />

      <TimelineStep
        title="Mengambil Dokumen"
        description={`${retriever.retrieved_documents} dokumen ditemukan`}
      />

      <TimelineStep
        title="Menyusun Jawaban"
        description="Jawaban dibuat berdasarkan evidence."
      />
    </div>
  );
};

export default ReasoningTimeline;
