import { Trash2 } from "lucide-react";

export default function DeleteChatModal({
  session,
  loading,
  error,
  onClose,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="absolute inset-0 " onClick={onClose} />

      <div className="relative w-full max-w-sm rounded-3xl border  border-white/10 bg-white p-6 text-black shadow-2xl">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/20 text-red-500">
          <Trash2 className="h-6 w-6" />
        </div>

        <h2 className="mt-4 text-center text-lg font-bold">
          Hapus Riwayat Chat?
        </h2>

        <p className="mt-2 text-center text-sm text-gray-900">
          Chat{" "}
          <span className="font-semibold text-red-500">
            “{session?.title || "New Chat"}”
          </span>{" "}
          akan dihapus permanen dari riwayat.
        </p>

        {error && (
          <div className="mt-4 rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border  border-white/10 bg-gray-200 px-4 py-3 text-sm font-semibold text-black transition hover:bg-gray-300 disabled:opacity-50 hover:cursor-pointer"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-50 hover:cursor-pointer"
          >
            {loading ? "Menghapus..." : "Ya, Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}
