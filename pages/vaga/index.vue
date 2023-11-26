<script setup lang="ts">
import type { Database } from '~/types/supabase'
definePageMeta({
  layout: 'main'
})
const client = useSupabaseClient<Database>()
const now = new Date().toLocaleDateString('en-US')
const role = await useRole()
const { data: vagas } = await client
  .from('vagas')
  .select(`
    id,
    estudante:estudante_id(id, nome),
    servico:servico_id(id, nome),
    programa:programa_id(id, nome),
    ativo,
    inicio,
    fim
  `)
  .lte('inicio', now)
  .gte('fim', now)

const reactiveVagas = ref(vagas)
const pendingVagas = computed(() => {
  return reactiveVagas.value?.filter(vaga => vaga?.ativo === false)
})

const activeVagas = computed(() => {
  return reactiveVagas.value?.filter(vaga => vaga?.ativo === true)
})

const activateVaga = async (id: number) => {
  const client = useSupabaseClient<Database>()
  const { data, error } = await client
    .from('vagas')
    .update({ ativo: true })
    .eq('id', id)
  const newData = await client
    .from('vagas')
    .select(`
    id,
    estudante:estudante_id(id, nome),
    servico:servico_id(id, nome),
    programa:programa_id(id, nome),
    ativo,
    inicio,
    fim
  `)
    .lte('inicio', now)
    .gte('fim', now)
  reactiveVagas.value = newData.data
}

const deactivateVaga = async (id: number) => {
  const client = useSupabaseClient<Database>()
  const { data, error } = await client
    .from('vagas')
    .update({ ativo: false })
    .eq('id', id)
  const newData = await client
    .from('vagas')
    .select(`
    id,
    estudante:estudante_id(id, nome),
    servico:servico_id(id, nome),
    programa:programa_id(id, nome),
    ativo,
    inicio,
    fim
  `)
    .lte('inicio', now)
    .gte('fim', now)
  reactiveVagas.value = newData.data
}

</script>
<template>
  <div>
    <Card>
      <template #title>
        <fa icon="fa-solid fa-calendar-check" class="mr-2" /> Vagas
      </template>
      <template #content>
        <div v-if="role === 'Administrador'">
          <h5 class="font-bold mb-4">Pendentes de Aprovação</h5>
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
                  <th scope="col" class="px-6 py-3" v-if="role === 'Administrador'">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(vaga, id) in pendingVagas" :key="id" class="odd:bg-white even:bg-gray-50">
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
                    <span v-if="vaga.programa">
                      <NuxtLink :to="`/programa/${vaga.programa.id}`">
                        {{ vaga.programa.nome }}
                      </NuxtLink>
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    {{ formatDate(vaga.inicio) }}
                  </td>
                  <td class="px-6 py-4">
                    {{ formatDate(vaga.fim) }}
                  </td>
                  <td class="px-6 py-4">
                    <NuxtLink class="font-medium block text-green-500" @click="activateVaga(vaga.id)" to="/vaga">
                      <fa icon="fa-solid fa-link" />
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <h5 class="font-bold my-4" v-if="activeVagas?.length > 0">Vagas Alocadas</h5>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg" v-if="activeVagas?.length > 0">
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
                <th scope="col" class="px-6 py-3" v-if="role === 'Administrador'">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(vaga, id) in activeVagas" :key="id" class="odd:bg-white even:bg-gray-50">
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
                  <span v-if="vaga.programa">
                    <NuxtLink :to="`/programa/${vaga.programa.id}`">
                      {{ vaga.programa.nome }}
                    </NuxtLink>
                  </span>
                </td>
                <td class="px-6 py-4">
                  {{ formatDate(vaga.inicio) }}
                </td>
                <td class="px-6 py-4">
                  {{ formatDate(vaga.fim) }}
                </td>
                <td class="px-6 py-4" v-if="role === 'Administrador'">
                  <NuxtLink to="#" class="font-medium block text-red-500" @click="deactivateVaga(vaga.id)">
                    <fa icon="fa-solid fa-cancel" />
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <template #footer>
        <NuxtLink to="/vaga/new"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          v-if="(role === 'Administrador') || role === 'Chefia'">
          <fa icon="fa-solid fa-link" /> Solicitar Alocação
        </NuxtLink>
      </template>
    </Card>
  </div>
</template>
