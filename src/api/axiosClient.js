import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://ai.cykir.web.id",
  // baseURL: "http://localhost:8000",
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getToken = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;
  if (token === "null") return null;
  if (token === "undefined") return null;
  if (token.trim() === "") return null;

  return token;
};

export const getAuthHeaders = () => {
  const token = getToken();

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

export default axiosClient;
