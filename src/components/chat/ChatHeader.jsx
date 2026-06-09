import { Menu, LogIn } from "lucide-react";
import ButtonLogin from "../ui/ButtonLogin";

export function ChatHeader({ onMenu, onLoginClick, profile }) {
  return (
    <header className="flex items-center gap-3 border-b border-border/60 bg-background/60 px-4 py-3 backdrop-blur-md sm:px-6">
      <button
        type="button"
        onClick={onMenu}
        onClick={() => {
          console.log("HAMBURGER DIKLIK");
          onMenu?.();
        }}
        className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-accent lg:hidden"
        aria-label="Buka menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex w-full items-center justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-sm font-bold text-foreground sm:text-base">
              AI Kampus Assistant
            </h1>

            <span className="hidden items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 ring-1 ring-emerald-500/20 sm:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Online
            </span>
          </div>

          <p className="truncate text-xs text-muted-foreground">
            Asisten digital Universitas Prima Indonesia
          </p>
        </div>

        <div className="block sm:hidden">
          {profile ? (
            <button
              type="button"
              onClick={onMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
            >
              {(profile.nama || profile.name || "U").charAt(0).toUpperCase()}
            </button>
          ) : (
            <ButtonLogin
              type="button"
              onClick={onLoginClick}
              textColor="text-white"
              border="none"
              hoverBg="bg-amber-400"
              text=""
            >
              <LogIn className="h-4 w-4" />
            </ButtonLogin>
          )}
        </div>
      </div>
    </header>
  );
}
