export const buildFormattedDate = (paramDate: string): string => {
  const date = new Date(paramDate)

  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  const formattedTime = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  return `${formattedDate} ${formattedTime}`
}
