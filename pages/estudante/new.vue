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

const validate = (state: any) => {
  console.log(state)
  return 'valid'
}

const schema = z.object({
  nome: z.string({ required_error: 'Nome é obrigatório' }).min(3, { message: "O nome deve ter pelo menos 3 caracteres" }).max(255),
  cpf: z.string({ required_error: 'CPF é obrigatório' }).regex(/^\d+$/, { message: "O CPF deve conter apenas números" }).length(11, { message: "O CPF deve ter 11 caracteres" }),
  periodo: z.number({ required_error: 'Período é obrigatório' }).min(1, { message: "O período deve ser maior que 0" }).max(12),
  observacao: z.string().max(200, { message: "A observação deve ter no máximo 200 caracteres" }),
  cns: z.string().length(15, { message: "O CNS deve ter 15 caracteres" }),
  conselho: z.string()
    .min(4, { message: "O número do conselhor deve ter no mínimo 4 caracteres" })
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
  estudante.matricula = estudante.cpf
  const { data: savedEstudante, error } = await client.from('estudantes').insert(estudante)
  console.log(error)
}

const { data: instituicoes, error: errorInstituicoes } = await client.from('instituicoes').select('id, nome')

const role = await useRole()

</script>
<template>
  <div>
    <Card>
      <template #title>
        Novo Estudante
      </template>
      <template #content>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="setEstudante(state)">
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
          <UButton type="submit">
            Salvar
          </UButton>
        </UForm>
      </template>
    </Card>
  </div>
</template>
