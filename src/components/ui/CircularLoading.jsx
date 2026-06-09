export default function CircularLoading({ text = "Memuat data..." }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-white/20 border-t-gold" />
      <p className="text-xs text-sidebar-foreground/60">{text}</p>
    </div>
  );
}
