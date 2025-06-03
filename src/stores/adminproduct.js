import { defineStore } from "pinia";
import { ref } from "vue";
import axiosAdmin from "../../axios/axiosAdmin";


export const useProductStore = defineStore('adminproduct', {
    state: () => ({
        products: [],
        currentProduct: [],
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
        createProduct(product) {
            this.isLoading = true
            return axiosAdmin.post('/products', product)
                .then((res) => {
                    this.products = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getProducts() {
            this.isLoading = true
            return axiosAdmin.get('/products')
                .then((res) => {
                    this.products = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getProduct(id) {
            this.isLoading = true
            return axiosAdmin.get(`/products/${id}`)
                .then((res) => {
                    this.currentProduct = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        updateProduct(product) {
            this.isLoading = true
            return axiosAdmin.put(`/products/${product.id}`, product)
                .then((res) => {
                    this.currentProduct = res.data.data
                    this.isLoading = false
                })
        },
        deleteProduct(id) {
            this.isLoading = true
            return axiosAdmin.delete(`/products/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
    }
})