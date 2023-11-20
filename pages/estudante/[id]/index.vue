<script setup lang="ts" >
import type { Database } from '~/types/supabase'

definePageMeta({
  title: 'Editar Estudante',
  layout: 'main',
})

const route = useRoute()
const client = useSupabaseClient<Database>()
const { data: databaseEstudante, error: estudante_error } = await client
  .from('estudantes')
  .select(`id, nome, cpf, matricula, periodo, observacao, cns, conselho, curso, residente, cbo, instituicao_id, instituicao:instituicao_id(id, nome)`)
  .eq('id', route.params.id).single()
const { data: vagas, error: vagas_error } = await client.from('vagas').select(`*, servico:servico_id(id, nome), programa:programa_id(id, nome)`).eq('estudante_id', parseInt(databaseEstudante.id))

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
  instituicao_id: number,
  instituicao: {
    id?: number,
    nome?: string
  }
}

const estudante = computed((): Estudante => {
  return {
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
    instituicao_id: databaseEstudante?.instituicao_id || 0,
    instituicao: databaseEstudante?.instituicao
  }
})

</script>
<template>
  <div>
    <Card>
      <template #title>
        {{ estudante.nome }}
      </template>
      <template #content>
        <p class="text-2xl">
          <strong class="lead">Instituição:</strong> {{ estudante.instituicao.nome }}
        </p>
        <p>
          <strong class="lead">CPF:</strong> {{ estudante.cpf }}
        </p>
        <p>
          <strong class="lead">Curso:</strong> {{ estudante.curso }} - {{ estudante.periodo }}º Período
        </p>
        <p>
          <strong class="lead">Observação:</strong>
        </p>
        <p>
          {{ estudante.cpf }}
        </p>
        <p>
          <strong class="lead">Residente:</strong>
          <span v-if="estudante.residente" class='text-green-500'>
            <fa icon="fa-solid fa-check" />
          </span>
          <span v-else class="text-red-500">
            <fa icon="fa-solid fa-xmark" />
          </span>
        </p>
        <p>
          <strong class="lead">Cartão SUS:</strong> {{ estudante.cns }}
        </p>
        <p>
          <strong class="lead">CBO:</strong> {{ estudante.cbo }}
        </p>
        <p>
          <strong class="lead">Número do Conselho:</strong> {{ estudante.conselho }}
        </p>
        <p>
          <strong class="lead">Observação:</strong>
        </p>
      </template>
    </Card>
    <Card v-if="vagas" class="my-2">
      <template #title>
        Vagas
      </template>
      <template #content>


        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
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
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b" v-for="(vaga, id) in vagas" :key="id">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {{ vaga.servico?.nome }}
                </th>
                <td class="px-6 py-4">
                  {{ vaga.programa?.nome }}
                </td>
                <td class="px-6 py-4">
                  {{ formatDate(vaga.inicio) }}
                </td>
                <td class="px-6 py-4">
                  {{ formatDate(vaga.fim) }}
                </td>
                <td class="px-6 py-4">
                  <span v-if="checkActive(vaga.inicio, vaga.fim)" class="text-green-500">
                    <strong>ATIVA</strong>
                  </span>
                  <span v-else class="text-red-500">
                    <strong>EXPIRADA</strong>
                  </span>
                </td>
                <td class="px-6 py-4">
                  {{ vaga.inicio }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <template #footer></template>
    </Card>
  </div>
</template>
