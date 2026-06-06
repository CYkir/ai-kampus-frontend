import { Menu, LogIn } from "lucide-react";
// import { useChat } from "@/lib/chat-store";
// import { LogoPlaceholder } from "./LogoPlaceholder";

export function ChatHeader({ 
  onMenu
  // onLogin, 
  // onProfile 
}) {
  // const { profile } = useChat();

  return (
    <header className="flex items-center gap-3 border-b border-border/60 bg-background/60 backdrop-blur-md px-4 py-3 sm:px-6">
      <button
        onClick={onMenu}
        className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl hover:bg-accent transition-colors"
        aria-label="Buka menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="lg:hidden">
        {/* <LogoPlaceholder size={36} /> */}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="truncate text-sm sm:text-base font-bold text-foreground">
            AI Kampus Assistant
          </h1>

          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 ring-1 ring-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Online
          </span>
        </div>

        <p className="hidden sm:block text-xs text-muted-foreground truncate">
          Asisten digital Universitas Prima Indonesia
        </p>
      </div>

      {/* {profile ? (
        <button
          // onClick={onProfile}
          className="flex h-10 w-10 items-center justify-center rounded-full brand-gradient text-white font-semibold text-sm ring-2 ring-gold/40 shadow-[var(--shadow-soft)]"
          aria-label="Profil"
        >
          {profile.nama.charAt(0)}
        </button>
      ) : (
        <button
          onClick={onLogin}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs sm:text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <LogIn className="h-4 w-4" />
          Login
        </button>
      )} */}
    </header>
  );
}
