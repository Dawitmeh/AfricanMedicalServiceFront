import { defineStore } from "pinia";
import { ref } from "vue";
import axiosAdmin from "../../axios/axiosAdmin";



export const useDocumentStore = defineStore('admindocument', {
    state: () => ({
        documents: [],
        currentDocument: [],
        documentTypes: [],
        currentType: [],
        notification: {
            show: false,
            type: null,
            message: null
        },
        isLoading: ref(true),
        clients: []
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
        createDocument(document) {
            this.isLoading = true
            return axiosAdmin.post('/documents', document)
                .then((res) => {
                    this.documents = res.data.data
                    this.isLoading = false
                })
        },
        getDocuments() {
            this.isLoading = true
            return axiosAdmin.get('/documents')
                .then((res) => {
                    this.documents = res.data.data
                    this.isLoading = false
                })
        },
        getDocument(id) {
            this.isLoading = true
            return axiosAdmin.get(`/documents/${id}`)
                .then((res) => {
                    this.currentDocument = res.data.data
                    this.isLoading = false
                })
        },
        updateDocument(document) {
            this.isLoading = true
            return axiosAdmin.put(`/documents/${document.id}`, document)
                .then((res) => {
                    this.currentDocument = res.data.data
                    this.isLoading = false
                })
        },
        deleteDocument(id) {
            this.isLoading = true
            return axiosAdmin.delete(`/documents/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        },
        // Document Format
        createDocumentFormat(format) {
            this.isLoading = true
            return axiosAdmin.post('/documenttypes', format)
                .then((res) => {
                    this.documentTypes = res.data.data
                    this.isLoading = false
                })
        },
        getDocumentTypes() {
            this.isLoading = true
            return axiosAdmin.get('/documenttypes')
                .then((res) => {
                    console.log(res.data)
                    this.documentTypes = res.data.data
                    this.isLoading = false
                })
        },
        getDocumentType(id) {
            this.isLoading = true
            return axiosAdmin.get(`/documenttypes/${id}`)
                .then((res) => {
                    this.currentType = res.data.data
                    this.isLoading = false
                })
        },
        updateDocumentType(format) {
            this.isLoading = true
            return axiosAdmin.put(`/documenttypes/${format.id}`, format)
                .then((res) => {
                    this.currentType = res.data.data
                    this.isLoading = false
                })
        },
        deleteDocumentType(id) {
            this.isLoading = true
            return axiosAdmin.delete(`/documenttypes/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        },

        // get Client
        getClients() {
            this.isLoading = true
            return axiosAdmin.get('/clients')
                .then((res) => {
                    this.clients = res.data.data
                    this.isLoading = false
                })
        }

    }
})