export default function inspectSymbol(value) {
  if ('description' in Symbol.prototype) {
    return `Symbol(${value.description})`
  }
  return value.toString()
}
