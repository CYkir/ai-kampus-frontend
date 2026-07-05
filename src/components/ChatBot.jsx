import { useState, useEffect, useRef } from "react";

import { isLoggedIn } from "../api/authApi";
import { sendPublicMessage } from "../api/publicChatApi";
import { sendAuthMessage } from "../api/chatApi";
import { getChatSessionDetail } from "../api/chatSessionApi";

import WelcomeChatState from "./chat/WelcomeChatState";
import ChatBubble from "./chat/ChatBubble";
import ChatInput from "./chat/ChatInput";
import TypingIndicator from "./chat/TypingIndicator";

const ChatBox = ({ selectedSessionId, onSessionChange, onRefreshSessions }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, loading]);

  useEffect(() => {
    if (!selectedSessionId) {
      setMessages([]);
      setLoading(false);
      setSessionLoading(false);
      return;
    }

    handleOpenSession(selectedSessionId);
  }, [selectedSessionId]);

  const handleOpenSession = async (sessionId) => {
    setSessionLoading(true);

    try {
      const result = await getChatSessionDetail(sessionId);

      if (!result.success) {
        console.log(result.message);
        setMessages([]);
        return;
      }

      const formattedMessages = result.data.messages.map((msg) => ({
        id: msg.id,
        role: msg.role === "assistant" ? "bot" : "user",
        text: msg.message,
        time: msg.created_at,
        animate: false,
      }));

      localStorage.setItem("active_session_id", sessionId);
      setMessages(formattedMessages);
    } catch (error) {
      console.error("OPEN SESSION ERROR:", error);
      setMessages([]);
    } finally {
      setSessionLoading(false);
    }
  };

  const handleSend = async (text) => {
    if (!text.trim() || loading || sessionLoading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text,
      time: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      let res;

      if (isLoggedIn()) {
        const activeSessionId = localStorage.getItem("active_session_id");

        res = await sendAuthMessage(
          text,
          activeSessionId ? Number(activeSessionId) : null,
        );

        if (res?.session_id) {
          localStorage.setItem("active_session_id", res.session_id);

          onSessionChange?.(res.session_id);
          onRefreshSessions?.();
        }

        if (res?.authExpired) {
          res = await sendPublicMessage(text);
        }
      } else {
        res = await sendPublicMessage(text);
      }

      const botMessage = {
        id: Date.now() + 1,
        role: "bot",
        text: res?.data || "Tidak ada respon dari AI",
        thinking: res?.thinking || "",
        time: Date.now(),
        animate: true,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        id: Date.now() + 1,
        role: "bot",
        text: `Terjadi error saat mengambil respon AI. Mohon coba kembali.\n\nError: ${err}`,
        time: Date.now(),
        animate: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-[calc(100vh-40px)] w-full flex-col overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(255,214,0,0.16),transparent_25%),radial-gradient(circle_at_center,rgba(126,34,206,0.10),transparent_38%),linear-gradient(180deg,#fbf7ff_0%,#f7f0ff_100%)]">
      <div ref={chatRef} className="flex-1 overflow-y-auto">
        {sessionLoading ? (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
            <p className="text-sm text-gray-500">Memuat isi chat...</p>
          </div>
        ) : messages.length === 0 ? (
          <WelcomeChatState onPick={handleSend} />
        ) : (
          <div className="mx-auto max-w-3xl space-y-5 px-4 py-6 sm:px-6">
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}

            {loading && <TypingIndicator />}
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} disabled={loading || sessionLoading} />
    </div>
  );
};

export default ChatBox;
