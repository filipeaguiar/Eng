<script setup lang="ts">
definePageMeta({
  layout: 'main'
})
const client = useSupabaseClient()

const { data: servicos, error: servicos_error } = await client.from('servicos').select('id,nome,numerovagas, medico:medicoresponsavel(id, nome), enfermeiro:enfermeiroresponsavel(id, nome)')

const role = await useRole()

function nomeServico(id: number, servicos: [{ "id": number, "nome": string }]) {
  let nome = ''
  servicos.forEach((servico) => {
    if (servico.id == id) {
      nome = servico.nome
    }
  })
  return nome
}

</script>
<template>
  <div>
    <Card>
      <template #title>
        <fa icon="fa-solid fa-house-chimney-medical" class="mr-2" /> Serviços
        <UColorModeToggle />
      </template>
      <template #content>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Serviço
                </th>
                <th scope="col" class="px-6 py-3">
                  Médico Responsável
                </th>
                <th scope="col" class="px-6 py-3">
                  Enfermeiro Responsável
                </th>
                <th scope="col" class="px-6 py-3">
                  Vagas
                </th>
                <th scope="col" class="px-6 py-3">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(servico, id) in servicos" :key="id" class="odd:bg-white even:bg-gray-50">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <NuxtLink :to="`/servico/${servico.id}/`">
                    {{ servico.nome }}
                  </NuxtLink>
                </th>
                <td class="px-6 py-4 text-center">
                  <div class="grid grid-cols-2">
                      {{ formatName(servico.medico?.nome) }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  {{ formatName(servico.enfermeiro?.nome) }}
                </td>
                <td class="px-6 py-4">
                  {{ servico.numerovagas }}
                </td>
                <td>
                  <div class="grid grid-cols-2">
                    <NuxtLink :to="`/estudante/${servico.id}/edit`" class="font-medium block text-blue-500">
                      <fa icon="fa-solid fa-edit" />
                    </NuxtLink>
                    <NuxtLink to="#" class="font-medium block text-red-500">
                      <fa icon="fa-solid fa-trash" />
                    </NuxtLink>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <template #footer>
        <NuxtLink to="/servico/new"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          v-if="role === 'Administrador'">
          <fa icon="fa-solid fa-plus" />
          Novo Serviço
        </NuxtLink>
      </template>
    </Card>
  </div>
</template>
