<script setup lang="ts">
import type { Database } from '~/types/supabase'
definePageMeta({
  layout: 'main'
})
const client = useSupabaseClient<Database>()
const now = new Date().toLocaleDateString('en-US')
const { data: vagas } = await client
  .from('vagas')
  .select(`
    id,
    estudante:estudante_id(id, nome),
    servico:servico_id(id, nome),
    programa:programa_id(id, nome),
    inicio,
    fim
  `)
  .lte('inicio', now)
  .gte('fim', now)
console.log()
</script>
<template>
  <div>
    <Card>
      <template #title>
        <fa icon="fa-solid fa-calendar-check" class="mr-2" /> Vagas
      </template>
      <template #content>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Estudante
                </th>
                <th scope="col" class="px-6 py-3">
                  Serviço
                </th>
                <th scope="col" class="px-6 py-3">
                  Programa
                </th>
                <th scope="col" class="px-6 py-3">
                  Início
                </th>
                <th scope="col" class="px-6 py-3">
                  Fim
                </th>
                <th scope="col" class="px-6 py-3">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(vaga, id) in vagas" :key="id" class="odd:bg-white even:bg-gray-50">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <NuxtLink :to="`/estudante/${vaga.estudante.id}/`">
                    {{ vaga.estudante.nome }}
                  </NuxtLink>
                </th>
                <td class="px-6 py-4">
                  <NuxtLink :to="`/servico/${vaga.servico.id}`">
                    {{ vaga.servico.nome }}
                  </NuxtLink>
                </td>
                <td class="px-6 py-4">
                  <NuxtLink :to="`/programa/${vaga.programa.id}`">
                    {{ vaga.programa.nome }}
                  </NuxtLink>
                </td>
                <td class="px-6 py-4">
                  {{ formatDate(vaga.inicio) }}
                </td>
                <td class="px-6 py-4">
                  {{ formatDate(vaga.fim) }}
                </td>
                <td class="px-6 py-4">
                  <NuxtLink :to="`/vaga/${vaga.id}`" class="font-medium block text-blue-500">
                    <fa icon="fa-solid fa-edit" />
                  </NuxtLink>
                  <NuxtLink to="#" class="font-medium block text-red-500">
                    <fa icon="fa-solid fa-trash" />
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <template #footer>
        <NuxtLink to="/vaga/new"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          Criar Vaga</NuxtLink>
      </template>
    </Card>
  </div>
</template>
