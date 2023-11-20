export default function(dateString: string) {
  const newDate = new Date(dateString+'T00:00:00')
  return newDate.toLocaleDateString('pt-BR')
}
