import { Icon } from "@iconify/react";
import { LogIn, Plus } from "lucide-react";
import { ExternalLinkButton } from "../../components/chat/ExternalLinkButton";
import ButtonLogin from "../../components/ui/ButtonLogin";

const SideBar = () => {
  return (
    <>
      <aside className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
        {/* Top */}
        <div className="p-4 space-y-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            {/* <LogoPlaceholder size={44} /> */}
            <div className="leading-tight">
              <div className="text-[11px] uppercase tracking-widest text-gold">
                UNPRI
              </div>
              <div className="text-sm font-semibold">AI Kampus Assistant</div>
            </div>
          </div>
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gold px-4 py-3 text-sm font-semibold text-gold-foreground shadow-[0_8px_20px_-8px_oklch(0.88_0.18_95/0.7)] transition-transform hover:scale-[1.02]">
            {" "}
            <Plus className="h-4 w-4" /> New Chat
          </button>
        </div>

        {/* History */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50">
            Riwayat Chat
          </div>
          {/* {sessions.length === 0 && (
            <div className="px-3 py-6 text-center text-xs text-sidebar-foreground/60">
              Belum ada riwayat chat.
            </div>
          )}
          {sessions.map((s) => (
            <ChatHistoryItem
              key={s.id}
              session={s}
              active={s.id === activeId}
              onSelect={() => {
                selectSession(s.id);
                onItemClick?.();
              }}
              onRename={(t) => renameSession(s.id, t)}
              onRemove={() => removeSession(s.id)}
            />
          ))} */}
        </div>

        {/* Bottom */}
        <div className="border-t border-sidebar-border p-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <ExternalLinkButton
              label="SPADA"
              href="https://spada.unprimdn.ac.id"
            />
            <ExternalLinkButton
              label="SIAM"
              href="https://unprimdn.ac.id/login"
            />
          </div>

          {/* {!profile ? (
            <button
              onClick={onLoginClick}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold/50 bg-gold/10 px-3 py-2.5 text-sm font-semibold text-gold hover:bg-gold/20 transition-colors"
            >
              <LogIn className="h-4 w-4" /> Login
            </button>
          ) : (
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setUserMenu((v) => !v)}
                className="flex w-full items-center gap-3 rounded-xl bg-sidebar-accent/70 px-3 py-2.5 text-left hover:bg-sidebar-accent transition-colors"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full brand-gradient text-white text-sm font-bold ring-2 ring-gold/40">
                  {profile.nama.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate text-sm font-semibold">
                    {profile.nama}
                  </div>
                  <div className="text-[11px] capitalize text-sidebar-foreground/60">
                    {profile.role}
                  </div>
                </div>
                <ChevronUp
                  className={`h-4 w-4 transition-transform ${userMenu ? "" : "rotate-180"}`}
                />
              </button>
              {userMenu && (
                <div className="absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-xl">
                  <button
                    onClick={() => {
                      setUserMenu(false);
                      onProfileClick();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-sm hover:bg-accent"
                  >
                    <User className="h-4 w-4" /> Profil Saya
                  </button>
                  <button
                    onClick={() => {
                      setUserMenu(false);
                      onSettingsClick();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-sm hover:bg-accent"
                  >
                    <Settings className="h-4 w-4" /> Settings
                  </button>
                  <button
                    onClick={() => {
                      setUserMenu(false);
                      setProfile(null);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          )} */}

          <ButtonLogin
          text="Login"
          bgColor="none"

          />
        </div>
      </aside>
    </>
  );
};

export default SideBar;
