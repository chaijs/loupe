import inspectObject from './object.js'
import type { Options } from './types.js'

const toStringTag = typeof Symbol !== 'undefined' && Symbol.toStringTag ? Symbol.toStringTag : false

export default function inspectClass(value: { new (...args: any[]): unknown }, options: Options) {
  let name = ''
  if (toStringTag && toStringTag in value) {
    name = value[toStringTag] as string
  }
  name = name || value.constructor.name
  // Babel transforms anonymous classes to the name `_class`
  if (!name || name === '_class') {
    name = '<Anonymous Class>'
  }
  options.truncate -= name.length
  return `${name}${inspectObject(value, options)}`
}
