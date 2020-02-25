import getFuncName from 'get-func-name'
import inspectObject from './object'

const toStringTag = typeof Symbol !== 'undefined' && Symbol.toStringTag ? Symbol.toStringTag : false

export default function inspectClass(value, options) {
  const name =
    (toStringTag && toStringTag in value ? value[toStringTag] : getFuncName(value.constructor)) || '<Anonymous Class>'
  options.truncate -= name.length
  return `${name}${inspectObject(value, options)}`
}
