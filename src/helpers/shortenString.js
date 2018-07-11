export default function (str, value = 25) {
  let result = str

  if (result && result.length > value) {
    const text = result.substring(0, value - 1).trim()

    result = `${text}...`
  }

  return result
}
