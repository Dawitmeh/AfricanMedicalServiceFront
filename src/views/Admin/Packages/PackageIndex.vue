<template>
    <AdminPageComponent>
        <h2>Packages</h2>
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

onBeforeMount(() => {
    store.getPackages()
    productStore.getProducts()
})

</script>