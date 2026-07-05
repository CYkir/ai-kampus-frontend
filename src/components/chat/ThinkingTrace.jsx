import {
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  LoaderCircle,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

const ThinkingTrace = ({ thinking, finished }) => {
  const [collapsed, setCollapsed] = useState(false);

  const [seconds, setSeconds] = useState(0);

  const contentRef = useRef(null);

  /*
  ----------------------------
  Timer
  ----------------------------
  */

  useEffect(() => {
    if (finished) return;

    const timer = setInterval(() => {
      setSeconds((s) => s + 0.1);
    }, 100);

    return () => clearInterval(timer);
  }, [finished]);

  /*
  ----------------------------
  Auto Scroll
  ----------------------------
  */

  useEffect(() => {
    if (!contentRef.current) return;

    contentRef.current.scrollTop = contentRef.current.scrollHeight;
  }, [thinking]);

  /*
  ----------------------------
  Collapse setelah selesai
  ----------------------------
  */

  useEffect(() => {
    if (!finished) return;

    const timeout = setTimeout(() => {
      setCollapsed(true);
    }, 800);

    return () => clearTimeout(timeout);
  }, [finished]);

  /*
  ============================
  COLLAPSED
  ============================
  */

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="mb-3 flex w-full items-center gap-3 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 transition hover:bg-violet-100"
      >
        <BrainCircuit className="text-violet-600" size={18} />

        <div className="flex-1 text-left">
          <p className="text-sm font-medium">AI berpikir</p>

          <p className="text-xs text-gray-500">{seconds.toFixed(1)} detik</p>
        </div>

        <ChevronDown size={18} />
      </button>
    );
  }

  /*
  ============================
  EXPANDED
  ============================
  */

  return (
    <div className="mb-4 overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm transition-all duration-500">
      {/* HEADER */}

      <div className="flex items-center gap-3 border-b bg-violet-50 px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100">
          {!finished ? (
            <LoaderCircle className="animate-spin text-violet-600" size={20} />
          ) : (
            <BrainCircuit className="text-violet-600" size={20} />
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">
            {!finished ? "AI sedang berpikir..." : "AI selesai berpikir"}
          </h3>

          <p className="text-xs text-gray-500">
            {!finished
              ? "Menyusun jawaban terbaik"
              : `${seconds.toFixed(1)} detik`}
          </p>
        </div>

        {finished && (
          <button onClick={() => setCollapsed(true)}>
            <ChevronUp size={18} className="text-gray-500" />
          </button>
        )}
      </div>

      {/* BODY */}

      <div ref={contentRef} className="max-h-72 overflow-y-auto p-4">
        <pre className="whitespace-pre-wrap font-mono text-[13px] leading-6 text-gray-700">
          {thinking}
        </pre>

        {!finished && (
          <div className="mt-2 flex items-center gap-2">
            <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500" />

            <span
              className="h-2 w-2 animate-bounce rounded-full bg-violet-500"
              style={{ animationDelay: ".2s" }}
            />

            <span
              className="h-2 w-2 animate-bounce rounded-full bg-violet-500"
              style={{ animationDelay: ".4s" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ThinkingTrace;
