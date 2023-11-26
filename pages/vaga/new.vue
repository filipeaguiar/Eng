<script setup lang="ts">
import { ZodLazy, z } from 'zod'
import type { Database } from '~/types/supabase'
import type { FormSubmitEvent } from '#ui/types'
definePageMeta({
  title: 'Criar Estudante',
  layout: 'main'
})
const client = useSupabaseClient<Database>()

const { data: instituicoes, error: errorInstituicoes } = await client.from('instituicoes').select('id, nome, programas(id, nome)')
const { data: servicos, error: erroServicos } = await client.from('servicos').select('id, nome')
const { data: programas, error: errorProgramas } = await client.from('programas').select('id, nome, instituicao_id')
const { data: estudantes, error: errorEstudantes } = await client.from('estudantes').select('id, nome, instituicao_id, vagas(servico_id)').eq('ativo', true)

const instituicao = ref('')
const inicio = ref('')
const fim = ref('')

const programasSelect = computed(() => {
  const filteredProgramas = programas.filter(programa => programa.instituicao_id === instituicao.value)
  return filteredProgramas
})

const estudantesSelect = computed(() => {
  const filteredEstudantes = estudantes.filter(estudante => estudante.instituicao_id === instituicao.value)
  return filteredEstudantes
})

const servicosSelect = computed(() => {
  // filter servicos removing all servicos where servico.id is not in estudante.vagas.servico_id on estudante.id === state.estudante_id
  const estudante = estudantes.find(estudante => estudante.id === state.estudante_id)
  const filteredServicos = servicos.filter(servico => !estudante.vagas.some(vaga => vaga.servico_id === servico.id))
  return filteredServicos
})

type Schema = z.output<typeof schema>

async function setVaga(event: FormSubmitEvent<Schema>) {
  const client = useSupabaseClient<Database>()
  const { data: savedVaga, error } = await client.from('vagas').insert(state)
  if (error) {
    console.error(error.message)
    return
  }
  navigateTo('/vaga')
}

const state = reactive({
  estudante_id: 0,
  programa_id: null,
  servico_id: 0,
  inicio: '',
  fim: ''
})

const schema = z.object({
  estudante_id: z.number({ required_error: 'Estudante é obrigatório' }).min(1),
  programa_id: z.null().or(z.number({ required_error: 'Programa é obrigatório' }).min(1)),
  servico_id: z.number({ required_error: 'Serviço é obrigatório' }).min(1),
  inicio: z.string({ required_error: 'Início é obrigatório' })
    .regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/g),
  fim: z.string({ required_error: 'Fim é obrigatório' })
    .regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/g)
    .refine(value => {
      const inicioDate = new Date(state.inicio)
      const fimDate = new Date(value)
      return fimDate > inicioDate
    }, { message: 'Fim deve ser maior que início' })
})

const formStatus = computed(() => schema.safeParse(state))
</script>
<template>
  <div>
    <Card>
      <template #title>
        <fa icon="fa-solid fa-calendar-check" /> Cadastrar Vaga
      </template>
      <template #content>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="setVaga">
          <UFormGroup label="Instituição" name="instituicao_id">
            <USelect v-model.number="instituicao" :options="instituicoes as unknown[]" option-attribute="nome"
              value-attribute="id">
            </USelect>
          </UFormGroup>
          <UFormGroup label="Estudante" name="estudante_id">
            <USelect v-model.number="state.estudante_id" :options="estudantesSelect as unknown[]" option-attribute="nome"
              value-attribute="id">
            </USelect>
          </UFormGroup>
          <UFormGroup label="Serviço" name="servico_id" v-if="state.estudante_id !== 0">
            <USelect v-model.number="state.servico_id" :options="servicosSelect as unknown[]" option-attribute="nome"
              value-attribute="id">
            </USelect>
          </UFormGroup>
          <UFormGroup label="Programa" name="programa_id">
            <USelect v-model.number="state.programa_id" :options="programasSelect as unknown[]" option-attribute="nome"
              value-attribute="id">
            </USelect>
          </UFormGroup>
          <UFormGroup label="Início" name="inicio">
            <UInput v-model="state.inicio" type="date" />
          </UFormGroup>
          <UFormGroup label="Fim" name="fim">
            <UInput v-model="state.fim" type="date" />
          </UFormGroup>
          <UButton type="submit" :disabled="!formStatus.success">
            <fa icon="fa-solid fa-link" /> Solicitar Alocação
          </UButton>
        </UForm>
      </template>
      <template #footer>
      </template>
    </Card>
  </div>
</template>
