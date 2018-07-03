export default function (str, value = 25) {
  let result = str

  if (result.length > value) {
    result = `${result.substring(0, value - 1)}...`
  }

  return result
}
