import { useState } from "react";
import { ArrowUp, Plus } from "lucide-react";

const ChatInput = ({ onSend, disabled }) => {
  const [value, setValue] = useState("");

  function submit(e) {
    e?.preventDefault();

    if (!value.trim() || disabled) return;

    onSend(value.trim());
    setValue("");
  }

  function onKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="px-3 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 sm:px-6 sm:pb-6">
      <form
        onSubmit={submit}
        className="mx-auto max-w-3xl glass rounded-3xl px-2 py-2 shadow-[var(--shadow-glass)] focus-within:ring-2 focus-within:ring-primary/40 transition-all"
      >
        <div className="flex items-end gap-2">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
            aria-label="Lampirkan"
          >
            <Plus className="h-5 w-5" />
          </button>

          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            rows={1}
            placeholder="Tanyakan sesuatu tentang kampus..."
            className="flex-1 resize-none bg-transparent px-1 py-2.5 text-sm outline-none placeholder:text-gray-400 max-h-40"
            style={{ minHeight: 40 }}
          />

          <button
            type="submit"
            disabled={!value.trim() || disabled}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-[var(--shadow-soft)] disabled:opacity-40 disabled:cursor-not-allowed transition-transform hover:scale-105 disabled:hover:scale-100"
            aria-label="Kirim"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </form>

      <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-gray-400">
        AI dapat membuat kesalahan. Verifikasi informasi penting melalui layanan
        resmi kampus, terimakasih.
      </p>
    </div>
  );
};

export default ChatInput;
