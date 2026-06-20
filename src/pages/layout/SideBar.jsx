import { useEffect, useRef, useState } from "react";
import {
  ChevronUp,
  LogIn,
  LogOut,
  Plus,
  Settings,
  User,
  MoreVertical,
  Trash2,
  MessageSquare,
} from "lucide-react";

import { ExternalLinkButton } from "../../components/chat/ExternalLinkButton";
import ButtonLogin from "../../components/ui/ButtonLogin";
import ProfileModal from "../../components/profile/ProfileModal";
import CircularLoading from "../../components/ui/CircularLoading";

const SideBar = ({
  profile = null,
  role = null,
  authLoading = false,
  onLoginClick,
  onLogout,
  onNewChat,
  sessions = [],
  sessionsLoading = false,
  activeId = null,
  onSelectSession,
  onDeleteSession,
  onItemClick,
}) => {
  const menuRef = useRef(null);
  const sessionMenuRef = useRef(null);

  const [userMenu, setUserMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const loggedIn = Boolean(profile);
  const [sessionMenuId, setSessionMenuId] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenu(false);
      }

      if (
        sessionMenuRef.current &&
        !sessionMenuRef.current.contains(event.target)
      ) {
        setSessionMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleLogout() {
    setUserMenu(false);
    setProfileOpen(false);
    onLogout?.();
  }

  function getDisplayName() {
    if (!profile) return "User";

    return profile.nama || profile.name || profile.full_name || "User";
  }

  function getDisplayRole() {
    if (role === "student") return "Mahasiswa";
    if (role === "lecturer") return "Dosen";

    return role || "User";
  }

  function getInitial() {
    return getDisplayName().charAt(0).toUpperCase();
  }

  return (
    <>
      <aside className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
        {/* Top */}
        <div className="space-y-4 border-b border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="leading-tight">
              <div className="text-[11px] uppercase tracking-widest text-gold">
                UNPRI
              </div>
              <div className="text-sm font-semibold">AI Kampus Assistant</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-gold-foreground transition-transform hover:scale-[1.02] hover:cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </button>
        </div>

        {/* History */}
        {/* History */}
        <div className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
          <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50">
            Riwayat Chat
          </div>

          {!loggedIn && (
            <div className="px-3 py-6 text-center text-xs text-sidebar-foreground/60">
              Login untuk melihat riwayat chat.
            </div>
          )}

          {loggedIn && sessionsLoading && (
            <div className="h-40">
              <CircularLoading text="Mengambil riwayat chat..." />
            </div>
          )}

          {loggedIn && !sessionsLoading && sessions.length === 0 && (
            <div className="px-3 py-6 text-center text-xs text-sidebar-foreground/60 hover:cursor-pointer">
              Belum ada riwayat chat.
            </div>
          )}

          {loggedIn &&
            !sessionsLoading &&
            sessions.map((session) => (
              <div
                key={session.id}
                className={`group relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                  String(session.id) === String(activeId)
                    ? "bg-sidebar-accent text-sidebar-foreground"
                    : "hover:bg-sidebar-accent/70"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    onSelectSession?.(session.id);
                    onItemClick?.();
                  }}
                  className="flex min-w-0 flex-1 items-center gap-2 text-left"
                >
                  <MessageSquare className="h-4 w-4 shrink-0 text-sidebar-foreground/60" />

                  <span className="truncate">
                    {session.title || "New Chat"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession?.(session);
                  }}
                  className="rounded-lg p-1 text-sidebar-foreground/50 opacity-0 transition  hover:text-red-500 group-hover:opacity-100 hover:cursor-pointer"
                  title="Hapus chat"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
        </div>

        {/* Bottom */}
        <div className="space-y-2 border-t border-sidebar-border p-3">
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

          {authLoading ? (
            <div className="flex w-full items-center justify-center gap-3 rounded-xl border border-gold/30 bg-gold/10 px-3 py-3 text-sm font-semibold text-gold">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
              Memuat akun...
            </div>
          ) : !loggedIn ? (
            <ButtonLogin
              bgColor="bg-gold-30"
              type="button"
              onClick={onLoginClick}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold/50 bg-gold/10 px-3 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold/20"
            >
              <LogIn className="h-4 w-4" />
              Login
            </ButtonLogin>
          ) : (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setUserMenu((value) => !value)}
                className="flex w-full items-center gap-3 rounded-xl bg-sidebar-accent/70 px-3 py-2.5 text-left transition-colors hover:bg-sidebar-accent"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white ring-2 ring-gold/40">
                  {getInitial()}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">
                    {getDisplayName()}
                  </div>
                  <div className="text-[11px] capitalize text-sidebar-foreground/60">
                    {getDisplayRole()}
                  </div>
                </div>

                <ChevronUp
                  className={`h-4 w-4 transition-transform ${
                    userMenu ? "" : "rotate-180"
                  }`}
                />
              </button>

              {userMenu && (
                <div className="absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenu(false);
                      setProfileOpen(true);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-sm hover:bg-accent"
                  >
                    <User className="h-4 w-4" />
                    Profil Saya
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setUserMenu(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-sm hover:bg-accent"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-red-500 hover:bg-red-500/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>

      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        profile={profile}
        role={role}
        onLogout={handleLogout}
      />
    </>
  );
};

export default SideBar;
