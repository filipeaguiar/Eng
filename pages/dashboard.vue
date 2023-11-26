<script setup lang="ts">
import type { Database } from '~/types/supabase'

definePageMeta({
  layout: 'main',
  protected: true,
  name: "profile"
})

const client = useSupabaseClient<Database>()

const { data: servicos, error: servicosError } = await client.from('servicos').select('id, nome, numerovagas, vagas(inicio, fim, ativo)')

// filter servicos.vagas excluding those where servicos.vagas.inicio <= now() <= servicos.vagas.fim
const now = new Date()
const filteredServicos = servicos?.map(servico => {
  const vagas = servico.vagas.filter(vaga => {
    const inicio = new Date(vaga.inicio)
    const fim = new Date(vaga.fim)
    return now >= inicio && now <= fim
  })
  return {
    ...servico,
    vagas
  }
})

</script>
<template>
  <Card>
    <template #title>
      <fa icon="fa-solid fa-calendar-check" /> Quadro Geral de Vagas
    </template>
    <template #content>
      <div class="grid 
          2xl:grid-cols-4 
          xl:grid-cols-4 
          lg:grid-cols-4
          md:grid-cols-3
          sm:grid-cols-2
          gap-4
          ">
        <ServiceCard v-for="(servico, id) in filteredServicos" :key="id" :servico="servico.id" :total="servico.numerovagas"
          :preenchidas="servico.vagas.length">
          <template #title>
            {{ servico.nome }}
          </template>
        </ServiceCard>
      </div>
    </template>
  </Card>
</template>