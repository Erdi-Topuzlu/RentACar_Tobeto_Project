import axios from "axios";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../../service/ToastifyService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const refreshToken = localStorage.getItem("refresh_token");
    console.log(refreshToken);
    try {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        console.log(config.headers.Authorization);
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
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Hata 401 ise ve refresh token varsa
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("Şuan Buradasın 1");

      try {
        // Refresh token isteği
        const refreshToken = localStorage.getItem("refresh_token");
        console.log(refreshToken);
        console.log("Şuan Buradasın 2");
        // const headers = {
        //   Authorization: `Bearer ${refreshToken}`,
        // };
        const refreshResponse = await fetch(
          "http://localhost:8080/api/v1/auth/refresh-token",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const refreshData = await refreshResponse.json(); // Yanıtı JSON formatına dönüştür
        console.log(refreshData);

        // Yeni erişim tokenını kaydet
        const newAccessToken = refreshData.access_token;
        localStorage.removeItem("access_token");
        console.log(newAccessToken);
        localStorage.setItem("access_token", newAccessToken);

        // Yeni erişim tokenını ekleyerek orijinal isteği tekrar dene
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        console.log("Şuan Buradasın 3");
        if(originalRequest.headers.Authorization){
          toastSuccess("Kullanıcının Access Tokenı Değişti")
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token hatası
        console.log("Şuan Buradasın 4");
        console.error("Refresh token error:", refreshError);
        // Burada istediğiniz şekilde işlem yapabilirsiniz, örneğin kullanıcıyı logout yapabilirsiniz.
        localStorage.clear(); // Kullanıcıyı logout yap
        window.location.href = "/login"; // Login sayfasına yönlendir
        return Promise.reject(refreshError);
      }
    }
    console.log("Şuan Buradasın 5");
    toastWarning("Bir hata oluştu, lütfen tekrar deneyin.")
    return Promise.reject(error);
  }
);

export default axiosInstance;
