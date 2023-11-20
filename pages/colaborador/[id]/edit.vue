<script setup lang="ts" >
import type { Database } from '~/types/supabase'

definePageMeta({
  title: 'Editar Estudante',
  layout: 'main',
})

const route = useRoute()
const client = useSupabaseClient<Database>()
const { data: databaseEstudante, error: estudante_error } = await client.from('estudantes').select('*')
  .eq('id', route.params.id).single()

const { data: instituicoes, error: errorInstituicoes } = await client.from('instituicoes').select('id, nome')

interface Estudante {
  id?: number,
  nome: string,
  cpf: string,
  matricula: string,
  periodo: number,
  observacao?: string,
  cns?: string,
  cbo?: string,
  conselho?: string,
  curso?: string,
  residente?: boolean,
  instituicao_id: number
}

const estudante = reactive({
  id: databaseEstudante?.id,
  nome: databaseEstudante?.nome || '',
  cpf: databaseEstudante?.cpf || '',
  matricula: databaseEstudante?.matricula || '',
  periodo: databaseEstudante?.periodo || 0,
  observacao: databaseEstudante?.observacao || '',
  cns: databaseEstudante?.cns || '',
  conselho: databaseEstudante?.conselho || '',
  curso: databaseEstudante?.curso || '',
  residente: databaseEstudante?.residente || false,
  cbo: databaseEstudante?.cbo || '',
  instituicao_id: databaseEstudante?.instituicao_id || 0
})

async function setEstudante(estudante: Estudante) {
  const client = useSupabaseClient<Database>()
  const { data: savedEstudante, error } = await client
    .from('estudantes')
    .upsert({
      id: estudante.id,
      nome: estudante.nome,
      cpf: estudante.cpf,
      cbo: estudante.cbo,
      cns: estudante.cns,
      curso: estudante.curso,
      periodo: estudante.periodo,
      conselho: estudante.conselho,
      matricula: estudante.matricula,
      residente: estudante.residente,
      observacao: estudante.observacao,
      instituicao_id: estudante.instituicao_id
    })
  navigateTo(`/estudante/${estudante.id}`)
  console.log(savedEstudante || error)
}
const link = `/estudante/${estudante.id}/`
</script>
<template>
  <div>
    <Card>
      <template #title>
        Editar: {{ estudante.nome }} 
      </template>
      <template #content>
        <form @submit.prevent="setEstudante(estudante)">
          <input type="hidden" v-model="estudante.id">
          <div class="mb-6">
            <label for="instituicao" class="block mb-2 text-sm font-medium text-gray-900">
              Instituição
            </label>
            <select id="instituicao" v-model.number="estudante.instituicao_id"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option v-for="instituicao in instituicoes" :value="instituicao.id">
                {{ instituicao.nome }}
              </option>
            </select>
          </div>
          <div class="mb-6">
            <label for="nome" class="block mb-2 text-sm font-medium text-gray-900">Nome</label>
            <input type="text" id="nome" v-model="estudante.nome"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Nome do Estudante" required>
          </div>
          <div class="mb-6">
            <label for="cpf" class="block mb-2 text-sm font-medium text-gray-900">CPF</label>
            <input type="text" id="cpf" v-model="estudante.cpf"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="CPF" required>
          </div>
          <div class="mb-6">
            <label for="matricula" class="block mb-2 text-sm font-medium text-gray-900">Matrícula</label>
            <input type="text" id="matricula" v-model="estudante.matricula"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="matricula" required>
          </div>
          <div class="mb-6">
            <label for="curso" class="block mb-2 text-sm font-medium text-gray-900">Curso</label>
            <input type="text" id="curso" v-model="estudante.curso"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Curso">
          </div>
          <div class="mb-6">
            <label for="observacao" class="block mb-2 text-sm font-medium text-gray-900">
              Observação
            </label>
            <textarea id="observacao" rows="4" v-model="estudante.observacao"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder=""></textarea>
          </div>
          <div class="mb-6">
            <label for="periodo" class="block mb-2 text-sm font-medium text-gray-900">Período</label>
            <input type="number" id="periodo" v-model="estudante.periodo"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="" required>
          </div>
          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input id="residente" type="checkbox" v-model="estudante.residente"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800">
            </div>
            <label for="residente" class="ms-2 text-sm font-medium text-gray-900">Residente</label>
          </div>
          <div v-if="estudante.residente">
            <div class="mb-6">
              <label for="cns" class="block mb-2 text-sm font-medium text-gray-900">Cartão SUS</label>
              <input type="text" id="cns" v-model="estudante.cns"
                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Cartão SUS" required>
            </div>
            <div class="mb-6">
              <label for="cbo" class="block mb-2 text-sm font-medium text-gray-900">CBO</label>
              <input type="text" id="cbo" v-model="estudante.cbo"
                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Ocupação" required>
            </div>
            <div class="mb-6">
              <label for="conselho" class="block mb-2 text-sm font-medium text-gray-900">Número do Conselho</label>
              <input type="text" id="conselho" v-model="estudante.conselho"
                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Número do Conselho" required>
            </div>
          </div>
          <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Salvar
          </button>
          <NuxtLink :to="link">
            <button type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
             ir para 
            </button>
          </NuxtLink>
        </form>
      </template>
    </Card>
  </div>
</template>
