<script setup lang="ts">
definePageMeta({
    layout: 'main'
})
const client = useSupabaseClient()

const { data: estudantes, error: estudante_error } = await client.from('estudantes').select('id, nome, residente, periodo, instituicao_id(id, nome), vagas(id, servico_id, inicio, fim)')
const { data: vagas, error: vagas_error } = await client.from('vagas').select('*')
const { data: servicos, error: servicos_error } = await client.from('servicos').select('id,nome')

function nomeServico(id:number, servicos: [{"id": number, "nome": string}]) {
    let nome = ''
    servicos.forEach((servico) => {
        if (servico.id == id) {
            nome = servico.nome
        }
    })
    return nome
}

</script>
<template>
    <div>
        <Card>
            <template #title>
                <fa icon="fa-solid fa-user-graduate" class="mr-2" /> Estudantes
            </template>
            <template #content>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Estudante
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Residente
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Período
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Instituição
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Vagas
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Ação
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(estudante, id) in estudantes" :key="id" class="odd:bg-white even:bg-gray-50">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {{ estudante.nome }}
                                </th>
                                <td class="px-6 py-4">
                                    {{ estudante.residente }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ estudante.periodo }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ estudante.instituicao_id?.nome }}
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#" class="font-medium block text-blue-600" v-for="(vaga, id) in estudante.vagas" :key="id">
                                        {{ nomeServico( vaga.servico_id, servicos) }}
                                    </a>
                                </td>
                                <td>
                                    <NuxtLink :to="`/estudante/edit/${estudante.id}`" class="font-medium block text-blue-600">
                                        <fa icon="fa-solid fa-edit" />
                                    </NuxtLink>
                                    <fa icon="fa-solid fa-trash" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>
            <template #footer>
                <NuxtLink to="/estudante/new" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Criar Estudante</NuxtLink>
            </template>
        </Card>
    </div>
</template>
