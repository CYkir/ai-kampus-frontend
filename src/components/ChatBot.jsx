import { useState, useEffect, useRef } from "react";

import { isLoggedIn } from "../api/authApi";
import { sendPublicMessage } from "../api/publicChatApi";
import { sendAuthMessage } from "../api/chatApi";
import { getChatSessionDetail } from "../api/chatSessionApi";

import WelcomeChatState from "./chat/WelcomeChatState";
import ChatBubble from "./chat/ChatBubble";
import ChatInput from "./chat/ChatInput";
import TypingIndicator from "./chat/TypingIndicator";

const ChatBox = ({ selectedSessionId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, loading]);

  useEffect(() => {
    if (!selectedSessionId) return;

    handleOpenSession(selectedSessionId);
  }, [selectedSessionId]);

  const handleOpenSession = async (sessionId) => {
    const result = await getChatSessionDetail(sessionId);

    if (!result.success) {
      console.log(result.message);
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
  };

  const handleSend = async (text) => {
    if (!text.trim() || loading) return;

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
    <div className="flex h-[calc(100vh-40px)] w-full flex-col overflow-hidden rounded-3xl bg-white/70 shadow-xl ring-1 ring-black/5 backdrop-blur-xl">
      <div ref={chatRef} className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
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

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
};

export default ChatBox;
