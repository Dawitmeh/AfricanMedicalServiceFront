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
                Add Clients
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
                            First name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Last name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Phone number
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Age
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(client, index) in clients" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <img class="w-10 h-10 rounded-full" :src="client?.image" alt="Jese image">
                            <div class="ps-3">
                                <div class="text-base font-semibold">{{ client?.first_name }}</div>
                                <!-- <div class="font-normal text-gray-500">neil.sims@flowbite.com</div> -->
                            </div>  
                        </th>
                        <td class="px-6 py-4">
                            {{ client?.last_name }}
                        </td>
                        <td class="px-6 py-4">
                            {{ client?.phone }} 
                        </td>
                        <td class="px-6 py-4">
                            {{ client?.email }} 
                        </td>
                        <td class="px-6 py-4">
                            {{ client?.age }} 
                        </td>
                        <td class="px-6 py-4">
                            <div v-if="client.status == 'Active'" class="flex items-center">
                                <div  class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Active
                            </div>
                            <div v-else class="flex items-center">
                                <div  class="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Inactive
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <!-- Modal toggle -->
                            <button @click="openEditModal(client.id)" type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                            <router-link v-if="client?.id" :to="{name: 'AdminClientView', params: {id: client.id}}" class="inline-flex ml-3 font-medium items-center text-theme-main hover:underline">
                                Detail
                                <svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                                </svg>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal -->
         <fwb-modal v-if="isShowModal" @close="closeModal">
            <template #header>
              <div class="flex items-center text-lg text-gray-700">
              {{ isEditing ? 'Edit Client' : 'Add Client' }}
              </div>
            </template>
            <template #body>
              <form @submit="saveClient">
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
                                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                <input type="text" v-model="client.first_name" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="">
                                <div v-if="validationErr.first_name" class="text-red-500 text-xs mt-1">
                                    {{ validationErr.first_name[0] }}
                                </div>
                                </div>
                                <div>
                                    <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                    <input  v-model="client.last_name" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="">
                                    <div v-if="validationErr.last_name" class="text-red-500 text-xs mt-1">
                                        {{ validationErr.last_name[0] }}
                                    </div>
                                </div> 
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" v-model="client.email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                                    <div v-if="validationErr.email" class="text-red-500 text-xs mt-1">
                                        {{ validationErr.email[0] }}
                                    </div>
                                </div>
                                <div>
                                    <label for="phone_number" class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                    
                                    <div class="flex">
                                        <!-- Prefix Dropdown -->
                                        <select v-model="client.country_code"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg px-1 py-2.5 flex items-center dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500">
                                        <option v-for="country in countries" :value="country.code">{{ country.code }}</option>
                                        </select>

                                        <!-- Phone Input -->
                                        <input
                                        type="text"
                                        v-model="client.phone"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 flex-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Phone number"
                                        />
                                    </div>
                                    
                                    <!-- Validation Error -->
                                    <div v-if="validationErr.phone" class="text-red-500 text-xs mt-1">
                                        {{ validationErr.phone[0] }}
                                    </div>
                                </div>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                                    <input  v-model="client.age" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="">
                                    <div v-if="validationErr.age" class="text-red-500 text-xs mt-1">
                                        {{ validationErr.age[0] }}
                                    </div>
                                </div>
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-gray-700">
                                    Client Image
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
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" v-model="client.password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <div v-if="validationErr.password" class="text-red-500 text-xs mt-1">
                                    {{ validationErr.password[0] }}
                                </div>
                            </div>
                            <div>
                                <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input type="password" v-model="client.password_confirmation" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <div v-if="validationErr.password_confirmation" class="text-red-500 text-xs mt-1">
                                        {{ validationErr.password_confirmation[0] }}
                                    </div> 
                            </div>
                            <label class="inline-flex items-center me-5 cursor-pointer">
                                <input 
                                    type="checkbox"
                                    class="sr-only peer"
                                    v-model="client.status"
                                    :true-value="'Active'"
                                    :false-value="'Inactive'"
                                >
                                <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Active</span>
                            </label>

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
import { useAdminClientStore } from '@/stores/adminclient';
import { useCountryStore } from '@/stores/admincountry';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { FwbButton, FwbModal } from 'flowbite-vue'


const store = useAdminClientStore()
const countryStore = useCountryStore()

const isLoading = computed(() => store.isLoading)
const notification = computed(() => store.notification)
const clients = computed(() => store.clients)
const countries = computed(() => countryStore.countries)

const client = ref({
    first_name: '',
    last_name: '',
    age: '',
    country_code: '',
    email: '',
    phone: '',
    image: '',
    image_url: '',
    password: '',
    password_confirmation: '',
    status: ''
})

const isShowModal = ref(false)
const isEditing = ref(false)

const fileInput = ref([])
const selectedFiles = ref([])
const imagePreview = ref(null)


watch(() => store.currentClient,
            (newVal, oldVal) => {
                if (newVal !== undefined) {
                    client.value = {
                        ...JSON.parse(JSON.stringify(newVal))
                    }
                }

                imagePreview.value = newVal.image
                selectedFiles.value = null
            }
)

const validationErr = ref({})

const errMsg = ref([])

function validateForm() {

    validationErr.value = {}

    if (!client.value.first_name) {
        validationErr.value.first_name = ['First name is required']
    }
    if (!client.value.last_name) {
        validationErr.value.last_name = ['Last name is required']
    }
    if (!client.value.email) {
        validationErr.value.email = ['Email address is required']
    }
    if (!client.value.age) {
        validationErr.value.age = ['Age field is required']
    }
    if (!client.value.phone) {
        validationErr.value.phone = ['Phone number is required']
    }
    if (!client.value.image) {
        validationErr.value.image = ['Profile image is required']
    }
    if (!client.value.country_code) {
        validationErr.value.country_code = ['Country code is required']
    }
    if (!client.value.password) {
        validationErr.value.password = ['Password is required']
    }
    if (!client.value.password_confirmation && !isEditing.value) {
        validationErr.value.password_confirmation = ['Password confirmation is required']
    }

    return Object.keys(validationErr.value).length === 0
}

function closeModal() {
    isShowModal.value = false
    isEditing.value = false
}

function showModal() {
    isShowModal.value = true
    isEditing.value = false
    client.value = {
         first_name: '',
        last_name: '',
        age: '',
        country_code: '',
        email: '',
        phone: '',
        image: '',
        image_url: '',
        password: '',
        password_confirmation: '',
    }
    imagePreview.value = null
}

function openEditModal(selectedClient) {
    if (selectedClient) {
        store.getClient(selectedClient)
    }
    isShowModal.value = true
    isEditing.value = true
}

function onImageChoose(event) {
    const file = event.target.files[0]
    if (!file) return

    selectedFiles.value = file
    client.value.image = file

    const reader = new FileReader()
    reader.onload = () => {
        imagePreview.value = reader.result
        client.value.image = reader.result
        client.value.image_url = reader.result
    }

    reader.readAsDataURL(file)
}

function removeFile() {
    selectedFiles.value = null
    imagePreview.value = null
    client.value.image = null
    client.value.image_url = null
}

function saveClient(e) {
    e.preventDefault()

    if (validateForm()) {
        const action = isEditing.value ? 'updated' : 'created'
        const apiCall = isEditing.value ? store.updateClient : store.createClient
        apiCall({...client.value})
            .then(() => {
                store.notify({
                    type: 'success',
                    message: 'The client was successfully ' + action
                })
                closeModal()
                store.getClients()
                countryStore.getCountries()
            })
            .catch((err) => {
                errMsg.value = err.response.data
                setTimeout(() => {
                    closeModal()
                    validationErr.value = false
                    errMsg.value = false
                }, 3000)
                store.getClients()
                countryStore.getCountries()
            })
    } else {
        setTimeout(() => {
            validationErr.value = false
        }, 3000)
    }
}

onBeforeMount(() => {
    store.getClients()
    countryStore.getCountries()
})
</script>