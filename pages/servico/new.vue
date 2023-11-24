<script setup lang="ts">
import { z } from 'zod'
import type { Database } from '~/types/supabase'
import { useRole } from '@/composables/useUserData'

definePageMeta({
  title: 'Criar Estudante',
  layout: 'main'
})

const client = useSupabaseClient<Database>()

const state = reactive({
  nome: '',
  numerovagas: 0,
  enfermeiroresponsavel: undefined,
  medicoresponsavel: undefined
})


const schema = z.object({
  nome: z.string().min(5, {message: "O nome do Serviço deve ter mais de 5 caracteres"}).max(45, {message: "O nome do Serviço deve ter menos que 45 caracteres"}),
  numerovagas: z.number(
    { invalid_type_error: "O período deve ser informado com um número inteiro de 1 à 20" })
    .gt(0, {message: "O período deve ser superior a 0"})
}).required()


async function setServico(state) {
  const client = useSupabaseClient<Database>()
  const { data: savedServico, error } = await client.from('servicos').insert(state)
  console.log(error)
}

const { data: colaboradores, error: errorColaboradores } = await client.from('colaboradores').select('id, nome')

const role = await useRole()

</script>
<template>
  <div>
    <Card>
      <template #title>
        <fa icon="fa-solid fa-house-chimney-medical" /> Novo Serviço
      </template>
      <template #content>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="setServico(state)">
          <UFormGroup label="Nome" name="nome">
            <UInput v-model="state.nome" />
          </UFormGroup>

          <UFormGroup label="Número de Vagas" name="numerovagas">
            <UInput v-model="state.numerovagas" type="number"/>
          </UFormGroup>

          <UFormGroup label="Médico Responsável" name="medico_responsavel">
            <USelect v-model="state.medicoresponsavel" :options="colaboradores as unknown[]" option-attribute="nome"
              value-attribute="id">
            </USelect>
          </UFormGroup>
          <UFormGroup label="Enfermeiro Responsável" name="enfermeiro_responsavel">
            <USelect v-model="state.enfermeiroresponsavel" :options="colaboradores as unknown[]" option-attribute="nome"
              value-attribute="id">
            </USelect>
          </UFormGroup>
          <UButton type="submit">
            Salvar
          </UButton>
        </UForm>
      </template>
    </Card>
  </div>
</template>
