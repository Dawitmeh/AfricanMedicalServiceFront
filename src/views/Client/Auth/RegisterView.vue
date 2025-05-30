<template>
     <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
          African Medical Service    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <div v-if="isLoading" class="text-center">
                <div role="status">
                        <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    </div>
                </div>
              <div v-if="errMsg != false">
                <div id="alert-border-2" class="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
                    <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <div  class="ml-3 text-sm font-medium">
                    <li v-for="err in errMsg" :key="err">
                        {{ err }}
                    </li>
                    </div>
                </div>
              </div>
              <form @submit="Register" class="space-y-4 md:space-y-6 w-full" action="#">
                <div class="grid gap-6 mb-6 md:grid-cols-2 max-w-lg">
                    <div>
                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                    <input type="text" v-model="user.first_name" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="">
                    <div v-if="validationErr.first_name" class="text-red-500 text-xs mt-1">
                        {{ validationErr.first_name[0] }}
                    </div>
                    </div>
                    <div>
                        <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                        <input  v-model="user.last_name" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="">
                        <div v-if="validationErr.last_name" class="text-red-500 text-xs mt-1">
                            {{ validationErr.last_name[0] }}
                        </div>
                    </div> 
                        <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" v-model="user.email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                        <div v-if="validationErr.email" class="text-red-500 text-xs mt-1">
                            {{ validationErr.email[0] }}
                        </div>
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                        <input  v-model="user.age" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="">
                        <div v-if="validationErr.age" class="text-red-500 text-xs mt-1">
                            {{ validationErr.age[0] }}
                        </div>
                    </div>
                    
                </div>
                
                 <div>
                        <label for="phone_number" class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                        
                        <div class="flex">
                            <!-- Prefix Dropdown -->
                            <select v-model="user.country_code"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg px-1 py-2.5 flex items-center dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500">
                            <option v-for="country in countries" :value="country.code">{{ country.code }}</option>
                            </select>

                            <!-- Phone Input -->
                            <input
                            type="number"
                            v-model="user.phone"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 flex-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Phone number"
                            />
                        </div>

                        <!-- Validation Error -->
                        <div v-if="validationErr.phone" class="text-red-500 text-xs mt-1">
                            {{ validationErr.phone[0] }}
                        </div>
                    </div>
                 <div class="grid gap-6 mb-6 md:grid-cols-2 max-w-lg">
                   
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" v-model="user.password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <div v-if="validationErr.password" class="text-red-500 text-xs mt-1">
                        {{ validationErr.password[0] }}
                    </div>
                   </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="password" v-model="user.password_confirmation" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                       <div v-if="validationErr.password_confirmation" class="text-red-500 text-xs mt-1">
                            {{ validationErr.password_confirmation[0] }}
                        </div> 
                  </div>
                 </div>
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" >
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <router-link :to="{name: 'Login'}" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</router-link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
</template>



<script setup>
import { useClientStore } from '@/stores/clients';
import { computed, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';



const store = useClientStore()
const router = useRouter()

const countries = computed(() => store.countries)


const user = ref({
    first_name: '',
    last_name: '',
    age: '',
    country_code: '',
    email: '',
    phone: '',
    image: '',
    password: '',
    password_confirmation: ''
})

const errMsg = ref([])

const validationErr = ref({})

function validateForm() {
    if (!user.value.first_name) {
        validationErr.value.first_name = ['First name is required']
    }
    if (!user.value.last_name) {
        validationErr.value.last_name = ['Last name is required']
    }
    if (!user.value.email) {
        validationErr.value.email = ['Email address is required']
    }
    if (!user.value.age) {
        validationErr.value.age = ['Age field is required']
    }
    if (!user.value.phone) {
        validationErr.value.phone = ['Phone number is required']
    }
    if (!user.value.country_code) {
        validationErr.value.country_code = ['Country code is required']
    }
    if (!user.value.password) {
        validationErr.value.password = ['Password is required']
    }
    if (!user.value.password_confirmation) {
        validationErr.value.password_confirmation = ['Password confirmation is required']
    }

    return Object.keys(validationErr.value).length === 0
}

const isLoading = ref(false)

function Register(e) {
    e.preventDefault()
    if (validateForm()) {
        isLoading.value = true

        store.register({...user.value})
            .then(() => {
                router.push({ name: 'ClientDashboard'})
            })
            .catch((err) => {
                errMsg.value = err.response.data
                setTimeout(() => {
                    errMsg.value = false
                }, 5000)
                isLoading.value = false
            })
    } else {
        isLoading.value = false
        setTimeout(() => {
            validationErr.value = {}
        }, 4000)
    }
}


onBeforeMount(() => {
    store.getCountries()
})

</script>