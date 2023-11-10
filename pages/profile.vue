<template>
  <button
    @click="() => client.auth.signOut()"
    class="p-2 font-medium text-white bg-green-500 rounded hover:bg-green-400"
  >Log out</button>
  {{ user.id}} <br />
  {{ colaboradores }}
</template>
<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
console.log(user.value.id)
const colaboradores = await client.from('colaboradores').select('*').eq('user_id', user.value.id)
</script>
