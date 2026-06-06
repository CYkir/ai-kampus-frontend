import axiosClient from "./axiosClient";

export const sendPublicMessage = async (message) => {
  try {
    const response = await axiosClient.post("/api/chat", {
      query: message,
      session_id: null,
    });

    return response.data;
  } catch (error) {
    console.error("PUBLIC CHAT ERROR:", error);

    return {
      success: false,
      data:
        error?.response?.data?.detail || "Terjadi error dari server AI Kampus.",
      session_id: null,
    };
  }
};
