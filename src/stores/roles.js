import { defineStore } from "pinia";
import { ref } from "vue";
import axiosAdmin from "../../axios/axiosAdmin";



export const useRoleStore = defineStore('roles', {
    state: () => ({
        roles: [],
        currentRole: [],
        notification: {
            show: false,
            type: null,
            message: null
        },
        isLoading: ref(true),
        rolePermissions: [],
        permissions: []
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
        createRole(role) {
            this.isLoading = true
            return axiosAdmin.post('/roles', role)
                .then((res) => {
                    this.roles = res.data.data
                    this.isLoading = false
                })
        },
        getRoles() {
            this.isLoading = true
            return axiosAdmin.get('/roles')
                .then((res) => {
                    this.roles = res.data.data
                    this.isLoading = false
                })
        },
        getRole(id) {
            this.isLoading = true
            return axiosAdmin.get(`/roles/${id}`)
                .then((res) => {
                    this.currentRole = res.data.data
                    this.isLoading = false
                })
        },
        updateRole(role) {
            this.isLoading = true
            return axiosAdmin.put(`/roles/${role.id}`, role)
                .then((res) => {
                    this.currentRole = res.data.data
                    this.isLoading = false
                })
        },
        deleteRole(id) {
            this.isLoading = true
            return axiosAdmin.delete(`/roles/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        },
        getRolePermissions(id) {
            this.isLoading = true
            return axiosAdmin.get(`/roles/${id}/give-permissions`)
                .then((res) => {
                    this.currentRole = res.data.role
                    this.rolePermissions = res.data.rolePermissions
                    this.permissions = res.data.permissions
                })
        }
    }
})