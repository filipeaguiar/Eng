<script setup lang="ts">
definePageMeta({
    layout: 'main'
})
const client = useSupabaseClient()

const alunos = await client.from('colaboradores').select('*')

</script>
<template>
    <div>
    <h1>VAGAS</h1>
    </div>
</template>