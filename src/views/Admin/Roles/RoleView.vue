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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 -mt-1 inline-block">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
                {{ role?.name }} {{  'Role' }}
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
         <div v-else class="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
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
          <form @submit="assignPermission">
            <div class="mb-3">
            <!-- <input type="checkbox" id="checkAll">
            <label for="checkAll" class="ml-4"><strong>Check All</strong></label> -->

            <label class="inline-flex items-center me-5 cursor-pointer">
                <input 
                    type="checkbox" 
                    class="sr-only peer"
                    v-model="checkAll"
                    @change="toggleAllPermissions"
                >
                <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"><strong>Check All</strong></span>
            </label>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="permission in permissions" :key="permission.id" class="flex items-center mt-6">
                <input 
                    type="checkbox"
                    :id="'permission_' + permission.id"
                    :value="permission.id"
                    v-model="selectedPermissions"
                    :checked="rolePermissions[permission.id]"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                >
                <label :for="'permission_' + permission.id" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {{ permission?.name }}
                </label>
            </div>
            <div class="hidden">
              {{ roles.id = $route.params.id }}
            </div>
            </div>
            <button type="submit" class="mt-6 float-right bg-theme-main text-white px-4 py-2 rounded">Update Role</button>
          </form>
            
      </div>
    </AdminPageComponent>
</template>



<script setup>
import AdminPageComponent from '@/components/Admin/AdminPageComponent.vue';
import { useRoleStore } from '@/stores/roles';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';


const store = useRoleStore()
const route = useRoute()


const role = computed(() => store.currentRole)
const notification = computed(() => store.notification)
const isLoading = computed(() => store.isLoading)
const rolePermissions = computed(() => store.rolePermissions)
const permissions = computed(() => store.permissions)


const selectedPermissions = ref([])
const checkAll = ref(false)

const roles = ref({
  permission: [],
  id: ''
})

// const toggleAllPermissions = () => {
//   if (checkAll.value) {
//     selectedPermissions.value = permissions.value.map(p => p.name)
//     roles.value.permission = selectedPermissions.value
//   } else {
//     selectedPermissions.value = []
//   }
// }

// watch(selectedPermissions, (newVal) => {
//   checkAll.value = newVal.length === permissions.value.length
// })

watch([permissions, rolePermissions], ([perms, rolePerms]) => {
  if (perms.length && rolePerms) {
    selectedPermissions.value = perms
      .filter(perm => rolePerms[perm.id]) // if rolePermissions contains this id
      .map(perm => perm.id);
  }
}, { immediate: true });

const toggleAllPermissions = () => {
  if (checkAll.value) {
    selectedPermissions.value = permissions.value.map(p => p.id);
    roles.value.permission = selectedPermissions.value;
  } else {
    selectedPermissions.value = []
    roles.value.permission = []
  }
}

watch(selectedPermissions, (newVal) => {
  checkAll.value = newVal.length === permissions.value.length;
  roles.value.permission = newVal;
});

const errMsg = ref(false)

function assignPermission(e) {
  e.preventDefault()

  store.updateRolePermission({...roles.value})
    .then((res) => {
      store.notify({
        type: 'success',
        message: 'The role permission was successfully assigned'
      })
      store.getRolePermissions(route.params.id)
      store.getRole(route.params.id)
    })
    .catch((err) => {
      errMsg.value = err.response.data
      setTimeout(() => {
        errMsg.value = false
      }, 3000)
      store.getRolePermissions(route.params.id)
      store.getRole(route.params.id)
    })
}

onBeforeMount(() => {
  if (route.params.id) {
    roles.value.id = route.params.id
    store.getRole(route.params.id)
    store.getRolePermissions(route.params.id)
  }
})
</script>