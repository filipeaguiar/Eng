<script setup lang="ts">
import { z } from 'zod'
import type { Database } from '~/types/supabase'
import type { FormSubmitEvent } from '#ui/types';
import type { UTextarea } from '#build/components';

definePageMeta({
  title: 'Criar Estudante',
  layout: 'main'
})
const client = useSupabaseClient<Database>()

const nome = ref('')
const cpf = ref('')
const matricula = ref('')
const periodo = ref(1)
const observacao = ref('')
const cns = ref('')
const conselho = ref('')
const curso = ref('')
const residente = ref(false)
const cbo = ref('')
const instituicao = ref('')

interface Estudante {
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

const state = reactive({
  nome: '',
  cpf: '',
  periodo: 0,
  observacao: '',
  cns: '',
  conselho: '',
  curso: '',
  residente: false,
  cbo: '',
  instituicao_id: 0
})

const validate = (state: any) => {
  console.log(state)
  return 'valid'
}

const schema = z.object({
  nome: z.string({ required_error: 'Nome é obrigatório' }).min(3, { message: "O nome deve ter pelo menos 3 caracteres" }).max(255),
  cpf: z.string({ required_error: 'CPF é obrigatório' }).length(11, { message: "O CPF deve ter 11 caracteres" }),
  periodo: z.number({ required_error: 'Período é obrigatório' }).min(1, { message: "O período deve ser maior que 0" }).max(12),
  observacao: z.string().max(200, { message: "A observação deve ter no máximo 200 caracteres" }),
  cns: z.string().length(15, { message: "O CNS deve ter 15 caracteres" }),
  conselho: z.string()
    .min(4, {message: "O número do conselhor deve ter no mínimo 4 caracteres"})
    .max(11, { message: "O número do conselho deve ter 11 caracteres" }),
  curso: z.string({ required_error: 'Curso é obrigatório' }).min(3, { message: "O curso deve ter no mínimo 3 caracteres" }).max(255),
})

const estudante = computed((): Estudante => {
  return {
    nome: nome.value,
    cpf: cpf.value,
    matricula: matricula.value,
    periodo: periodo.value,
    observacao: observacao.value,
    cns: cns.value,
    conselho: conselho.value,
    curso: curso.value,
    residente: residente.value,
    cbo: cbo.value,
    instituicao_id: parseInt(instituicao.value)
  }
})

async function setEstudante(estudante: Estudante) {
  const client = useSupabaseClient<Database>()
  const { data: savedEstudante, error } = await client.from('estudantes').insert(estudante)
  console.log(error)
}

const { data: instituicoes, error: errorInstituicoes } = await client.from('instituicoes').select('id, nome')
</script>
<template>
  <div>
    <Card>
      <template #title>
        Novo Estudante
      </template>
      <template #content>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="validate">
          <USelect v-model="state.instituicao_id" :options="instituicoes as unknown[]" option-attribute="nome"
            value-attribute="id"></USelect>

          <UFormGroup label="Nome" name="nome">
            <UInput v-model="state.nome" />
          </UFormGroup>

          <UFormGroup label="CPF" name="cpf">
            <UInput v-model="state.cpf" />
          </UFormGroup>

          <UFormGroup label="Curso" name="curso">
            <UInput v-model="state.curso" />
          </UFormGroup>

          <UFormGroup label="Observação" name="observacao">
            <UTextarea v-model="state.observacao" type="textarea" />
          </UFormGroup>

          <UFormGroup label="Período" name="periodo">
            <UInput v-model="state.periodo" type="number" />
          </UFormGroup>

          <UFormGroup label="Residente" name="residente">
            <UCheckbox v-model="state.residente" />
          </UFormGroup>

          <div v-if="state.residente">
            <UFormGroup label="Cartão SUS" name="cns">
              <UInput v-model="state.cns" />
            </UFormGroup>

            <UFormGroup label="CBO" name="cbo">
              <UInput v-model="state.cbo" />
            </UFormGroup>

            <UFormGroup label="Número do Conselho" name="conselho">
              <UInput v-model="state.conselho" />
            </UFormGroup>
          </div>
          <UButton type="submit">
            Salvar
          </UButton>
        </UForm>
        <form @submit.prevent="setEstudante(estudante)">
          <div class="mb-6">
            <label for="instituicao" class="block mb-2 text-sm font-medium text-gray-900">
              Instituição
            </label>
            <select id="instituicao" v-model.number="instituicao"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option v-for="instituicao in instituicoes">
                {{ instituicao.nome }}
              </option>
            </select>
          </div>
          <div class="mb-6">
            <label for="nome" class="block mb-2 text-sm font-medium text-gray-900">Nome</label>
            <input type="text" id="nome" v-model="nome"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Nome do Estudante" required>
          </div>
          <div class="mb-6">
            <label for="cpf" class="block mb-2 text-sm font-medium text-gray-900">CPF</label>
            <input type="text" id="cpf" v-model="cpf"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="CPF" required>
          </div>
          <div class="mb-6">
            <label for="matricula" class="block mb-2 text-sm font-medium text-gray-900">Matrícula</label>
            <input type="text" id="matricula" v-model="matricula"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="matricula" required>
          </div>
          <div class="mb-6">
            <label for="curso" class="block mb-2 text-sm font-medium text-gray-900">Curso</label>
            <input type="text" id="curso" v-model="curso"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Curso" required>
          </div>
          <div class="mb-6">
            <label for="observacao" class="block mb-2 text-sm font-medium text-gray-900">
              Observação
            </label>
            <textarea id="observacao" rows="4" v-model="observacao"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder=""></textarea>
          </div>
          <div class="mb-6">
            <label for="periodo" class="block mb-2 text-sm font-medium text-gray-900">Período</label>
            <input type="number" id="periodo" v-model="periodo"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="" required>
          </div>
          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input id="residente" type="checkbox" v-model="residente"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800">
            </div>
            <label for="residente" class="ms-2 text-sm font-medium text-gray-900">Residente</label>
          </div>
          <div v-if="residente">
            <div class="mb-6">
              <label for="cns" class="block mb-2 text-sm font-medium text-gray-900">Cartão SUS</label>
              <input type="text" id="cns" v-model="cns"
                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Cartão SUS" required>
            </div>
            <div class="mb-6">
              <label for="cbo" class="block mb-2 text-sm font-medium text-gray-900">CBO</label>
              <input type="text" id="cbo" v-model="cbo"
                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Ocupação" required>
            </div>
            <div class="mb-6">
              <label for="conselho" class="block mb-2 text-sm font-medium text-gray-900">Número do Conselho</label>
              <input type="text" id="conselho" v-model="conselho"
                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Número do Conselho" required>
            </div>
          </div>
          <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Criar
          </button>
        </form>
      </template>
    </Card>
  </div>
</template>
