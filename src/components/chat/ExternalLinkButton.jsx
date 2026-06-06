import { ExternalLink } from "lucide-react";

export function ExternalLinkButton({ label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between rounded-xl bg-sidebar-accent/60 px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
    >
      <span>{label}</span>
      <ExternalLink className="h-3.5 w-3.5 opacity-70" />
    </a>
  );
}
