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
                Add Staffs
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
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Phone number
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(staff, index) in staffs" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <!-- <img class="w-10 h-10 rounded-full" :src="client?.image" alt="Jese image"> -->
                            <div class="ps-3">
                                <div class="text-base font-semibold">{{ staff?.name }}</div>
                                <!-- <div class="font-normal text-gray-500">neil.sims@flowbite.com</div> -->
                            </div>  
                        </th>
                        <td class="px-6 py-4">
                            {{ staff?.phone }} 
                        </td>
                        <td class="px-6 py-4">
                            {{ staff?.email }} 
                        </td>
                        <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              <div v-for="role in staff?.roles" class="flex items-center">
                                  
                                  <span class="ml-1 text-gray-500 dark:text-gray-400">{{role?.name}},</span>
                              </div>
                          </td>
                        <td class="px-6 py-4">
                            <!-- Modal toggle -->
                            <button @click="openEditModal(staff.id)" type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                            <!-- <router-link v-if="staff?.id" :to="{name: 'AdminStaffView', params: {id: staff.id}}" class="inline-flex ml-3 font-medium items-center text-theme-main hover:underline">
                                Detail
                                <svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                                </svg>
                            </router-link> -->
                            <!-- <button @click="onRemove(staff?.id)" class="ml-6 inline-flex font-medium items-center text-red-600 hover:underline">
                                Remove
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button> -->
                            <button @click="showDeleteModal(staff.id)" class="ml-6 inline-flex font-medium items-center text-red-600 hover:underline">
                                Remove
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                           
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modale -->
         <fwb-modal v-if="isShowModal" @close="closeModal">
            <template #header>
              <div class="flex items-center text-lg text-gray-700">
              {{ isEditing ? 'Edit Staff' : 'Add Staff' }}
              </div>
            </template>
            <template #body>
              <form @submit="saveStaff">
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
                                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" v-model="staff.name" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="">
                                <div v-if="validationErr.name" class="text-red-500 text-xs mt-1">
                                    {{ validationErr.name[0] }}
                                </div>
                                </div> 
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" v-model="staff.email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                                    <div v-if="validationErr.email" class="text-red-500 text-xs mt-1">
                                        {{ validationErr.email[0] }}
                                    </div>
                                </div>
                                <div>
                                    <label for="phone_number" class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                    
                                    <div class="flex">
                                        <!-- Prefix Dropdown -->
                                        <select v-model="staff.country_code"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg px-1 py-2.5 flex items-center dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500">
                                        <option v-for="country in countries" :value="country.code">{{ country.code }}</option>
                                        </select>

                                        <!-- Phone Input -->
                                        <input
                                        type="text"
                                        v-model="staff.phone"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 flex-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Phone number"
                                        />
                                    </div>
                                    
                                    <!-- Validation Error -->
                                    <div v-if="validationErr.phone" class="text-red-500 text-xs mt-1">
                                        {{ validationErr.phone[0] }}
                                    </div>
                                     <div v-if="validationErr.country_code" class="text-red-500 text-xs mt-1">
                                        {{ validationErr.country_code[0] }}
                                    </div>
                                </div>
                                <div>
                                    <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                                    <select multiple id="category" v-model="staff.role" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option selected="">Select country</option>
                                        <option v-for="role in roles" :key="role.id" :value="role.name">
                                            {{ role?.name }}
                                        </option>
                                    </select>
                                    <div v-if="validationErr.role" class="text-red-500 text-xs mt-1">
                                        {{ validationErr?.role[0] }}
                                    </div>
                                </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" v-model="staff.password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <div v-if="validationErr.password" class="text-red-500 text-xs mt-1">
                                    {{ validationErr.password[0] }}
                                </div>
                            </div>
                            <div>
                                <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input type="password" v-model="staff.password_confirmation" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <div v-if="validationErr.password_confirmation" class="text-red-500 text-xs mt-1">
                                        {{ validationErr.password_confirmation[0] }}
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


        <!-- Modal3 -->
          <FwbModal v-if="isShowModal2" @close="closeDeleteModal">
            <template #header>
                <div class="text-lg font-semibold text-gray-700 dark:text-white">
                    Confirm Deletion
                </div>
                </template>
                <template #body>
                <div v-if="isLoading" class="text-center">
                    <div role="status">
                        <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    </div>
                </div>
                <div v-else class="text-center p-4">
                    <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this staff member?
                    </h3>
                    <div class="flex justify-center gap-4">
                     <button @click="onRemove(deleteId)" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5">
                        Yes, I'm sure
                     </button>
                     <button @click="closeDeleteModal" class="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white">
                        No, cancel
                     </button>
                </div>
                </div>
            </template>
            </FwbModal>
    </AdminPageComponent>
</template>


<script setup>
import AdminPageComponent from '@/components/Admin/AdminPageComponent.vue';
import { useCountryStore } from '@/stores/admincountry';
import { useAdminStaffStore } from '@/stores/adminstaff';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { FwbButton, FwbModal } from 'flowbite-vue'
import { useRoleStore } from '@/stores/roles';

const store = useAdminStaffStore()
const countryStore = useCountryStore()
const roleStore = useRoleStore()

const isLoading = computed(() => store.isLoading)
const notification = computed(() => store.notification)
const staffs = computed(() => store.staffs)
const countries = computed(() => countryStore.countries)
const roles = computed(() => roleStore.roles)

const staff = ref({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    country_code: '',
    role: []
})

const isShowModal = ref(false)
const isEditing = ref(false)
const isShowModal2 = ref(false)

const deleteId = ref(null)

function showDeleteModal(id) {
  deleteId.value = id
  isShowModal2.value = true
}

function closeDeleteModal() {
    isShowModal2.value = false
}

watch(() => store.currentStaff,
            (newVal, oldVal) => {
                if (newVal !== undefined) {
                    const cloned = JSON.parse(JSON.stringify(newVal))

                    // Remove '+251' from phone number
                    if (cloned.phone && cloned.phone.startsWith('+251')) {
                        cloned.phone = cloned.phone.replace('+251', '')
                    }
                    staff.value = {
                        ...cloned
                    }
                }
            }
)

const validationErr = ref({})

const errMsg = ref([])


function validateForm() {
    validationErr.value = {}

    if (!staff.value.name) {
        validationErr.value.name = ['Name is required']
    }
    if (!staff.value.email) {
        validationErr.value.email = ['Email is required']
    }
    if (!staff.value.phone) {
        validationErr.value.phone = ['Phone is required']
    }
    if (!staff.value.role) {
        validationErr.value.role = ['Role is required']
    }
    if (!staff.value.password && !isEditing.value) {
        validationErr.value.password = ['Password is required']
    }
    if (!staff.value.password_confirmation && !isEditing.value) {
        validationErr.value.password_confirmation = ['Password confirmation is required']
    }
    if (!staff.value.country_code) {
        validationErr.value.country_code = ['Country code is required']
    }
    
    return Object.keys(validationErr.value).length === 0
}

function closeModal() {
    isShowModal.value = false
    isEditing.value = false
    staff.value = {
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        country_code: '',
        role: []
    }
}

function showModal() {
    isShowModal.value = true
    isEditing.value = false
    staff.value = {
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        country_code: '',
        role: []
    }
}

function openEditModal(selectedStaff) {
    if (selectedStaff) {
        store.getStaff(selectedStaff)
    }
    isShowModal.value = true
    isEditing.value = true
} 

function saveStaff(e) {
    e.preventDefault()

    if (validateForm()) {
        const action = isEditing.value ? 'update' : 'created'
        const apiCall = isEditing.value ? store.updateStaff : store.createStaff
        apiCall({...staff.value}) 
            .then(() => {
                store.notify({
                    type: 'success',
                    message: 'The staff was successfully ' + action
                })
                closeModal()
                store.getStaffs()
                countryStore.getCountries()
            })
            .catch((err) => {
                errMsg.value = err.response.data
                setTimeout(() => {
                    closeModal()
                    validationErr.value = false
                    errMsg.value = false
                }, 3000)
                store.getStaffs()
                countryStore.getCountries()
            })
    } else {
        setTimeout(() => {
            validationErr.value = false
        }, 3000)
    }
}

function onRemove(staffId) {
    store.deleteStaff(staffId)
            .then((res) => {
                store.notify({
                    type: 'success',
                    message: 'The staff was successfully deleted'
                })
                store.getStaffs()
                closeDeleteModal()
            })
}


onBeforeMount(() => {
    store.getStaffs()
    countryStore.getCountries()
    roleStore.getRoles()
})
</script>