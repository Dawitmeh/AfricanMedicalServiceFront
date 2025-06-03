import { defineStore } from "pinia";
import { ref } from "vue";
import axiosAdmin from "../../axios/axiosAdmin";


export const usePackageStore = defineStore('adminpackage', {
    state: () => ({
        packages: [],
        currentPackage: [],
        notification: {
            type: null,
            show: false,
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
        createPackage(packages) {
            this.isLoading = true
            return axiosAdmin.post('/packages', packages)
                .then((res) => {
                    this.packages = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getPackages() {
            this.isLoading = true
            return axiosAdmin.get('/packages')
                .then((res) => {
                    this.packages = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getPackage(id) {
            this.isLoading = true
            return axiosAdmin.get(`/packages/${id}`)
                .then((res) => {
                    this.currentPackage = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        updatePackage(packages) {
            this.isLoading = true
            return axiosAdmin.put(`/packages/${packages.id}`, packages)
                .then((res) => {
                    this.currentPackage = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        deletePackage(id) {
            this.isLoading = true
            return axiosAdmin.delete(`/packages/${id}`)
                .then(() => {
                    this.isLoading = false
                })
        }
    }
})