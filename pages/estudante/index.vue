<script setup lang="ts">
definePageMeta({
    layout: 'main'
})
const client = useSupabaseClient()

const { data: estudantes, error } = await client.from('estudantes').select('id, nome, residente, periodo, instituicao_id(id, nome)')


</script>
<template>
    <div>
        <Card>
            <template #title></template>
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
                                    Vagas
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Ação
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for=""
                                class="odd:bg-white even:bg-gray-50">
                                <th scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    Apple MacBook Pro 17"
                                </th>
                                <td class="px-6 py-4">
                                    Silver
                                </td>
                                <td class="px-6 py-4">
                                    Laptop
                                </td>
                                <td class="px-6 py-4">
                                    $2999
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#"
                                        class="font-medium text-blue-600">Edit</a>
                                </td>
                            </tr>
                    </tbody>
                </table>
            </div>
        </template>
        <template #footer>
            <NuxtLink to="/estudante/new">Criar Estudante</NuxtLink>
        </template>
    </Card>
</div></template>
