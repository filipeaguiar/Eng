<script setup lang="ts">
definePageMeta({
    layout: 'main'
})
const client = useSupabaseClient()

const alunos = await client.from('colaboradores').select('*')

</script>
<template>
    <button type="button">OK</button>
    <div>
        Pagina inicial estudantes
        <pre>{{ alunos }}</pre>
    </div>
</template>