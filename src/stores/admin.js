import { defineStore } from "pinia";
import { ref } from "vue";
import axiosAdmin from "../../axios/axiosAdmin";


export const useAdminStore = defineStore('admin', {
    state: () => ({
        admin: {
            data: JSON.parse(sessionStorage.getItem('USER_DATA')) || {},
            token: sessionStorage.getItem('TOKEN') || null,
            user_type: ''
        },
        errMsg: [],
        notification: {
            show: false,
            type: null,
            message: null
        }, 
        isLoading: ref(true),
    }),
    getters: {
        isAuthenticated: (state) => !!state.admin.token
    },
    actions: {
        notify({message, type}) {
            this.notification.show = true
            this.notification.type = type
            this.notification.message = message
            setTimeout(() => {
                this.notification.show = false
            }, 3000)
        },
        login(admin) {
            return axiosAdmin.post('/adminlogin', admin)
                .then(({ data }) => {
                    this.admin.data = data.user
                    this.admin.token = data.token
                    this.admin.user_type = data.user.userType
                    sessionStorage.setItem('TOKEN', data.token)
                    sessionStorage.setItem('USER_DATA', JSON.stringify(data.user))
                    sessionStorage.setItem('USER_TYPE', data.user.userType)
                })
                .catch((err) => {
                    this.errMsg = err.response.data ? err.response.data : "Access denied."
                    setTimeout(() => {
                        this.errMsg = false
                    }, 300)
                })
        },
        logout() {
            this.admin.data = {}
            this.admin.token = null
            sessionStorage.removeItem('TOKEN')
            sessionStorage.removeItem('USER_DATA')
        }
    }
})