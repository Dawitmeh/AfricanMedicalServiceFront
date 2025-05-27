import axios from "axios";
import { useAdminStore } from "@/stores/admin";


const axiosAdmin = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})


axiosAdmin.interceptors.request.use(config => {

    const token = sessionStorage.getItem('TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

export default axiosAdmin;