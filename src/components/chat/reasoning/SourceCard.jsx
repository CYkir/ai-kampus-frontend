import { Globe, Database, FileText } from "lucide-react";

const SourceCard = ({ evidence }) => {
  if (!evidence) return null;

  return (
    <div className="space-y-3">
      {evidence.documents.map((doc) => (
        <div key={doc.document_id} className="rounded-xl border bg-white p-4">
          <div className="flex items-center gap-2">
            {doc.source_collection === "WEB" ? (
              <Globe size={18} className="text-violet-600" />
            ) : (
              <Database size={18} className="text-violet-600" />
            )}

            <span className="font-semibold">{doc.title}</span>
          </div>

          <div className="mt-2 text-xs text-gray-500">
            {doc.source_collection}
          </div>

          {doc.source_url && (
            <a
              href={doc.source_url.replace(/[\[\]]/g, "")}
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex items-center gap-2 text-xs text-violet-600 underline"
            >
              <FileText size={14} />
              Lihat sumber
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default SourceCard;
