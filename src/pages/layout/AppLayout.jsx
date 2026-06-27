import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { ChatHeader } from "../../components/chat/ChatHeader";
import ChatBox from "../../components/ChatBot";
import ModalLogin from "../../components/ui/ModalLogin";
import FullScreenLoading from "../../components/ui/FullScreenLoading";

import {
  getCurrentRole,
  getCurrentUser,
  logout,
  isLoggedIn,
} from "../../api/authApi";

import { getChatSessions, deleteChatSession } from "../../api/chatSessionApi";
import DeleteChatModal from "../../components/ui/DeleteChatModal";

const AppLayout = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [currentRole, setCurrentRole] = useState(getCurrentRole());

  const [authLoading, setAuthLoading] = useState(false);

  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);

  const [selectedSessionId, setSelectedSessionId] = useState(() => {
    const id = localStorage.getItem("active_session_id");
    return id ? Number(id) : null;
  });
  const [chatResetKey, setChatResetKey] = useState(0);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDeleteSession, setSelectedDeleteSession] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    if (isLoggedIn()) {
      loadSessions();
    }
  }, []);

  async function loadSessions() {
    if (!isLoggedIn()) {
      setSessions([]);
      return;
    }

    setSessionsLoading(true);

    try {
      const result = await getChatSessions();

      if (result?.success) {
        setSessions(result.data || []);
      } else {
        setSessions([]);
      }
    } catch (error) {
      console.error("LOAD SESSIONS ERROR:", error);
      setSessions([]);
    } finally {
      setSessionsLoading(false);
    }
  }

  async function handleLoginSuccess(result) {
    setShowLogin(false);
    setAuthLoading(true);

    try {
      const user = result?.user || getCurrentUser();
      const role = result?.role || getCurrentRole();

      setCurrentUser(user);
      setCurrentRole(role);

      setSelectedSessionId(null);
      localStorage.removeItem("active_session_id");
      setChatResetKey((prev) => prev + 1);

      await loadSessions();
    } catch (error) {
      console.error("AFTER LOGIN ERROR:", error);
    } finally {
      setAuthLoading(false);
    }
  }

  function handleLogout() {
    logout();

    setCurrentUser(null);
    setCurrentRole(null);

    setSessions([]);
    setSessionsLoading(false);

    setSelectedSessionId(null);
    localStorage.removeItem("active_session_id");

    setChatResetKey((prev) => prev + 1);
    setMobileSidebarOpen(false);
  }

  function handleNewChat() {
    setSelectedSessionId(null);
    localStorage.removeItem("active_session_id");
    setChatResetKey((prev) => prev + 1);
    setMobileSidebarOpen(false);
  }

  function handleSelectSession(sessionId) {
    localStorage.setItem("active_session_id", sessionId);
    setSelectedSessionId(sessionId);
    setMobileSidebarOpen(false);
  }

  function handleDeleteSession(session) {
    setSelectedDeleteSession(session);
    setDeleteError("");
    setDeleteModalOpen(true);
  }
async function handleConfirmDeleteSession() {
  if (!selectedDeleteSession) return;

  setDeleteLoading(true);
  setDeleteError("");

  try {
    const result = await deleteChatSession(selectedDeleteSession.id);

    if (!result?.success) {
      setDeleteError(result?.message || "Gagal menghapus session chat.");
      return;
    }

    setSessions((prev) =>
      prev.filter((item) => item.id !== selectedDeleteSession.id),
    );

    if (String(selectedSessionId) === String(selectedDeleteSession.id)) {
      setSelectedSessionId(null);
      localStorage.removeItem("active_session_id");
      setChatResetKey((prev) => prev + 1);
    }

    setDeleteModalOpen(false);
    setSelectedDeleteSession(null);
  } catch (error) {
    console.error("CONFIRM DELETE ERROR:", error);
    setDeleteError("Terjadi kesalahan saat menghapus chat.");
  } finally {
    setDeleteLoading(false);
  }
}

const sidebarProps = {
  profile: currentUser,
  role: currentRole,
  authLoading,
  sessions,
  sessionsLoading,
  activeId: selectedSessionId,
  onLoginClick: () => {
    setMobileSidebarOpen(false);
    setShowLogin(true);
  },
  onLogout: handleLogout,
  onNewChat: handleNewChat,
  onSelectSession: handleSelectSession,
  onDeleteSession: handleDeleteSession,
  onItemClick: () => setMobileSidebarOpen(false),
};

  return (
    <div className="flex h-[100dvh] w-full  overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden w-72 shrink-0 lg:flex xl:w-80">
        <SideBar {...sidebarProps} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-[99999] ">
          <div
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[82vw] max-w-[330px] animate-[slideInLeft_0.22s_ease-out] shadow-2xl">
            <SideBar {...sidebarProps} />
          </div>
        </div>
      )}

      <main className="flex min-w-0 flex-1 flex-col">
        <ChatHeader
          onMenu={() => setMobileSidebarOpen(true)}
          onLoginClick={() => setShowLogin(true)}
          profile={currentUser}
        />

        <ChatBox
          key={chatResetKey}
          selectedSessionId={selectedSessionId}
          onSessionChange={(sessionId) => {
            setSelectedSessionId(sessionId);
            localStorage.setItem("active_session_id", sessionId);
          }}
          onRefreshSessions={loadSessions}
        />
      </main>

      {showLogin && (
        <ModalLogin
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {authLoading && (
        <FullScreenLoading text="Login berhasil, memuat data akun..." />
      )}

      {deleteModalOpen && (
        <DeleteChatModal
          session={selectedDeleteSession}
          loading={deleteLoading}
          error={deleteError}
          onClose={() => {
            if (deleteLoading) return;

            setDeleteModalOpen(false);
            setSelectedDeleteSession(null);
            setDeleteError("");
          }}
          onConfirm={handleConfirmDeleteSession}
        />
      )}
    </div>
  );
};

export default AppLayout;


