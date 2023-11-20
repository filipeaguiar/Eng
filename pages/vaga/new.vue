<script setup lang="ts">
import type { Database } from '~/types/supabase'
definePageMeta({
  title: 'Criar Estudante',
  layout: 'main'
})
const client = useSupabaseClient<Database>()

const { data: instituicoes, error: errorInstituicoes } = await client.from('instituicoes').select('id, nome, programas(id, nome)')
const { data: servicos, error: erroServicos } = await client.from('servicos').select('id, nome')
const { data: programas, error: errorProgramas } = await client.from('programas').select('id, nome, instituicao_id')
const { data: estudantes, error: errorEstudantes } = await client.from('estudantes').select('id, nome, instituicao_id').eq('ativo', true)

const estudante = ref('')
const programa = ref('')
const instituicao = ref('')
const servico = ref('')
const inicio = ref('')
const fim = ref('')

const vaga = computed(() => {
  return {
    estudante_id: estudante.value,
    programa_id: programa.value,
    servico_id: servico.value,
    inicio: inicio.value,
    fim: fim.value
  }
})

const programasSelect = computed(() => {
  const filteredProgramas = programas.filter(programa => parseInt(programa.instituicao_id) === instituicao.value)
  return filteredProgramas
})

const estudantesSelect = computed(() => {
  const filteredEstudantes = estudantes.filter(estudante => estudante.instituicao_id === instituicao.value)
  return filteredEstudantes
})

async function setVaga(vaga) {
  const client = useSupabaseClient<Database>()
  const { data: savedVaga, error } = await client.from('vagas').insert(vaga)
  console.log(error?.message)
}

</script>
<template>
  <div>
    <Card>
      <template #title>
        <fa icon="fa-solid fa-calendar-check" /> Cadastrar Vaga
      </template>
      <template #content>
        <form @submit.prevent="setVaga(vaga)">
          <div class="mb-6">
            <label for="instituicao" class="block mb-2 text-sm font-medium text-gray-900">
              Instituição
            </label>
            <select id="instituicao" v-model.number="instituicao"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option v-for="instituicao in instituicoes" :value="instituicao.id">
                {{ instituicao.nome }}
              </option>
            </select>
          </div>
          <div class="mb-6" v-if="programasSelect">
            <label for="programa" class="block mb-2 text-sm font-medium text-gray-900">
              Programa
            </label>
            <select id="programa" v-model.number="programa"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option v-for="(programa, id) in programasSelect" :key="id" :value="programa.id">
                {{ programa.nome }}
              </option>
            </select>
          </div>
          <div class="mb-6">
            <label for="servico" class="block mb-2 text-sm font-medium text-gray-900">
              Servico
            </label>
            <select id="servico" v-model.number="servico"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option v-for="(servico, id) in servicos" :key="id" :value="servico.id">
                {{ servico.nome }}
              </option>
            </select>
          </div>
          <div class="mb-6">
            <label for="programa" class="block mb-2 text-sm font-medium text-gray-900">
              Estudante
            </label>
            <select id="estudante" v-model.number="estudante"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option v-for="(estudante, id) in estudantesSelect" :key="id" :value="estudante.id">
                {{ estudante.nome }}
              </option>
            </select>
          </div>
          <div class="mb-6">
            <div class="relative grid grid-cols-2 gap-4">
              <div>
                <label for="inicio">Início</label>
              <input datepicker type="date" id="inicio" v-model="inicio"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="Escolha uma Data">
              </div>
              <div>
                <label for="fim">Fim</label>
              <input datepicker type="date" id="fim" v-model="fim"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="Escolha uma Data">
              </div>
            </div>
          </div>
          <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Criar
          </button>
        </form>
      </template>
    </Card>
</div></template>
