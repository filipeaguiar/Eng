<script setup lang="ts">
import { z } from 'zod'
import type { Database } from '~/types/supabase'
import type { FormSubmitEvent } from '#ui/types'
import type { UTextarea } from '#build/components'
import { useRole } from '@/composables/useUserData'

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
  matricula?: string,
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

const schema = z.object({
  nome: z.string({ required_error: 'Nome é obrigatório' }).min(3, { message: "O nome deve ter pelo menos 3 caracteres" }).max(255, { message: "O nome deve ter no máximo 255 caracteres" }),
  cpf: z.string({ required_error: 'CPF é obrigatório' }).regex(/^\d+$/, { message: "O CPF deve conter apenas números" }).length(11, { message: "O CPF deve ter 11 caracteres" }),
  periodo: z.number({ required_error: 'Período é obrigatório' }).min(1, { message: "O período deve ser maior que 0" }).max(20, { message: "O período deve ser menor que 20" }),
  observacao: z.string().max(200, { message: "A observação deve ter no máximo 200 caracteres" }),
  cns: z.string().length(15, { message: "O CNS deve ter 15 caracteres" }).or(z.string().length(0)),
  cbo: z.string().length(6, { message: "O CBO deve ter 6 caracteres" }).or(z.string().length(0)),
  conselho: z.string({ invalid_type_error: "O número do conselho deve ser informado com texto e números" })
    .min(4, { message: "O número do conselhor deve ter no mínimo 4 caracteres" })
    .max(11, { message: "O número do conselho deve ter 11 caracteres" })
    .or(z.string().length(0)),
  curso: z.string({ required_error: 'Curso é obrigatório' }).min(3, { message: "O curso deve ter no mínimo 3 caracteres" }).max(255),
})

type Schema = z.output<typeof schema>

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

const errorMessage = ref('')
async function setEstudante(event: FormSubmitEvent<Schema>) {
  const client = useSupabaseClient<Database>()
  const { data: savedEstudante, error } = await client.from('estudantes').insert(state)
  if (error) {
    errorMessage.value = 'O CPF já está cadastrado!'
    return
  }
  navigateTo(`/estudante`)
}

const { data: instituicoes, error: errorInstituicoes } = await client.from('instituicoes').select('id, nome')

const role = await useRole()

const formStatus = computed(() => schema.safeParse(state))
</script>
<template>
  <div>
    <Card>
      <template #title>
        <fa icon="fa-solid fa-user-graduate" /> Novo Estudante
      </template>
      <template #content>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="setEstudante">
          <UFormGroup label="Instituição" name="instituicao_id">
            <USelect v-model="state.instituicao_id" :options="instituicoes as unknown[]" option-attribute="nome"
              value-attribute="id">
            </USelect>
          </UFormGroup>
          <UFormGroup label="Nome" name="nome">
            <UInput v-model="state.nome" />
          </UFormGroup>

          <UFormGroup label="CPF (Somente Números)" name="cpf">
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
          <div v-if="errorMessage">
            <p class="text-red-500">{{ errorMessage }}</p>
          </div>
          <UButton type="submit" :disabled="!formStatus.success">
            <fa icon="fa-solid fa-save" /> Salvar
          </UButton>
        </UForm>
      </template>
    </Card>
  </div>
</template>
