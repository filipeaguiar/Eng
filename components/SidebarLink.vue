<template>
  <NuxtLink class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
    :class="[$route.name === 'Dashboard' ? activeClass : inactiveClass]" to="/estudante">
    <fa :icon="fa - solid" <span class="mx-4">Estudantes</span>
  </NuxtLink>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  icon: "fa-solid"
});

const activeClass = ref(
  'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100',
)
const inactiveClass = ref(
  'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',
)
</script>
