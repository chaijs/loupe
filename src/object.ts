import { inspectList, inspectProperty } from './helpers.js'
import type { Inspect, Options } from './types.js'

export default function inspectObject(object: object, options: Options): string {
  options.seen = options.seen || []
  if (options.seen.includes(object)) {
    return '[Circular]'
  }
  if (options.depth < 0) {
    return options.stylize('[Object]', 'special')
  }
  const properties = Object.getOwnPropertyNames(object)
  const symbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : []
  if (properties.length === 0 && symbols.length === 0) {
    return '{}'
  }
  options.truncate -= 4
  options.seen.push(object)
  const propertyContents = inspectList(
    properties.map(key => [key, object[key as keyof typeof object]]),
    options,
    inspectProperty as Inspect
  )
  const symbolContents = inspectList(
    symbols.map(key => [key, object[key as keyof typeof object]]),
    options,
    inspectProperty as Inspect
  )
  options.seen.pop()
  let sep = ''
  if (propertyContents && symbolContents) {
    sep = ', '
  }
  return `{ ${propertyContents}${sep}${symbolContents} }`
}
