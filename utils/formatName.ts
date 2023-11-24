export default function(nameString: string) {
  const fullName =  nameString.split(' ')
  const firstName = fullName[0] || ''
  const lastName = fullName[1] || ''
  return `${firstName} ${lastName}` 
}
