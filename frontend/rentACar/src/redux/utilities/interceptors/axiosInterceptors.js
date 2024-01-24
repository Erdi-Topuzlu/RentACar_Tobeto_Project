import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:8080/",
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // localStorage'da token'ı sakladığınızı varsayalım
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );

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

export default axiosInstance;