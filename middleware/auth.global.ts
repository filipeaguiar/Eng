export default defineNuxtRouteMiddleware((to, from) => {
  // const user = useSupabaseUser()
  // console.log(to.meta?.protected)
  // if (!user.value && to.path === '/profile') {
  // return navigateTo('/login')
  // } else if (user.value && to.path === '/login') {
  // return navigateTo('profile')
  // }
  console.log(to.meta)
})
