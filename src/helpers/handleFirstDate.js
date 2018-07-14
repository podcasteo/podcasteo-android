export default function handleFirstDate(dateStr) {
  let date = new Date(dateStr)

  if (!date.getTime()) {
    date = new Date()
  }

  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1)

  firstDate.setTime(firstDate.getTime() - (firstDate.getTimezoneOffset() * 60 * 1000))

  return firstDate.toISOString()
}
