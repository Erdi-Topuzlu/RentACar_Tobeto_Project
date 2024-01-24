import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:8080/",
});


axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        //Token uygun yapıda mı ?
        if (token && /^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]+$/.test(token)) {
        config.headers.Authorization = `Bearer ${token}`;
      }}
      return config;
      //Hata durumu
    } catch (error) {
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      console.error("Response interceptor error:", error);
      return Promise.reject(error);
    } catch (error) {
      console.error("Response interceptor error (unexpected):", error);
      return Promise.reject(error);
    }
  }
);



export default axiosInstance;



// axiosInstance.interceptors.response.use((value)=>{
//     console.log("Başarılı bir cevap alındı.");
//     return value;
// },
// error => {
//     if (error.type == "BusinessException"){
//         //error.message => Alert ile göster
//         console.log("Bir hata ile karşılaşıldı", error.response.data.message);
//         return error;
//         //return Promise.reject(error); => kullanırsak Then Catch bloklarıda yazılması gerekiyor. Direk error kullanmak yaygın yöntem
//     }
// },
// )