import { defineStore } from "pinia";
import { ref } from "vue";
import axiosAdmin from "../../axios/axiosAdmin";



export const useHospitalStore = defineStore('adminhospital', {
    state: () => ({
        hospitals: [],
        currentHospital: [],
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
        createHospital(hospital) {
            this.isLoading = true
            return axiosAdmin.post('/hospitals', hospital)
                .then((res) => {
                    this.hospitals = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getHospitals() {
            this.isLoading = true
            return axiosAdmin.get('/hospitals')
                .then((res) => {
                    this.hospitals = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getHospital(id) {
            this.isLoading = true
            return axiosAdmin.get(`/hospitals/${id}`)
                .then((res) => {
                    this.currentHospital = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        updateHospital(hospital) {
            console.log(hospital)
            this.isLoading = true
            return axiosAdmin.put(`/hospitals/${hospital.id}`, hospital)
                .then((res) => {
                    this.currentHospital = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        deleteHospital(id) {
            this.isLoading = true
            return axiosAdmin.delete(`/hospitals/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
    }
})