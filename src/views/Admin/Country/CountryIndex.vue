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
                Add Country
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
            <div class="relative" v-for="country in countries" :key="country.id">
                <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">

                <!-- Flag Image -->
                <img :src="country.flag" alt="Flag of {{ country.name }}" class="w-10 h-6 object-cover mb-2 rounded-sm" v-if="country?.flag" />

                <div>
                    <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ country?.name }}</h5>
                </div>
                <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Code: <small>{{ country?.code }}</small></p>
                <button @click="openEditModal(country.id)" class="inline-flex font-medium items-center text-blue-600 hover:underline">
                    Edit
                </button>
                <button @click="onRemove(country?.id)" class="float-right inline-flex font-medium items-center text-red-600 hover:underline">
                    Remove
                </button>
                </div>
            </div>
            
        </div>
        

         <fwb-modal v-if="isShowModal" @close="closeModal">
            <template #header>
              <div class="flex items-center text-lg text-gray-700">
              {{ isEditing ? 'Edit Country' : 'Add Country' }}
              </div>
            </template>
            <template #body>
              <form @submit="saveCountry">
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
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country Name</label>
                                <input type="text" v-model="country.name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="">
                                <!-- <div v-if="validationErr.name" class="text-red-500 text-xs mt-1">
                                  {{ validationErr.name[0] }}
                                </div> -->
                            </div>
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country Code</label>
                                <input type="text" v-model="country.code" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="">
                                <div v-if="validationErr.code" class="text-red-500 text-xs mt-1">
                                  {{ validationErr.code[0] }}
                                </div>
                            </div>
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-gray-700">
                                    Country Flag
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
                                    Upload Flag
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
                                <div v-if="validationErr.flag" class="text-red-500 text-xs mt-1">
                                    {{ validationErr.flag[0] }}
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
import { useCountryStore } from '@/stores/admincountry';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { FwbButton, FwbModal } from 'flowbite-vue'




const store = useCountryStore()

const countries = computed(() => store.countries)
const notification = computed(() => store.notification)
const isLoading = computed(() => store.isLoading)


const isShowModal = ref(false)
const isShowModal2 = ref(false)
const isEditing = ref(false)

const fileInput = ref([])
const selectedFiles = ref([])
const imagePreview = ref(null)



const country = ref({
    name: '',
    flag: '',
    code: '',
    flag_url: ''
})

watch(() => store.currentCountry,
            (newVal, oldVal) => {
                if (newVal !== undefined) {
                    country.value = {
                        ...JSON.parse(JSON.stringify(newVal))
                    }
                }

                // set current image
                imagePreview.value = newVal.flag
                selectedFiles.value = null
            }
)

function onImageChoose(event) {
  const file = event.target.files[0] // only one file
  if (!file) return

  selectedFiles.value = file
  const reader = new FileReader()

  reader.onload = (e) => {
    imagePreview.value = e.target.result
    country.value.flag = file
    country.value.flag_url = e.target.result
  }

  reader.readAsDataURL(file)
}

function removeFile() {
  selectedFiles.value = null
  imagePreview.value = null
  country.value.flag = null
  country.value.flag_url = null
}

const validationErr = ref({})


function validateForm() {
    validationErr.value = {}

    if (!country.value.name) {
        validationErr.value.name = ['Country name is required']
    }
    if (!country.value.code) {
        validationErr.value.code = ['Country code is required']
    }
    if (!country.value.flag) {
        validationErr.value.flag = ['Country flag is required']
    }

    return Object.keys(validationErr.value).length === 0;
}
 
function closeModal() {

    isShowModal.value = false
    country.value = { name: '', description: ''}
    isEditing.value = false
}

function showModal() {
    isShowModal.value = true
    isEditing.value = false
    country.value = { name: '', description: ''}
}

function openEditModal(selectedCountry) {
    if (selectedCountry) {
        store.getCountry(selectedCountry)
    }
    isShowModal.value = true
    isEditing.value = true
}

const errMsg = ref(false)

function saveCountry(e) {
    e.preventDefault();

    if (validateForm()) {
        const action = isEditing.value ? 'updated' : 'created';
        const apiCall = isEditing.value ? store.updateCountry : store.createCountry
        apiCall({...country.value})
            .then(() => {
                store.notify({
                    type: 'success',
                    message: 'The country was successfully ' + action
                })
                closeModal()
                store.getCountries()
            })
            .catch((err) => {
                errMsg.value = err.response.data
                setTimeout(() => {
                    closeModal()
                    validationErr.value = false
                    errMsg.value = false
                }, 2000)
                store.getCountries()
            })
    } else {
        // isLoading.value = false
        setTimeout(() => {
            validationErr.value = false
        }, 2000)
    }
}



onBeforeMount(() => {
    store.getCountries()
})

</script>