import axiosClient from "./axiosClient";


export const loginStudent = async ({ nim, password }) => {
  try {
    const response = await axiosClient.post("/auth/student/login", {
      nim,
      password,
    });

    const data = response.data;

    if (data?.access_token) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role || "student");
      localStorage.setItem("user", JSON.stringify(data.user || {}));
    }

    return data;
  } catch (error) {
    console.error("LOGIN STUDENT ERROR:", error);

    return {
      success: false,
      message:
        error?.response?.data?.detail ||
        "Login mahasiswa gagal. Periksa NIM dan password.",
    };
  }
};

export const loginLecturer = async ({ nidn, password }) => {
  try {
    const response = await axiosClient.post("/auth/lecturer/login", {
      nidn,
      password,
    });

    const data = response.data;

    if (data?.access_token) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role || "lecturer");
      localStorage.setItem("user", JSON.stringify(data.user || {}));
    }

    return data;
  } catch (error) {
    console.error("LOGIN LECTURER ERROR:", error);

    return {
      success: false,
      message:
        error?.response?.data?.detail ||
        "Login dosen gagal. Periksa NIDN dan password.",
    };
  }
};


export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
  localStorage.removeItem("active_session_id");
};

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;
  if (token === "null") return false;
  if (token === "undefined") return false;
  if (token.trim() === "") return false;

  return true;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  if (!user || user === "null" || user === "undefined") {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const getCurrentRole = () => {
  return localStorage.getItem("role");
};
