<script setup lang="ts">
const supabase = useSupabaseClient()

const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error(error)
    return
  }
  await navigateTo('/login')
}

</script>
<template>
<button
    class="btn btn-blue"
    @click="logout"
>
    Sair
</button>
</template>
<style scoped>
  .btn {
    @apply font-bold py-2 px-4 rounded
  }
  .btn-blue {
    @apply bg-red-500 text-white
  }
  .btn-blue:hover {
    @apply bg-red-700
  }
</style>