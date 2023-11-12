<script setup lang="ts">
definePageMeta({
    layout: 'main'
})
const client = useSupabaseClient()

const alunos = await client.from('estudantes').select('*')

</script>
<template>
    <div>
        Pagina inicial estudantes
        <pre>{{ alunos }}</pre>
    </div>
</template>