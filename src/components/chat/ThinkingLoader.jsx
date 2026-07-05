import { BrainCircuit } from "lucide-react";

const ThinkingLoader = () => {
  return (
    <div className="flex items-center gap-3 py-1">
      {/* Icon */}
      <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-violet-100">
        <BrainCircuit size={16} className="text-violet-600 animate-pulse" />

        <span className="absolute inset-0 rounded-full border-2 border-violet-300 animate-ping opacity-40" />
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-700">
          AI sedang berpikir...
        </span>

        <div className="mt-1 flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500 [animation-delay:0ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500 [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
};

export default ThinkingLoader;
