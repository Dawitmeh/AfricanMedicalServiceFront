<template>
    <AdminPageComponent>
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
                Add Package
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
        <div v-else class="relative overflow-x-auto shadow-md sm:rounded-lg mt-9">
            
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="p-4">
                            <div class="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="checkbox-all-search" class="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Product
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Package name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Total
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Discount
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(pack, index) in packages" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <img class="w-10 h-10 rounded-full" :src="pack?.image" alt="Jese image">
                            <div class="ps-3">
                                <div class="text-base font-semibold">{{ pack?.product?.name }}</div>
                                <!-- <div class="font-normal text-gray-500">neil.sims@flowbite.com</div> -->
                            </div>  
                        </th>
                        <td class="px-6 py-4">
                            {{ pack?.name }}
                        </td>
                        <td class="px-6 py-4">
                            {{ pack?.total }}
                        </td>
                        <td class="px-6 py-4">
                            {{ pack?.discount }}
                        </td>
                        <td class="px-6 py-4">
                            <!-- Modal toggle -->
                            <button @click="openEditModal(pack.id)" type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                            <!-- <router-link v-if="product?.id" :to="{name: 'AdminProductView', params: {id: product.id}}" class="inline-flex ml-3 font-medium items-center text-theme-main hover:underline">
                                Detail
                                <svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                                </svg>
                            </router-link> -->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal -->
         <fwb-modal v-if="isShowModal" @close="closeModal">
            <template #header>
              <div class="flex items-center text-lg text-gray-700">
              {{ isEditing ? 'Edit Product Package' : 'Add Product Package' }}
              </div>
            </template>
            <template #body>
              <form @submit="savePackage">
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
                                <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product</label>
                                <select id="category" v-model="pack.product_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Select product</option>
                                    <option v-for="product in products" :key="product.id" :value="product.id">
                                        {{ product?.name }}
                                    </option>
                                </select>
                                <div v-if="validationErr.product_id" class="text-red-500 text-xs mt-1">
                                    {{ validationErr?.product_id[0] }}
                                </div>
                            </div> 
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Name</label>
                                <input type="text" v-model="pack.name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="">
                                <div v-if="validationErr.name" class="text-red-500 text-xs mt-1">
                                  {{ validationErr.name[0] }}
                                </div>
                            </div>
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total</label>
                                <input type="text" v-model="pack.total" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="">
                                <div v-if="validationErr.total" class="text-red-500 text-xs mt-1">
                                  {{ validationErr.total[0] }}
                                </div>
                            </div>
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount</label>
                                <input type="text" v-model="pack.discount" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="">
                                <div v-if="validationErr.discount" class="text-red-500 text-xs mt-1">
                                  {{ validationErr.discount[0] }}
                                </div>
                            </div>
                            <div>
                                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea id="description" v-model="pack.description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
                                <div v-if="validationErr.description" class="text-red-500 text-xs mt-1">
                                  {{ validationErr.description[0] }}
                                </div>
                            </div>
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-gray-700">
                                    Package Image
                                </label>

                                <button
                                    type="button"
                                    class="relative mt-2 overflow-hidden bg-emerald-500 py-2 px-3 border border-emerald-300 rounded-md shadow-sm text-sm leading-4 font-medium text-white hover:bg-emerald-50 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <input 
                                    type="file" 
                                    accept="image/*"
                                    ref="fileInput"
                                    @change="onImageChoose"
                                    class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                                    >
                                    Upload Image
                                </button>

                                <!-- Show preview -->
                                <div v-if="imagePreview" class="mt-4">
                                    <p class="text-sm text-gray-500 mb-2">Preview:</p>
                                    <div class="relative w-32 h-20">
                                    <img :src="imagePreview" alt="Selected Flag" class="object-cover w-full h-full rounded shadow" />
                                    <button @click="removeFile" class="absolute top-0 right-0 bg-white text-red-500 p-1 rounded-full shadow">
                                        ✕
                                    </button>
                                    </div>
                                </div>

                                <!-- Validation error -->
                                <div v-if="validationErr.image" class="text-red-500 text-xs mt-1">
                                    {{ validationErr.image[0] }}
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
import { usePackageStore } from '@/stores/adminpackage';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { FwbButton, FwbModal } from 'flowbite-vue'
import { useProductStore } from '@/stores/adminproduct';


const store = usePackageStore()
const productStore = useProductStore()

const packages = computed(() => store.packages)
const notification = computed(() => store.notification)
const isLoading = computed(() => store.isLoading)
const products = computed(() => productStore.products)


const pack = ref({
    product_id: '',
    name: '',
    total: '',
    discount: '',
    image: '',
    image_url: '',
    description: ''
})

const isShowModal = ref(false)
const isEditing = ref(false)

const fileInput = ref([])
const selectedFiles = ref([])
const imagePreview = ref(null)

watch(() => store.currentPackage,
            (newVal, oldVal) => {
                if (newVal !== undefined) {
                    pack.value = {
                        ...JSON.parse(JSON.stringify(newVal))
                    }
                }

                imagePreview.value = newVal.image
                selectedFiles.value = null
            }
)


function onImageChoose(event) {
    const file = event.target.files[0]
    if (!file) return 

    selectedFiles.value = file
    pack.value.image = file

    const reader = new FileReader()
    reader.onload = () => {
        imagePreview.value = reader.result
        pack.value.image_url = reader.result
        pack.value.image = reader.result
    }

    reader.readAsDataURL(file)
}

function removeFile() {
    selectedFiles.value = null
    imagePreview.value = null
    pack.value.image = null
    pack.value.image_url = null
}

const validationErr = ref({})


function validateForm() {
    validationErr.value = {}

    if (!pack.value.product_id) {
        validationErr.value.product_id = ['Product is required']
    }
    if (!pack.value.name) {
        validationErr.value.name = ['Product name is required']
    }
    if (!pack.value.total) {
        validationErr.value.total = ['Total field is required']
    }
    if (!pack.value.discount) {
        validationErr.value.discount = ['Discount field is required']
    }
    if (!pack.value.description) {
        validationErr.value.description = ['Description is required']
    }

    return Object.keys(validationErr.value).length === 0;
}

function closeModal() {

    isShowModal.value = false
    // product.value = { name: '', description: ''}
    isEditing.value = false
}

function showModal() {
    isShowModal.value = true
    isEditing.value = false
    // product.value = { name: '', description: ''}
}

function openEditModal(selectedPackage) {
    if (selectedPackage) {
        store.getPackage(selectedPackage)
    }
    isShowModal.value = true
    isEditing.value = true
}


const errMsg = ref(false)

function savePackage(e) {
    e.preventDefault()

    if (validateForm()) {
        const action = isEditing.value ? 'updated' : 'created'
        const apiCall = isEditing.value ? store.updatePackage : store.createPackage
        apiCall({...pack.value})
            .then(() => {
                store.notify({
                    type: 'success',
                    message: 'The package was successfully ' + action
                })
                closeModal()
                store.getPackages()
            })
            .catch((err) => {
                errMsg.value = err.response.data
                setTimeout(() => {
                    closeModal()
                    validationErr.value = false
                    errMsg.value = false
                }, 2000)
                store.getPackages()
            })
    } else {
        setTimeout(() => {
            validationErr.value = false
        }, 2000)
    }
}

onBeforeMount(() => {
    store.getPackages()
    productStore.getProducts()
})

</script>