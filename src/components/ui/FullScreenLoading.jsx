export default function FullScreenLoading({ text = "Memuat data akun..." }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      style={{ zIndex: 9999999 }}
    >
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/40 bg-white/80 px-8 py-7 shadow-2xl backdrop-blur-xl">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        <p className="text-sm font-semibold text-[#151127]">{text}</p>
      </div>
    </div>
  );
}
