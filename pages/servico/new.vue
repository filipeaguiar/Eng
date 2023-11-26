<script setup lang="ts">
import { z } from 'zod'
import type { Database } from '~/types/supabase'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';
import { useRole } from '@/composables/useUserData'

definePageMeta({
  title: 'Criar Estudante',
  layout: 'main'
})

const client = useSupabaseClient<Database>()
const servicos = await client.from('servicos').select('nome')

const servicosFormated = computed(() => {
  const temp = servicos.data?.map(servico => {
    return {
      nome: servico.nome.toLowerCase().replace(/\s/g, ''),
    }
  })
  return temp?.map(servico => servico.nome)
})

const state = reactive({
  nome: '',
  numerovagas: 0,
  enfermeiroresponsavel: undefined,
  medicoresponsavel: undefined
})

function checkServicoExists(nome: string) {
  return servicosFormated.value?.includes(nome.toLowerCase().replace(/\s/g, ''))
}

const schema = z.object({
  nome: z.string()
    .min(5, {message: "O nome do Serviço deve ter mais de 5 caracteres"})
    .max(45, {message: "O nome do Serviço deve ter menos que 45 caracteres"})
    .refine((nome) => !checkServicoExists(nome), {message: "O nome do Serviço já existe"}),
  numerovagas: z.number(
    { invalid_type_error: "O período deve ser informado com um número inteiro de 1 à 20" })
    .gte(0, {message: "O número de vagas deve ser maior ou igual 0"}),
  enfermeiroresponsavel: z.number().int().positive({message: "O enfermeiro responsável deve ser informado"}),
  medicoresponsavel: z.number().int().positive({message: "O médico responsável deve ser informado"})
})

type Schema = z.output<typeof schema>

async function setServico(event: FormSubmitEvent<Schema>) {
  const client = useSupabaseClient<Database>()
  const { data: savedServico, error } = await client.from('servicos').insert(state)
  console.log(error?.message)
  navigateTo('/servico')
}

const { data: colaboradores, error: errorColaboradores } = await client.from('colaboradores').select('id, nome')

const role = await useRole()

const formStatus = computed(() => schema.safeParse(state))
</script>
<template>
  <div>
    <Card>
      <template #title>
        <fa icon="fa-solid fa-house-chimney-medical" /> Novo Serviço
      </template>
      <template #content>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="setServico">
          <UFormGroup label="Nome" name="nome">
            <UInput v-model="state.nome" />
          </UFormGroup>

          <UFormGroup label="Número de Vagas" name="numerovagas">
            <UInput v-model="state.numerovagas" type="number"/>
          </UFormGroup>

          <UFormGroup label="Médico Responsável" name="medico_responsavel">
            <USelect v-model.number="state.medicoresponsavel" :options="colaboradores as unknown[]" option-attribute="nome"
              value-attribute="id">
            </USelect>
          </UFormGroup>
          <UFormGroup label="Enfermeiro Responsável" name="enfermeiro_responsavel">
            <USelect v-model.number="state.enfermeiroresponsavel" :options="colaboradores as unknown[]" option-attribute="nome"
              value-attribute="id">
            </USelect>
          </UFormGroup>
          <UButton type="submit" :disabled="!formStatus.success">
            <fa icon="fa-solid fa-save" /> Salvar
          </UButton>
        </UForm>
      </template>
    </Card>
  </div>
</template>
