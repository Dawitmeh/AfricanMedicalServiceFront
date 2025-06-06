import axios from "axios";
import { useClientStore } from "@/stores/clients";


const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})

axiosClient.interceptors.request.use(config => {

    const token = sessionStorage.getItem('TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export default axiosClient;