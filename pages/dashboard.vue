<template>
  <Card>
    <template #title>
      Titulo
    </template>
    <template #content>
      <fa icon="fa-solid fa-user-secret" /> Conteúdo
    </template>
    <template #footer>
      Rodapé
    </template>
  </Card>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'main',
  protected: true,
  name: "profile"
})
</script>
