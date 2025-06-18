<template>
    <AdminPageComponent>
        <h1>Hospital Detail</h1>
    </AdminPageComponent>
</template>


<script setup>
import AdminPageComponent from '@/components/Admin/AdminPageComponent.vue';
import { useHospitalStore } from '@/stores/adminhospital';
import { computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';


const store = useHospitalStore()
const route = useRoute()



const hospital = computed(() => store.currentHospital)



onBeforeMount(() => {
    if (route.params.id) {
        store.getHospital(route.params.id)
    }
})


</script>