import { useEffect, useState } from "react";
import { Copy, Check, Bot } from "lucide-react";

import Linkify from "linkify-react";

function formatTime(date) {
  if (!date) return "";

  return new Date(date).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

const ChatBubble = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  const isUser = message.role === "user";
  const shouldAnimate = !isUser && message.animate !== false;

  useEffect(() => {
    if (!shouldAnimate) return;

    const words = message.text.split(" ");
    let index = 0;

    const interval = setInterval(() => {
      index += 1;

      setDisplayedText(words.slice(0, index).join(" "));

      if (index >= words.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [message.id, message.text, shouldAnimate]);

  async function copyMessage() {
    await navigator.clipboard.writeText(message.text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] sm:max-w-[75%]">
          <div className="rounded-3xl rounded-tr-md bg-[#4b006e] px-4 py-3 text-white shadow-[var(--shadow-soft)]">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              <Linkify
                options={{
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "underline italic underline-offset-2",
                }}
              >
                {message.text}
              </Linkify>
            </p>
          </div>

          <div className="mt-1 text-right text-[10px] text-gray-400">
            {formatTime(message.time)}
          </div>
        </div>
      </div>
    );
  }

  const botText = shouldAnimate ? displayedText : message.text;

  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl brand-gradient text-white shadow-[var(--shadow-soft)]">
        <Bot className="h-4 w-4" />
      </div>

      <div className="max-w-[85%] sm:max-w-[75%]">
        <div className="glass rounded-3xl rounded-tl-md px-4 py-3 shadow-[var(--shadow-soft)]">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
            <Linkify
              options={{
                target: "_blank",
                rel: "noopener noreferrer",
                className:
                  "text-[#4b006e] underline italic underline-offset-2 hover:text-[#5C0D80]",
              }}
            >
              {botText}
            </Linkify>

            {shouldAnimate && botText.length < message.text.length && (
              <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-gray-500" />
            )}
          </p>
        </div>

        <div className="mt-1 flex items-center gap-2 text-[10px] text-gray-400">
          <span>{formatTime(message.time)}</span>

          <button
            onClick={copyMessage}
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 transition-colors hover:bg-gray-100"
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}

            {copied ? "Tersalin" : "Salin"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
