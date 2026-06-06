import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex gap-3">
      <div className="h-9 w-9 shrink-0 rounded-2xl brand-gradient flex items-center justify-center text-white">
        <Bot className="h-4 w-4" />
      </div>

      <div className="glass rounded-3xl rounded-tl-md px-4 py-3.5 shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-primary/70 animate-bounce [animation-delay:-0.3s]" />
          <span className="h-2 w-2 rounded-full bg-primary/70 animate-bounce [animation-delay:-0.15s]" />
          <span className="h-2 w-2 rounded-full bg-primary/70 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
