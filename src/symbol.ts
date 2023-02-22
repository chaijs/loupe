export default function inspectSymbol(value: Symbol): string {
  if ('description' in Symbol.prototype) {
    return value.description ? `Symbol(${value.description})` : 'Symbol()'
  }
  return value.toString()
}
