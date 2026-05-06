const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default (dateStr: string | undefined) => {
  if (!dateStr) return

  const date = new Date(dateStr)

  return String(
    date.getDate() + " " + months[date.getMonth()]! + " " + date.getFullYear(),
  )
}
