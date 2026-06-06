import axiosClient, { getAuthHeaders } from "./axiosClient";
import { logout } from "./authApi";

export const sendAuthMessage = async (message, sessionId = null) => {
  try {
    const response = await axiosClient.post(
      "/api/chat",
      {
        query: message,
        session_id: sessionId,
      },
      {
        headers: {
          ...getAuthHeaders(),
        },
      },
    );

    const data = response.data;

    if (data?.session_id) {
      localStorage.setItem("active_session_id", data.session_id);
    }

    return data;
  } catch (error) {
    console.error("AUTH CHAT ERROR:", error);

    if (error?.response?.status === 401) {
      logout();

      return {
        success: false,
        authExpired: true,
        data: "Sesi login Anda sudah habis. Silakan login ulang.",
        session_id: null,
      };
    }

    return {
      success: false,
      data:
        error?.response?.data?.detail || "Terjadi error dari server AI Kampus.",
      session_id: sessionId,
    };
  }
};
