import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:8080/",
});

axiosInstance.interceptors.request.use()

axiosInstance.interceptors.request.use((config)=>{
    console.log("Bir İstek Atıldı.");
    config.headers.Authorization = "My Token";
    return config;
})

axiosInstance.interceptors.response.use((value)=>{
    console.log("Başarılı bir cevap alındı.");
    return value;
},
error => {
    if (error.type == "BusinessException"){
        //error.message => Alert ile göster
        console.log("Bir hata ile karşılaşıldı", error.response.data.message);
        return error;
        //return Promise.reject(error); => kullanırsak Then Catch bloklarıda yazılması gerekiyor. Direk error kullanmak yaygın yöntem
    }
},
)

export default axiosInstance;