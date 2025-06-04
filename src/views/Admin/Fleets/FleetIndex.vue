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
                Add Fleets
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
            <div class="relative" v-for="fleet in fleets" :key="fleet.id">
                <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div class="h-48 w-full overflow-hidden rounded-sm mb-2 shadow-sm">
                    <img :src="fleet.icon" alt="Flag of {{ fleet.name }}" class="w-full h-full object-cover shadow" v-if="fleet?.name" />
                </div>
                <div>
                    <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ fleet?.name }}</h5>
                </div>
                <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                    <li class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 me-2 text-green-500 dark:text-green-400 shrink-0">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                        </svg>

                        <legend> {{ fleet?.capacity }}</legend>
                    </li>
                    <li class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 me-2 text-green-500 dark:text-green-400 shrink-0">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>

                        <legend>{{ fleet?.country?.name }}</legend>
                    </li>
                    <li class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 me-2 text-green-500 dark:text-green-400 shrink-0">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>
                        <legend>{{ fleet?.classification }}</legend>
                    </li>
                    <li v-if="fleet?.Available == 1" class="flex items-center">
                            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 me-2 text-green-500 dark:text-green-400 shrink-0">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                            </svg>
                            <legend>{{ 'Available' }}</legend>
                    </li>
                    <li v-else class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 me-2 text-red-500 dark:text-red-400 shrink-0">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        <legend>{{ 'Unavailable' }}</legend>
                    </li>
                     <li v-if="fleet?.Active == 1" class="flex items-center">
                            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 me-2 text-green-500 dark:text-green-400 shrink-0">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                            </svg>
                            <legend>{{ 'Active' }}</legend>
                    </li>
                    <li v-else class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 me-2 text-red-500 dark:text-red-400 shrink-0">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        <legend>{{ 'Inactive' }}</legend>
                    </li>
                </ul>
                <div class="mt-3">
                <button @click="openEditModal(fleet.id)" class="inline-flex font-medium items-center text-blue-600 hover:underline">
                    Edit
                </button>
                <router-link v-if="fleet?.id" to="/" class="inline-flex float-right font-medium items-center text-theme-main hover:underline">
                    Detail
                    <svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                    </svg>
                </router-link>
                </div>
                
                </div>

            </div>
            
        </div>


        <!-- Modal -->
         <fwb-modal v-if="isShowModal" @close="closeModal">
            <template #header>
              <div class="flex items-center text-lg text-gray-700">
              {{ isEditing ? 'Edit Hospital' : 'Add Hospital' }}
              </div>
            </template>
            <template #body>
              <form @submit="saveFleet">
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
                                <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                                <select id="category" v-model="fleet.country_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Select country</option>
                                    <option v-for="country in countries" :key="country.id" :value="country.id">
                                        {{ country?.name }}
                                    </option>
                                </select>
                                <div v-if="validationErr.country_id" class="text-red-500 text-xs mt-1">
                                    {{ validationErr?.country_id[0] }}
                                </div>
                            </div> 
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fleet Name</label>
                                <input type="text" v-model="fleet.name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="">
                                <div v-if="validationErr.name" class="text-red-500 text-xs mt-1">
                                  {{ validationErr.name[0] }}
                                </div>
                            </div>
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Capacity</label>
                                <input type="text" v-model="fleet.capacity" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="">
                                <div v-if="validationErr.fleet" class="text-red-500 text-xs mt-1">
                                  {{ validationErr.fleet[0] }}
                                </div>
                            </div>
                            <div>
                                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea id="description" v-model="fleet.description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
                                <div v-if="validationErr.description" class="text-red-500 text-xs mt-1">
                                  {{ validationErr.description[0] }}
                                </div>
                            </div>
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-gray-700">
                                    Fleet Image
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
                                <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Classification</label>
                                <select id="category" v-model="fleet.classification" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="Ambulance">Ambulance</option>
                                    <option value="Helicopter">Helicopter</option>
                                    <option value="Jet">Jet</option>
                                </select>
                                <div v-if="validationErr.classification" class="text-red-500 text-xs mt-1">
                                    {{ validationErr?.classification[0] }}
                                </div>
                            </div> 
                            <div>
                                <label class="inline-flex items-center me-5 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        :value="fleet.Active" 
                                        class="sr-only peer"
                                        v-model="fleet.Active"
                                        :true-value="1"
                                        :false-value="0"
                                    >
                                    <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Active</span>
                                </label>
                            </div>
                            <div>
                                <label class="inline-flex items-center me-5 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        :value="fleet.Available" 
                                        class="sr-only peer"
                                        v-model="fleet.Available"
                                        :true-value="1"
                                        :false-value="0"
                                    >
                                    <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Available</span>
                                </label>
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
import { useFleetStore } from '@/stores/adminfleet';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { FwbButton, FwbModal } from 'flowbite-vue'


const store = useFleetStore()
const countryStore = useCountryStore()

const fleets = computed(() => store.fleets)
const countries = computed(() => countryStore.countries)
const notification = computed(() => store.notification)
const isLoading = computed(() => store.isLoading)


const fleet = ref({
    country_id: '',
    name: '',
    capacity: '',
    classification: '',
    icon: '',
    icon_url: '',
    Available: 1,
    Active: 1,
    description: ''
})

const isShowModal = ref(false)
const isEditing = ref(false)

const fileInput = ref([])
const selectedFiles = ref([])
const imagePreview = ref(null)


watch(() => store.currentFleet,
            (newVal, oldVal) => {
                if (newVal !== undefined) {
                    fleet.value = {
                        ...JSON.parse(JSON.stringify(newVal))
                    }
                }

                imagePreview.value = newVal.icon
                selectedFiles.value = null
            }
)

const validationErr = ref({})

function validateForm() {
    validationErr.value = {}

    if (!fleet.value.country_id) {
        validationErr.value.country_id = ['Country field is required']
    }
    if (!fleet.value.name) {
        validationErr.value.name = ['Fleet name is required']
    }
    if (!fleet.value.capacity) {
        validationErr.value.capacity = ['Capacity is required']
    }
    if (!fleet.value.classification) {
        validationErr.value.classification = ['Classification is required']
    }
    if (!fleet.value.description) {
        validationErr.value.description = ['Description is required']
    }

    return Object.keys(validationErr.value).length === 0;
}

function closeModal() {

    isShowModal.value = false
    isEditing.value = false
}

function showModal() {
    isShowModal.value = true
    isEditing.value = false
}

function openEditModal(selectedFleet) {
    if (selectedFleet) {
        store.getFleet(selectedFleet)
    }
    isShowModal.value = true
    isEditing.value = true
}


function onImageChoose(event) {
  const file = event.target.files[0]
  if (!file) return

  selectedFiles.value = file
  fleet.value.icon = file // send this to backend

  const reader = new FileReader()
  reader.onload = () => {
    imagePreview.value = reader.result
    fleet.value.icon_url = reader.result // preview only
    fleet.value.icon = reader.result
  }

  reader.readAsDataURL(file)
}

function removeFile() {
    selectedFiles.value = null
    imagePreview.value = null
    fleet.value.icon = null
    fleet.value.icon_url = null
}

const errMsg = ref(false)

function saveFleet(e) {
    e.preventDefault()

    if (validateForm()) {
        const action = isEditing.value ? 'updated' : 'created'
        const apiCall = isEditing.value ? store.updateFleet : store.createFleet
        apiCall({...fleet.value})
            .then(() => {
                store.notify({
                    type: 'success',
                    message: 'The fleet was successfully' + action
                })
                closeModal()
                store.getFleets()
            })
            .catch((err) => {
                errMsg.value = err.response.data
                setTimeout(() => {
                    closeModal()
                    validationErr.value = false
                    errMsg.value = false
                }, 2000)
                store.getFleets()
            })
    } else {
        setTimeout(() => {
            validationErr.value = false
        }, 2000)
    }
}

onBeforeMount(() => {
    store.getFleets()
    countryStore.getCountries()
})

</script>