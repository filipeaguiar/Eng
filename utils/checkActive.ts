export default function(dateStart: string, dateEnd: string) {
  const now = Date.now()
  const ds = new Date(dateStart).getTime()
  const de = new Date(dateEnd).getTime()
  return  ((ds < now) && (now < de))
}
