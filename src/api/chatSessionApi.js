import axiosClient, { getAuthHeaders } from "./axiosClient";

export const createChatSession = async (title = "New Chat") => {
  try {
    const response = await axiosClient.post(
      "/api/chat-sessions",
      {
        title,
      },
      {
        headers: {
          ...getAuthHeaders(),
        },
      },
    );

    const data = response.data;

    if (data?.data?.id) {
      localStorage.setItem("active_session_id", data.data.id);
    }

    return data;
  } catch (error) {
    console.error("CREATE SESSION ERROR:", error);

    return {
      success: false,
      message:
        error?.response?.data?.detail || "Gagal membuat session chat baru.",
    };
  }
};

export const getChatSessions = async () => {
  try {
    const response = await axiosClient.get("/api/chat-sessions", {
      headers: {
        ...getAuthHeaders(),
      },
    });

    return response.data;
  } catch (error) {
    console.error("GET SESSIONS ERROR:", error);

    return {
      success: false,
      data: [],
      message: error?.response?.data?.detail || "Gagal mengambil riwayat chat.",
    };
  }
};

export const getChatSessionDetail = async (sessionId) => {
  try {
    const response = await axiosClient.get(`/api/chat-sessions/${sessionId}`, {
      headers: {
        ...getAuthHeaders(),
      },
    });

    return response.data;
  } catch (error) {
    console.error("GET SESSION DETAIL ERROR:", error);

    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.detail || "Gagal mengambil isi chat session.",
    };
  }
};

export const deleteChatSession = async (sessionId) => {
  try {
    const response = await axiosClient.delete(
      `/api/chat-sessions/${sessionId}`,
      {
        headers: {
          ...getAuthHeaders(),
        },
      },
    );

    const activeSessionId = localStorage.getItem("active_session_id");

    if (String(activeSessionId) === String(sessionId)) {
      localStorage.removeItem("active_session_id");
    }

    return response.data;
  } catch (error) {
    console.error("DELETE SESSION ERROR:", error);

    return {
      success: false,
      message: error?.response?.data?.detail || "Gagal menghapus session chat.",
    };
  }
};
