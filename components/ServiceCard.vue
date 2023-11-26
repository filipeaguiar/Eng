<template>
    <NuxtLink :to="`/servico/${props.servico}`" :class="displayClass">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" :class="warning">
            <slot name="title" />
        </h5>
        <hr>
        <p class="font-normal text-right py-2 text-gray-700 dark:text-white" :class="warning">{{ props.preenchidas }}/{{ props.total }}</p>
    </NuxtLink>
</template>
<script setup lang="ts">
const name = "ServiceCard"
const props = defineProps({
    servico: Number,
    total: Number,
    preenchidas: Number
})

const displayClass = ref("")
const warning = ref("")
const blink = ref("")
if(props.total && props.preenchidas) {
    if(props.preenchidas < props.total){
        if(props.preenchidas >= (props.total - 2)) {
            displayClass.value = "block max-w-sm p-6 bg-yellow-300 border border-gray-200 rounded-lg shadow"
        }
        else {
            displayClass.value = "block max-w-sm p-6 bg-green-500 border border-gray-200 rounded-lg shadow dark"
        }
    }
    else if(props.preenchidas === props.total) {
        displayClass.value = "block max-w-sm p-6 bg-red-500 border border-gray-200 rounded-lg shadow dark"
        warning.value = "font-black"
    }
    else {
        displayClass.value = "block max-w-sm p-6 bg-red-500 border border-gray-200 rounded-lg shadow dark"
        warning.value = "font-black blink"
  }
}
else {
    displayClass.value = "block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow"
}
</script>  
<style scoped>
 .blink {
        animation: blink-animation 1s steps(5, start) infinite;
        -webkit-animation: blink-animation 1s steps(5, start) infinite;
      }
      @keyframes blink-animation {
        to {
          visibility: hidden;
        }
      }
      @-webkit-keyframes blink-animation {
        to {
          visibility: hidden;
        }
      }
</style>
