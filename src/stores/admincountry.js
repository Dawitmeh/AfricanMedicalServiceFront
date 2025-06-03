import { defineStore } from "pinia";
import { ref } from "vue";
import axiosAdmin from "../../axios/axiosAdmin";



export const useCountryStore = defineStore('admincountry', {
    state: () => ({
        countries: [],
        currentCountry: [],
        notification: {
            show: false,
            type: null,
            message: null
        },
        isLoading: ref(true),
        currencies: [],
        currentCurrency: []
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
        createCountry(country) {
            this.isLoading = true
            return axiosAdmin.post('/countries', country)
                .then((res) => {
                    this.countries = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getCountries() {
            this.isLoading = true
            return axiosAdmin.get('/countries')
                .then((res) => {
                    this.countries = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getCountry(id) {
            this.isLoading = true
            return axiosAdmin.get(`/countries/${id}`)
                .then((res) => {
                    console.log(res.data)
                    this.currentCountry = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        updateCountry(country) {
            this.isLoading = true
            return axiosAdmin.put(`/countries/${country.id}`, country)
                .then((res) => {
                    this.currentCountry = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        deleteCountry(id) {
            this.isLoading = true
            return axiosAdmin.delete(`/countries/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        },

        // Currency funcs
        createCurrency(currency) {
            this.isLoading = true
            return axiosAdmin.post('/currencies', currency)
                .then((res) => {
                    this.currencies = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getCurrencies() {
            this.isLoading = true
            return axiosAdmin.get('/currencies')
                .then((res) => {
                    this.currencies = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        updateCurrency(currency) {
            this.isLoading = true
            return axiosAdmin.put(`/currencies/${currency.id}`, currency)
                .then((res) => {
                    this.currentCurrency = res.data.data
                    this.isLoading = false
                })
                .catch((er) => {
                    console.log(er)
                })
        },
        getCurrency(id) {
            this.isLoading = true
            return axiosAdmin.get(`/currencies/${id}`)
                .then((res) => {
                    this.currentCurrency = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        deleteCurrency(id) {
            this.isLoading = true
            return axiosAdmin.delete(`/currencies/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
})