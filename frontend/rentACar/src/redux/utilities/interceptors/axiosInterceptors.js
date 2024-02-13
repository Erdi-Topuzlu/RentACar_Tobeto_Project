import axios from "axios";


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

      throw error; 
    }
  },
  (error) => {
    throw error;
  }
);
axiosInstance.interceptors.response.use(

  

  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403 || error.response.status === 401) {
      //Sadece 403 hatası alındığında çıkış yap
      localStorage.clear();
      //window.location.href = "/login";
      return Promise.reject(error);
    }

    if (!originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          const headers = {
            Authorization: `Bearer ${refreshToken}`,
          };
          const refreshResponse = await fetch(
            "http://localhost:8080/api/v1/auth/refresh-token",
            {
              method: "POST",
              headers: headers,
            }
          );

          const refreshData = await refreshResponse.json(); // Yanıtı JSON formatına dönüştür

          const newAccessToken = refreshData.access_token;
          localStorage.removeItem("access_token");
          localStorage.setItem("access_token", newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          if (originalRequest.headers.Authorization) {
            //toastSuccess("Kullanıcının Access Tokenı Değişti");
          }
          return axiosInstance(originalRequest);
        } else {
          throw new Error("noRefreshToken");
        }
      } catch (refreshError) {
        // Refresh token hatası
        //console.error("Response interceptor Refresh token error:", refreshError);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
