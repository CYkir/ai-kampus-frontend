import { useEffect, useRef, useState } from "react";
import { ChevronUp, LogIn, LogOut, Plus, Settings, User } from "lucide-react";

import { ExternalLinkButton } from "../../components/chat/ExternalLinkButton";
import ButtonLogin from "../../components/ui/ButtonLogin";
import ProfileModal from "../../components/profile/ProfileModal";

import {
  getCurrentRole,
  getCurrentUser,
  isLoggedIn,
  logout,
} from "../../api/authApi";

const SideBar = ({
  onLoginClick,
  onNewChat,
  sessions = [],
  activeId = null,
  onSelectSession,
  onDeleteSession,
  onItemClick,
}) => {
  const menuRef = useRef(null);

  const [userMenu, setUserMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profile, setProfile] = useState(getCurrentUser());
  const [role, setRole] = useState(getCurrentRole());

  const loggedIn = isLoggedIn() && profile;

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function refreshProfile() {
    setProfile(getCurrentUser());
    setRole(getCurrentRole());
  }

  function handleLogout() {
    logout();
    setProfile(null);
    setRole(null);
    setUserMenu(false);
    setProfileOpen(false);
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
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-gold-foreground transition-transform hover:scale-[1.02]"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </button>
        </div>

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

          {loggedIn && sessions.length === 0 && (
            <div className="px-3 py-6 text-center text-xs text-sidebar-foreground/60">
              Belum ada riwayat chat.
            </div>
          )}

          {loggedIn &&
            sessions.map((session) => (
              <div
                key={session.id}
                className={`group flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                  session.id === activeId
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
                  className="min-w-0 flex-1 truncate text-left"
                >
                  {session.title || "New Chat"}
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteSession?.(session.id)}
                  className="hidden rounded-lg px-2 py-1 text-xs text-red-400 hover:bg-red-500/10 group-hover:block"
                >
                  Hapus
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

          {!loggedIn ? (
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
