import { defineStore } from "pinia";
import { ref } from "vue";
import axiosAdmin from "../../axios/axiosAdmin";



export const usePermissionStore = defineStore('permissions', {
    state: () => ({
        permissions: [],
        currentPermission: [],
        notification: {
            show: false,
            type: null,
            message: null
        },
        isLoading: ref(true)
    }),
    actions: {
        notify({message, type}) {
            this.notification.show = true
            this.notification.type = type
            this.notification.message = message
            setTimeout(() => {
                this.notification.show = false
            }, 3000)
        },
        createPermission(permission) {
            this.isLoading = true
            return axiosAdmin.post('/permission', permission)
                .then((res) => {
                    this.permissions = res.data.data
                    this.isLoading = false
                })
        },
        getPermissions() {
            this.isLoading = true
            return axiosAdmin.get('/permission')
                .then((res) => {
                    this.permissions = res.data.data
                    this.isLoading = false
                })
        },
        getPermission(id) {
            this.isLoading = true
            return axiosAdmin.get(`/permission/${id}`)
                .then((res) => {
                    this.currentPermission = res.data.data
                    this.isLoading = false
                })
        },
        updatePermission(permission) {
            this.isLoading = true
            return axiosAdmin.put(`/permission/${permission.id}`, permission)
                .then((res) => {
                    this.currentPermission = res.data.data
                    this.isLoading = false
                })
        },
        deletePermission(id) {
            this.isLoading = true
            return axiosAdmin.delete(`/permission/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
    }
})