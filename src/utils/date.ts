export const buildFormattedDate = (paramDate: string): string => {
  const date = new Date(paramDate)

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Sao_Paulo'
  }

  const dateTimeFormat = new Intl.DateTimeFormat('pt-BR', options)

  const formattedTime = dateTimeFormat.format(date)

  return formattedTime
}
