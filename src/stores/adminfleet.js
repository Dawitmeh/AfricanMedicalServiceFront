import { defineStore } from "pinia";
import { ref } from "vue";
import axiosAdmin from "../../axios/axiosAdmin";


export const useFleetStore = defineStore('adminfleet', {
    state: () => ({
        fleets: [],
        currentFleet: [],
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
        createFleet(fleet) {
            this.isLoading = true
            return axiosAdmin.post('/fleets', fleet)
                .then((res) => {
                    this.fleets = res.data.data
                    this.isLoading = false
                })
        },
        getFleets() {
            this.isLoading = true
            return axiosAdmin.get('/fleets')
                .then((res) => {
                    this.fleets = res.data.data
                    this.isLoading = false
                })
        },
        getFleet(id) {
            this.isLoading = true
            return axiosAdmin.get(`/fleets/${id}`)
                .then((res) => {
                    this.currentFleet = res.data.data
                    this.isLoading = false
                })
        },
        updateFleet(fleet) {
            this.isLoading = true
            return axiosAdmin.put(`/fleets/${fleet.id}`, fleet)
                .then((res) => {
                    this.currentFleet = res.data.data
                    this.isLoading = false
                })
        },
        deleteFleet(id) {
            this.isLoading = true
            return axiosAdmin.delete(`/fleets/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
            
    }
})