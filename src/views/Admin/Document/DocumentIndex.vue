<template>
    <AdminPageComponent>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <div class="relative w-full mb-6 group">
                <router-link :to="{name: 'AdminDocumentType'}" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" />
                    </svg> -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-theme-main">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    <p class="t-3 font-bold text-gray-700 dark:text-gray-400">Document Type</p>
                </router-link>
              </div>
         </div>
          <div class="mt-3 mb-3">
            <div
              v-if="notification.show == true"
              class="p-3 text-white animate-fade-in-down rounded-md"
              :class="[notification.type === 'success' ?  'bg-emerald-500' : 'bg-red-500']"
              >
                {{ notification.message }}
            </div>
        </div>
         <div class="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
            <div class="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
              <div class="w-full md:w-1/2">
                <form  class="flex items-center">
                  <label for="simple-search" class="sr-only">Search</label>
                  <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <input type="text" id="simple-search" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-theme-main focus:border-theme-main dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="">
                  </div>
                </form>
              </div>
              <button @click="showModal" class="
                  mt-5
                  py-2
                  px-3
                  text-white
                  bg-theme-main
                  rounded-md
                  hover:bg-theme-main"
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Document
              </button>
            </div>
        </div>

         <div v-if="isLoading != false">
              <div role="status" class="text-center mt-6 mb-6">
                <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-theme-main" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
               </div>
        </div>
        <div v-else class="grid sm:grid-cols-4 gap-4 mt-6">
            <div class="relative" v-for="document in documents" :key="document.id">
                <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div class="h-48 w-full overflow-hidden rounded-sm mb-2 shadow-sm">
                        <!-- <img :src="document.document" alt="Flag of {{ document.document }}" class="w-full h-full object-cover shadow" v-if="hospital?.name" /> -->
                         <iframe 
                            :src="document.document" 
                            class="w-full h-full" 
                            frameborder="0"
                        ></iframe>
                    </div>
                    <div>
                        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ document?.document_type?.name }} File</h5>
                    </div>
                    <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                        <li class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 me-2 text-green-500 dark:text-green-400 shrink-0">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <legend>{{ document?.client?.first_name }} {{ document?.client?.last_name }}</legend>
                        </li>
                        <li class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 me-2 text-green-500 dark:text-green-400 shrink-0">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                            <legend>{{ document?.document_type?.name }} / {{ document?.document_type?.format }}</legend>
                        </li>
                        <li class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 me-2 text-gray-500 dark:text-gray-400 shrink-0">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>

                            <legend>{{ document?.document_type?.dimension }}</legend>
                        </li>
                    </ul>
                    <div class="mt-3">
                    <button @click="openEditModal(document.id)" class="inline-flex font-medium items-center text-blue-600 hover:underline">
                        Edit
                    </button>
                    <a :href="document.document" target="_blank" class="inline-flex float-right font-medium items-center text-theme-main hover:underline">
                        Preview
                        <svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                        </svg>
                    </a>
                    </div>
                </div>
            </div>
        </div>

        <fwb-modal v-if="isShowModal" @close="closeModal">
            <template #header>
              <div class="flex items-center text-lg text-gray-700">
              {{ isEditing ? 'Edit Document' : 'Add Document' }}
              </div>
            </template>
            <template #body>
              <form @submit="saveDocument">
                      <div v-if="isLoading" class="text-center">
                        <div role="status">
                            <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div>
                    </div>
                    <div>
                      <div v-if="errMsg != false" id="alert-border-2" class="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
                        <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <div class="ml-3 text-sm font-medium">
                          {{ errMsg }}
                        </div>
                      </div>
                    </div>
                        <div class="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client</label>
                                <select id="category" v-model="document.client_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Select Client</option>
                                    <option v-for="client in clients" :key="client.id" :value="client.id">
                                        {{ client?.first_name }} {{ client?.last_name }} ({{ client?.email }})
                                    </option>
                                </select>
                                <div v-if="validationErr.client_id" class="text-red-500 text-xs mt-1">
                                    {{ validationErr?.client_id[0] }}
                                </div>
                            </div> 
                            <div>
                                <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Document Type</label>
                                <select id="category" v-model="document.type_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Select Client</option>
                                    <option v-for="type in documentTypes" :key="type.id" :value="type.id">
                                        {{ type?.name }} ({{ type?.format }})
                                    </option>
                                </select>
                                <div v-if="validationErr.type_id" class="text-red-500 text-xs mt-1">
                                    {{ validationErr?.type_id[0] }}
                                </div>
                            </div> 
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-gray-700">
                                 Document
                                </label>

                                <button
                                    type="button"
                                    class="relative mt-2 overflow-hidden bg-emerald-500 py-2 px-3 border border-emerald-300 rounded-md shadow-sm text-sm leading-4 font-medium text-white hover:bg-emerald-50 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <input 
                                    type="file" 
                                    ref="fileInput"
                                    @change="onImageChoose"
                                    class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                                    >
                                    Upload Document
                                </button>

                                <!-- Show preview -->
                                <!-- <div v-if="selectedFiles[0]" class="mt-4">
                                    <p class="text-sm text-gray-500 mb-2">Preview:</p>
                                    <div class="relative w-fit max-w-xs bg-gray-100 p-2 rounded shadow-sm">
                                    
                                      <p class="text-gray-700 text-sm font-medium truncate mr-6">
                                        {{ selectedFiles[0]?.name }}
                                      </p>
                                    <button @click="removeFile" class="absolute top-0 right-0 ml-6 bg-white text-red-500 p-1 rounded-full shadow">
                                        ✕
                                    </button>
                                    </div>
                                </div> -->
                                <div v-if="selectedFiles?.name || document?.document" class="mt-4">
                                    <p class="text-sm text-gray-500 mb-2">Preview:</p>
                                    
                                    <div class="relative w-fit max-w-xs bg-gray-100 p-2 rounded shadow-sm">
                                        <template v-if="selectedFiles?.name">
                                            <p class="text-gray-700 text-sm font-medium truncate mr-6">
                                                {{ selectedFiles.name }}
                                            </p>
                                        </template>
                                        <template v-else>
                                            <a 
                                                :href="document.document" 
                                                target="_blank" 
                                                class="text-emerald-600 underline text-sm"
                                            >
                                                View current document
                                            </a>
                                        </template>
                                        
                                        <button @click="removeFile" class="absolute top-0 right-0 ml-6 bg-white text-red-500 p-1 rounded-full shadow">
                                            ✕
                                        </button>
                                    </div>
                                </div>
                                <!-- Validation error -->
                                <div v-if="validationErr.document" class="text-red-500 text-xs mt-1">
                                    {{ validationErr.document[0] }}
                                </div>
                                </div>

                        </div>
                        <div class="flex justify-between">
                              <button @click="closeModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                Cancel
                              </button>
                              <fwb-button color="default" pill >
                                <!-- <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> -->
                                Submit
                              </fwb-button>
                        </div>
                    </form>
            </template>
        </fwb-modal>
    </AdminPageComponent>
</template>


<script setup>
import AdminPageComponent from '@/components/Admin/AdminPageComponent.vue';
import { useDocumentStore } from '@/stores/admindocument';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { FwbButton, FwbModal } from 'flowbite-vue'


const store = useDocumentStore()

const documents = computed(() => store.documents)
const documentTypes = computed(() => store.documentTypes)
const isLoading = computed(() => store.isLoading)
const notification = computed(() => store.notification)
const clients = computed(() => store.clients)


const document = ref({
    client_id: '',
    type_id: '',
    document: '',
    document_url: ''
})

const isShowModal = ref(false)
const isShowModal2 = ref(false)
const isEditing = ref(false)

const fileInput = ref([])
const selectedFiles = ref([])
const imagePreview = ref(null)

watch(() => store.currentDocument,
            (newVal, oldVal) => {
                if (newVal !== undefined) {
                    document.value = {
                        ...JSON.parse(JSON.stringify(newVal)),
                        document: null,
                        document_url: getDocumentUrl(newVal.document)
                    }
                }

                // imagePreview.value = newVal.document
                selectedFiles.value = [getDocumentUrl(newVal.document)]
            }
)

const validationErr = ref([])

function validateForm() {
    validationErr.value = {}

    if (!document.value.client_id) {
        validationErr.value.client_id = ['Client field is required']
    }
    if (!document.value.type_id) {
        validationErr.value.type_id = ['Document type is required']
    }
    if (!document.value.document && !isEditing.value) {
        validationErr.value.document = ['Document file is required']
    }

    return Object.keys(validationErr.value).length === 0;
}

function closeModal() {
    isShowModal.value = false
    isEditing.value = false
    document.value = {
         client_id: '',
        type_id: '',
        document: '',
        document_url: ''
    }
}

function showModal() {
    isShowModal.value = true
    isEditing.value = false
    document.value = {
         client_id: '',
        type_id: '',
        document: '',
        document_url: ''
    }
}

function openEditModal(selectedDocument) {
    if (selectedDocument) {
        store.getDocument(selectedDocument)
    }
    isShowModal.value = true
    isEditing.value = true
}

const getDocumentUrl = (path) => {
    return path ? `/${path}` : ''
}
function removeFile() {
  selectedFiles.value = [];
  document.value.document = null;
  document.value.document_url = null;
}

function onImageChoose(event) {
  const file = event.target.files[0];
  if (!file) return;

  selectedFiles.value = [file];
  const reader = new FileReader();
  reader.onload = () => {
    document.value.document_url = reader.result; // For preview
    document.value.document = reader.result
  };
  reader.readAsDataURL(file);
}

const errMsg = ref(false)

function saveDocument(e) {
    e.preventDefault()

    if (validateForm()) {
        if (document.value.document) {
            document.value.document = document.value.document
        }
        const action = isEditing.value ? 'updated' : 'created'
        const apiCall = isEditing.value ? store.updateDocument : store.createDocument
        apiCall({...document.value})
            .then(() => {
                store.notify({
                    type: 'success',
                    message: 'The document was successfully ' + action
                })
                closeModal()
                store.getDocuments()
                store.getDocumentTypes()
            })
            .catch((err) => {
                errMsg.value = err.response.data
                setTimeout(() => {
                    closeModal()
                    validationErr.value = false
                    errMsg.value = false
                }, 2000)
                store.getDocuments()
                store.getDocumentTypes()
            })
    } else {
        setTimeout(() => {
            validationErr.value = false
        }, 2000)
    }
}


onBeforeMount(() => {
    store.getDocuments()
    store.getDocumentTypes()
    store.getClients()
})
</script>