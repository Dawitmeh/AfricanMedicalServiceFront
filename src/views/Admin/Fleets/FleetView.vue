<template>
    <AdminPageComponent>
        <h2>Fleet detail</h2>
    </AdminPageComponent>
</template>



<script setup>
import AdminPageComponent from '@/components/Admin/AdminPageComponent.vue';
import { useFleetStore } from '@/stores/adminfleet';
import { computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';



const store = useFleetStore()
const route = useRoute()



const fleet = computed(() => store.currentFleet)
const isLoading = computed(() => store.isLoading)
const notification = computed(() => store.notification)


onBeforeMount(() => {
    if (route.params.id) {
        store.getFleet(route.params.id)
    }
})
</script>