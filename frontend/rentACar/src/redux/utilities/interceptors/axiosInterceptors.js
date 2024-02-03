import axios from "axios";
import { toastError, toastSuccess, toastWarning } from "../../../service/ToastifyService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    } catch (error) {
      console.error("Request interceptor error:", error);
      toastError("Request interceptor error:", error);
      throw error; // Promise.reject yerine direkt throw
    }
  },
  (error) => {
    throw error; // Promise.reject yerine direkt throw
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const response = await axiosInstance.post("api/v1/auth/refresh-token");
          const { access_token } = response.data;
          localStorage.setItem("access_token", access_token);
          toastSuccess("Token Yenilendi...");

          originalConfig.headers.Authorization = `Bearer ${access_token}`; // Yalnızca ilgili isteğe eklendi

          return axiosInstance(originalConfig);
        } catch (refreshError) {
          toastError("Refresh token error:" + refreshError);
          localStorage.clear();
          window.location.href = "/login";
          throw refreshError; // Promise.reject yerine direkt throw
        }
      } else {
        toastError("Refresh token bulunamadı!");
        throw error; // 401 hatası için direkt throw
      }
    } else if (error.response.status === 403) {
      toastWarning("403 Hatası: Yetkisiz erişim!");
      localStorage.clear();
      window.location.href = "/login";
      throw error; // 403 hatası için direkt throw
    } else {
      toastWarning("Refresh token error:" + error);
      throw error; // Diğer hatalar için direkt throw
    }
  }
);

export default axiosInstance;
