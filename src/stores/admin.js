import { defineStore } from "pinia";
import { ref } from "vue";
import axiosAdmin from "../../axios/axiosAdmin";


export const useAdminStore = defineStore('admin', {
    state: () => ({
        admin: {
            data: JSON.parse(sessionStorage.getItem('USER_DATA')) || {},
            token: sessionStorage.getItem('TOKEN') || null,
        }
    }),
    getters: {
        isAuthenticated: (state) => !!state.admin.token
    }
})