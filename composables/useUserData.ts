import { ref } from 'vue'
import type { Database } from '~/types/supabase'

const role = ref('')

export async function  useRole() {
  const user = useSupabaseUser()
  const id = user.value?.id || ''
  const client = useSupabaseClient<Database>()
  const { data: colaborador, error } = await client.from('colaboradores').select('*').eq('user_id', id ).single()
  return colaborador?.perfil
}