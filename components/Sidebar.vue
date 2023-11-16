<script setup lang="ts">
import { ref } from 'vue'

const { isOpen } = useSidebar()
const activeClass = ref(
  'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100',
)
const inactiveClass = ref(
  'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',
)
</script>

<template>
  <div class="flex">
    <!-- Backdrop -->
    <div :class="isOpen ? 'block' : 'hidden'" class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
      @click="isOpen = false" />
    <!-- End Backdrop -->

    <div :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0">
      <div class="flex items-start justify-start mt-8">
        <NuxtLink to="/dashboard">
          <div class="flex items-center px-6">
            <span class="text-blue-500 text-4xl">
              <fa icon="fa-solid fa-hospital" />
            </span>
            <span class="mx-4 text-2xl font-semibold text-white">SGV-GEP</span>
          </div>
        </NuxtLink>
      </div>

      <nav class="mt-10">
        <NuxtLink class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'estudante' ? activeClass : inactiveClass]" to="/estudante">
          <fa icon="fa-solid fa-graduation-cap" />
          <span class="mx-4">Estudantes</span>
        </NuxtLink>
        <NuxtLink class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'colaborador' ? activeClass : inactiveClass]" to="/colaborador">
          <fa icon="fa-solid fa-user" />
          <span class="mx-4">Colaboradores</span>
        </NuxtLink>
        <NuxtLink class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'servico' ? activeClass : inactiveClass]" to="/servico">
          <fa icon="fa-solid fa-house-chimney-medical" />
          <span class="mx-4">Serviço</span>
        </NuxtLink>
        <NuxtLink class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'instituicao' ? activeClass : inactiveClass]" to="/instituicao">
          <fa icon="fa-solid fa-building-columns" />
          <span class="mx-4">Instituição</span>
        </NuxtLink>
        <NuxtLink class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'vaga' ? activeClass : inactiveClass]" to="/vaga">
          <fa icon="fa-solid fa-calendar-check" />
          <span class="mx-4">Vagas</span>
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>
