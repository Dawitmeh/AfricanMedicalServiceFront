import { defineStore } from "pinia";
import { ref } from "vue";
import axiosAdmin from "../../axios/axiosAdmin";


export const useAdminStaffStore = defineStore('adminstaff', {
    state: () => ({
        staffs: [],
        currentStaff: [],
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
        createStaff(staff) {
            this.isLoading = true
            return axiosAdmin.post('/staffs', staff)
                .then((res) => {
                    this.staffs = res.data.data
                    this.isLoading = false
                })
        },
        getStaffs() {
            this.isLoading = true
            return axiosAdmin.get('/staffs')
                .then((res) => {
                    this.staffs = res.data.data
                    this.isLoading = false
                })
        },
        getStaff(id) {
            this.isLoading = true
            return axiosAdmin.get(`/staffs/${id}`)
                .then((res) => {
                    this.currentStaff = res.data.data
                    this.isLoading = false
                })
        },
        updateStaff(staffs) {
            this.isLoading = true
            return axiosAdmin.put(`/staffs/${staffs.id}`, staffs)
                .then((res) => {
                    this.currentStaff = res.data.data
                    this.isLoading = false
                })
        },
        deleteStaff(id) {
            this.isLoading = true
            return axiosAdmin.delete(`/staffs/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
    }
})